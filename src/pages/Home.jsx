import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const profissionaisMock = [
  { id: 1, nome: 'João Silva', servico: 'Eletricista Residencial' },
  { id: 2, nome: 'Mariana Costa', servico: 'Técnica de Eletrodomésticos e Refrigeração' },
  { id: 3, nome: 'Carlos Souza', servico: 'Encanador e Reparador Hidráulico' },
  { id: 4, nome: 'Ana Paula Lima', servico: 'Especialista em Climatização e Ar-Condicionado' },
  { id: 5, nome: 'Marcos Oliveira', servico: 'Técnico de Reparos Gerais' }
]

export default function Home() {
  const [termoBusca, setTermoBusca] = useState('')
  const navigate = useNavigate()

  const resultadosFiltrados = termoBusca.trim() === '' ? [] : profissionaisMock.filter(p => 
    p.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
    p.servico.toLowerCase().includes(termoBusca.toLowerCase())
  )

  const handleSearch = (e) => {
    e.preventDefault()
    if (termoBusca.trim()) {
      navigate(`/busca?q=${encodeURIComponent(termoBusca)}`)
    }
  }

  const selecionarSugestao = (termoFiltro) => {
    setTermoBusca(termoFiltro)
    navigate(`/busca?q=${encodeURIComponent(termoFiltro)}`)
  }

  return (
    <div className="min-h-screen bg-[#0b1320] text-white font-sans">
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          HomeFix
        </Link>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 font-bold hover:text-emerald-400 transition">Entrar</Link>
          <Link to="/cadastro" className="px-5 py-2 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition">Cadastrar</Link>
        </div>
      </header>

      <main className="px-8 pt-20 pb-32 max-w-4xl mx-auto mt-10">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Sua casa mais inteligente segura e bem cuidada
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
          Encontre profissionais confiáveis, agende serviços e conte com recomendações e manutenções inteligentes para sua casa.
        </p>

        <div className="relative w-full max-w-3xl mb-6">
          <form onSubmit={handleSearch} className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              placeholder="O que precisa arrumar em casa?" 
              className="w-full py-4 pl-12 pr-32 rounded-lg text-gray-900 outline-none text-lg focus:ring-2 focus:ring-emerald-500 transition bg-white"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-emerald-500 text-white px-6 rounded-md font-bold hover:bg-emerald-600 transition">
              Buscar
            </button>
          </form>

          {resultadosFiltrados.length > 0 && (
            <div className="absolute left-0 right-0 mt-2 bg-white text-gray-900 rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-50">
              {resultadosFiltrados.map((prof) => (
                <Link 
                  key={prof.id} 
                  to={`/busca?q=${encodeURIComponent(prof.servico)}`} 
                  className="flex flex-col px-6 py-3 hover:bg-emerald-50 transition border-b border-gray-100 last:border-none"
                >
                  <span className="font-bold text-slate-900">{prof.nome}</span>
                  <span className="text-sm text-emerald-600 font-medium">{prof.servico}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
          <span className="font-medium text-slate-300">Sugestões:</span>
          <button onClick={() => selecionarSugestao('Eletricista')} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition border border-slate-700">
            ⚡ Tomada / Lâmpada
          </button>
          <button onClick={() => selecionarSugestao('Eletrodomésticos')} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition border border-slate-700">
            🧊 Geladeira / Eletrodoméstico
          </button>
          <button onClick={() => selecionarSugestao('Encanador')} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition border border-slate-700">
            🚰 Vazamento / Encanamento
          </button>
          <button onClick={() => selecionarSugestao('Climatização')} className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition border border-slate-700">
            ❄️ Ar-Condicionado
          </button>
        </div>
      </main>
    </div>
  )
}