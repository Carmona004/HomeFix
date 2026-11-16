import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()
  const path = location.pathname

  const linkBase = "flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium"
  const linkAtivo = "bg-emerald-500 text-white shadow-md"
  const linkInativo = "text-gray-300 hover:bg-slate-800"

  return (
    <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col shrink-0 min-h-screen">
      <div className="p-6">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          HomeFix
        </Link>
      </div>
      
      <nav className="flex-1 px-4 space-y-2 mt-4">
        <Link to="/painel" className={`${linkBase} ${path === '/painel' ? linkAtivo : linkInativo}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          Minhas solicitações
        </Link>
        <Link to="/minhacasa" className={`${linkBase} ${path === '/minhacasa' ? linkAtivo : linkInativo}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Minha casa
        </Link>
        <Link to="/recomendacoes" className={`${linkBase} ${path === '/recomendacoes' ? linkAtivo : linkInativo}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Insights IA
        </Link>
        <Link to="/chat" className={`${linkBase} ${path === '/chat' ? linkAtivo : linkInativo}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          Mensagens
        </Link>
      </nav>
    </aside>
  )
}