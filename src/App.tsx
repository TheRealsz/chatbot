import { useState } from 'react';
import './index.css'
import { AiOutlineSend } from 'react-icons/ai'
import axios from 'axios';


// P map + log
// Lembrar de nao dar deploy devido ao limite de requisicoes?
// Trabalhar com dark/light mode
// Adicionar outro icone de robo
// Adicionar nome proprio para o chatbot

// Como evitar repetiçoes igual dos p?
// Ver se vai ficar full ou assim mesmo no responsivo
function App() {


  const [mensagem, setMensagem] = useState("")
  const [mensagensDiv, setMensagensDiv] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)
  const [resposta, setResposta] = useState<string[]>([]);
  // const [view, setView] = useState(true)



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
      setResposta([...resposta, messageAI])
    } catch (error) {
      setResposta([...resposta, "Ops, algo deu errado, tente novamente!"])
    }
  }

  function handleSendMensagem() {
    setMensagensDiv([...mensagensDiv, mensagem])
    setMensagem('')
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      // setView(true)
    }, 1000)

    generateResponse()
  }

  return (
    <div className='flex justify-center items-center h-screen bg-slate-950'>
      <div className="bg-slate-900 text-brown-rust-100 w-105 rounded-xl shadow-specific overflow-hidden">
        <header className='bg-gradient-to-r from-brown-rust-300 to-brown-rust-700 py-4 text-center'>
          <h2 className='text-2xl font-bold'>Chatbot</h2>
        </header>
        <ul className="h-125 overflow-y-auto pt-4 pr-5 pb-16 text-base max-sm:pr-1">
          <li className="flex">
            <span className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end'>🤖</span>
            <p className='bg-slate-300 text-slate-950 rounded-lg py-3 px-4 max-w-75'>Ola 😃 <br /> em que posso lhe ajudar?</p>
          </li>
          {mensagensDiv.map((mensagemDiv, index) => (
            <li key={index} className="flex justify-end my-5">
              <p className='bg-brown-rust-500 rounded-lg py-3 px-4'>{mensagemDiv}</p>
            </li>
          ))}
          {loading && (
            <li className="flex">
              <span className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end'>🤖</span>
              <p className='bg-slate-300 text-slate-950 rounded-lg py-3 px-4 max-w-75'>Pensando...</p>
            </li>
          )}
          {resposta.map((resposta, index) => (
            <li key={index} className="flex">
              <span className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end'>🤖</span>
              <p className='bg-slate-300 text-slate-950 rounded-lg py-3 px-4 max-w-75'>{resposta}</p>
            </li>
          ))}
        </ul>
        <div className="flex gap-1 w-full border-t border-solid border-slate-700 bg-slate-900 py-1 px-5 bottom-0">
          <textarea placeholder='Envie uma mensagem...' className='bg-slate-900 border-none text-base resize-none py-4 pr-4 h-14 w-full outline-0 peer' value={mensagem} onChange={(e) => setMensagem(e.target.value)} required></textarea>
          <AiOutlineSend className='text-brown-rust-600 text-2xl cursor-pointer self-end h-14 invisible peer-valid:visible' onClick={handleSendMensagem} />
        </div>
      </div>
    </div>
  );
}

export default App;
