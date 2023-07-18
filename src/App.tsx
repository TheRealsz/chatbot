import { useState } from 'react';
import './index.css'
import { AiOutlineSend } from 'react-icons/ai'
import axios from 'axios';

// Trabalhar com dark/light mode
// Adicionar outro icone de robo
// Adicionar nome proprio para o chatbot
// Como evitar repetiçoes igual dos p?
// Ver se vai ficar full ou assim mesmo no responsivo
// Formatar response da API
// P map
// Aumentar o textarea enquanto o texto for adicionado
// Lembrar de nao dar deploy devido ao limite de requisicoes?
function App() {


  const [mensagem, setMensagem] = useState("")
  const [mensagensDiv, setMensagensDiv] = useState<{ type: 'user' | 'chatbot'; content: string }[]>([]);
  const [loading, setLoading] = useState(false)



  const API_URL: string = process.env.REACT_APP_API_URL || ""
  const API_KEY: string = process.env.REACT_APP_API_KEY || ""



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
      setMensagensDiv((mensagemAnterior) => [...mensagemAnterior, { type: 'chatbot', content: messageAI }])
      setLoading(false)
    } catch (error) {
      setMensagensDiv((mensagemAnterior) => [...mensagemAnterior, { type: 'chatbot', content: "Ops, algo deu errado, tente novamente!" }])
      setLoading(false)
    }
  }

  function handleSendMensagem() {
    setMensagensDiv((mensagemAnterior) => [...mensagemAnterior, { type: 'user', content: mensagem }])
    setMensagem('')
    setLoading(true)
    generateResponse()
  }

  return (
    <div className='dark'>
      <div className='flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-950'>
        <div className="bg-slate-100 dark:bg-slate-900 text-brown-rust-50 w-105 rounded-xl shadow-specific overflow-hidden">
          <header className='bg-gradient-to-r from-brown-rust-300 to-brown-rust-700 py-4 text-center'>
            <h2 className='text-2xl font-bold'>Chatbot</h2>
          </header>
          <ul className="h-125 overflow-y-auto pt-4 pr-5 pb-8 text-base max-sm:pr-1">
            <li className="flex">
              <span className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end'>🤖</span>
              <p className='bg-slate-300 text-slate-950 rounded-lg py-3 px-4 max-w-75'>Ola 😃 <br /> em que posso lhe ajudar?</p>
            </li>
            {mensagensDiv.map((mensagemDiv, index) => (
              <li key={index} className={`flex ${mensagemDiv.type === 'chatbot' ? '' : 'justify-end'} my-5`}>
                {mensagemDiv.type === 'chatbot' ? <span className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end'>🤖</span> : ''}
                <p className={`${mensagemDiv.type === 'chatbot' ? 'bg-slate-300' : 'bg-brown-rust-500'} ${mensagemDiv.type === 'chatbot' ? 'text-slate-950' : 'text-brown-rust-50'} rounded-lg py-3 px-4 max-w-75`}>
                  {mensagemDiv.content}
                </p>
              </li>
            ))}
            {loading && (
              <li className="flex">
                <span className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end'>🤖</span>
                <p className='bg-slate-300 text-slate-950 rounded-lg py-3 px-4 max-w-75'>Pensando...</p>
              </li>
            )}
          </ul>
          <div className="flex gap-1 w-full border-t border-solid border-slate-700 bg-slate-900 py-1 px-5 bottom-0 max-h40">
            <textarea placeholder='Envie uma mensagem...' className='bg-slate-900 border-none text-base resize-none py-4 pr-4 h-14 w-full outline-0 peer' value={mensagem} onChange={(e) => setMensagem(e.target.value)} required></textarea>
            <AiOutlineSend className='text-brown-rust-600 text-2xl cursor-pointer self-end h-14 invisible peer-valid:visible' onClick={handleSendMensagem} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
