import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleCadastro = (e) => {
    e.preventDefault()
    if (nome && email && senha) {
      // Futuramente, aqui enviarás os dados para o back-end das tuas colegas via fetch/axios
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen bg-[#0b1320] text-white font-sans flex flex-col justify-between">
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          HomeFix
        </Link>
        <Link to="/login" className="text-sm font-medium hover:text-emerald-400 transition">
          Já tem conta? <span className="text-emerald-400 font-bold">Entrar</span>
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
          <h1 className="text-2xl font-bold mb-2">Crie a sua conta</h1>
          <p className="text-sm text-slate-400 mb-6">Registe-se para encontrar e contratar profissionais.</p>

          <form onSubmit={handleCadastro} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Nome completo</label>
              <input 
                type="text" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="O seu nome" 
                required
                className="w-full py-3 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com" 
                required
                className="w-full py-3 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Palavra-passe</label>
              <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********" 
                required
                className="w-full py-3 px-4 rounded-lg bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500 transition"
              />
            </div>

            <button type="submit" className="w-full mt-2 py-3 bg-emerald-500 text-white font-bold rounded-lg hover:bg-emerald-600 transition shadow-md">
              Cadastrar
            </button>
          </form>
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-slate-500">
        <p>&copy; 2026 HomeFix. Projeto Académico UniFECAF.</p>
      </footer>
    </div>
  )
}