import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function CadastroProfissional() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [documento, setDocumento] = useState('')
  const [erro, setErro] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!nome || !email || !telefone || !documento) {
      setErro('Preencha todos os campos.')
      return
    }
    navigate('/painel-profissional')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-8 shadow-sm border border-gray-100">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <Link to="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            HomeFix
          </Link>
          
          <div className="flex items-center gap-4 text-sm font-medium w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="flex flex-col items-center text-emerald-600 shrink-0">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mb-1">1</div>
              <span>Dados</span>
            </div>
            <div className="w-8 h-px bg-gray-200 mt-[-20px] shrink-0"></div>
            <div className="flex flex-col items-center text-gray-400 shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">2</div>
              <span>Serviços</span>
            </div>
            <div className="w-8 h-px bg-gray-200 mt-[-20px] shrink-0"></div>
            <div className="flex flex-col items-center text-gray-400 shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">3</div>
              <span>Portfólio</span>
            </div>
            <div className="w-8 h-px bg-gray-200 mt-[-20px] shrink-0"></div>
            <div className="flex flex-col items-center text-gray-400 shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mb-1">4</div>
              <span>Conclusão</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Cadastro do profissional</h1>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
            <svg className="w-12 h-12 text-gray-400 mt-2" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <button type="button" className="text-emerald-600 font-medium hover:text-emerald-700 transition">
            Adicionar foto de perfil
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {erro && (
            <div className="col-span-1 md:col-span-2 bg-red-50 text-red-500 text-sm font-medium p-3 rounded-lg text-center">
              {erro}
            </div>
          )}

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo</label>
            <input 
              type="text" 
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input 
              type="tel" 
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition" 
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">CPF / CNPJ</label>
            <input 
              type="text" 
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition" 
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-6">
            <Link to="/cadastro" className="text-gray-500 hover:text-gray-700 font-medium transition">
              Voltar
            </Link>
            <button type="submit" className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-600 transition shadow-lg text-center">
              Continuar
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}