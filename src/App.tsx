import React, { useState } from 'react';
import './index.css'
import { AiOutlineSend } from 'react-icons/ai'
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs'
import axios from 'axios';
import robot from './assets/3662817.png'

function App() {

  const [mensagem, setMensagem] = useState("")
  const [mensagensDiv, setMensagensDiv] = useState<{ type: 'user' | 'wallbot'; content: string }[]>([]);
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState(true)

  const API_URL: string = process.env.REACT_APP_API_URL || ""
  const API_KEY: string = process.env.REACT_APP_API_KEY || ""

  function handleSendMensagem() {
    setMensagensDiv((mensagemAnterior) => [...mensagemAnterior, { type: 'user', content: mensagem }])
    setMensagem('')
    setLoading(true)
    generateResponse()
  }

  async function generateResponse() {
    try {
      const response = await axios.post(API_URL,
        // Body
        {
          "model": "gpt-3.5-turbo",
          "messages": [{ "role": "user", "content": mensagem }]
        },
        // header
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`
          }
        }
      )
      const data = response.data
      const messageAI = data.choices[0].message.content
      setMensagensDiv((mensagemAnterior) => [...mensagemAnterior, { type: 'wallbot', content: messageAI }])
      setLoading(false)
    } catch (error) {
      setMensagensDiv((mensagemAnterior) => [...mensagemAnterior, { type: 'wallbot', content: "Ops, algo deu errado, tente novamente!" }])
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMensagem();
    }
  };

  return (
    <div className={`${mode ? 'dark' : ''}`}>
      <div className='flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-950'>
        <div className="bg-slate-100 dark:bg-slate-900 text-brown-rust-50 w-105 rounded-xl shadow-specific overflow-hidden max-sm:w-full max-sm:h-full max-sm:rounded-none max-sm:right-0 max-sm:bottom-0">
          <header className='bg-gradient-to-r from-brown-rust-300 to-brown-rust-700 py-4 text-center'>
            <h2 className='text-2xl font-bold'>WallBot</h2>
          </header>
          <ul className="h-125 overflow-y-auto pt-4 pr-5 pb-8 text-base max-sm:pr-1 max-sm:h-5/6">
            <li className="flex">
              <img className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end' src={robot} />
              <p className='bg-slate-300 text-slate-950 rounded-lg py-3 px-4 max-w-75'>Ola 😃 <br /> em que posso lhe ajudar?</p>
            </li>
            {mensagensDiv.map((mensagemDiv, index) => (
              <li key={index} className={`flex ${mensagemDiv.type === 'wallbot' ? '' : 'justify-end'} my-5`}>
                {mensagemDiv.type === 'wallbot' ? <img className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end' src={robot} /> : ''}
                <p className={`${mensagemDiv.type === 'wallbot' ? 'bg-slate-300' : 'bg-brown-rust-500'} ${mensagemDiv.type === 'wallbot' ? 'text-slate-950' : 'text-brown-rust-50'} rounded-lg py-3 px-4 max-w-75`}>
                  {mensagemDiv.content}
                </p>
              </li>
            ))}
            {loading && (
              <li className="flex">
                <img className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end' src={robot} />
                <p className='bg-slate-300 text-slate-950 rounded-lg py-3 px-4 max-w-75'>Pensando...</p>
              </li>
            )}
          </ul>
          <div className="flex gap-1 w-full border-t border-solid border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 py-1 px-5 bottom-0 max-h40">
            <textarea placeholder='Envie uma mensagem...' className='bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-slate-50 border-none text-base resize-none py-4 pr-4 h-14 w-full outline-0 peer ' value={mensagem} onChange={(e) => setMensagem(e.target.value)} onKeyDown={handleKeyPress} required></textarea>
            <AiOutlineSend tabIndex={0} className='text-brown-rust-600 text-2xl cursor-pointer self-end h-14 invisible peer-valid:visible' onClick={handleSendMensagem} />
          </div>
        </div>
      </div>
      <div className='fixed top-4 right-4 flex bg-none max-sm:top-0 max-sm:right-0' onClick={() => setMode(!mode)}>
        <div className='w-16 h-16 shadow-specific bg-slate-200 dark:bg-slate-900 rounded-full flex items-center justify-center max-sm:dark:bg-transparent max-sm:bg-transparent max-sm:hover:shadow-none max-sm:hover:dark:shadow-none hover:dark:shadow-hover-dark hover:shadow-hover duration-500'>
          {mode ? <BsFillMoonStarsFill className='text-slate-200' tabIndex={0} /> : <BsSunFill className='max-sm:text-slate-200' tabIndex={0} />}
        </div>
      </div>
    </div>
  );
}

export default App;
