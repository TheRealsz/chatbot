import './index.css'
import { AiOutlineSend } from 'react-icons/ai'

// Lembrar de nao dar deploy devido ao limite de requisicoes?
// Trabalhar com dark/light mode
// Adicionar outro icone de robo
// Adicionar nome proprio para o chatbot

// Como evitar repetiçoes igual dos p?
function App() {
  return (
    <div className='flex justify-center align-middle'>
      <div className="bg-slate-900 text-slate-300 w-105 rounded-xl shadow-specific overflow-hidden">
        <header className='bg-orange-500 py-4 text-center'>
          <h2 className='text-2xl font-bold'>Chatbot</h2>
        </header>
        <ul className="h-125 overflow-y-auto pt-4 pr-5 pb-16 text-base">
          <li className="flex incoming">
            <span className='h-8 w-8 text-center leading-8 mr-2 mb-2 self-end'>🤖</span> 
            <p className='bg-slate-300 text-slate-950 rounded-lg py-3 px-4 max-w-75'>Ola 😃 <br /> em que posso lhe ajudar?</p>
          </li>
          <li className="flex justify-end my-5">
            <p className='bg-orange-500 rounded-lg py-3 px-4'>Lorem ipsum dolor sit amet consectetur</p>
          </li>
        </ul>
        <div className="flex gap-1 w-full border-t border-solid border-white bg-slate-900 py-1 px-5 bottom-0">
          <textarea placeholder='Envie uma mensagem...' className='bg-slate-900 border-none text-base resize-none py-4 pr-4 h-14 w-full outline-0'></textarea>
          <AiOutlineSend className='text-orange-500 text-2xl cursor-pointer self-end h-14 invisible'/>
        </div>
      </div>
    </div>
  );
}

export default App;
