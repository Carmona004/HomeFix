import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-slate-900 px-8 py-5 text-white flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-2xl font-semibold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          HomeFix
        </Link>
        <ul className="hidden md:flex gap-6 ml-8 text-sm font-light">
          <li className="cursor-pointer hover:text-emerald-400 transition">Início</li>
          <li className="cursor-pointer hover:text-emerald-400 transition">Serviços</li>
          <li className="cursor-pointer hover:text-emerald-400 transition">Como Funciona</li>
          <li className="cursor-pointer hover:text-emerald-400 transition">Smart Home</li>
          <li className="cursor-pointer hover:text-emerald-400 transition">Blog</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Link to="/login" className="text-white hover:text-emerald-400 transition font-medium flex items-center">
          Entrar
        </Link>
        <Link to="/cadastro" className="bg-white text-slate-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition flex items-center">
          Cadastrar
        </Link>
      </div>
    </nav>
  )
}
