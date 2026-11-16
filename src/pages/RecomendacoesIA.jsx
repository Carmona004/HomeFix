import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

export default function RecomendacoesIA() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* O menu lateral escuro inteiro está a ser puxado apenas com esta linha abaixo! */}
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Recomendações e Insights IA</h1>
            <p className="text-gray-500 text-sm mt-1">Análise preditiva do estado dos equipamentos da sua residência.</p>
          </div>
          <Link to="/chatbot" className="bg-emerald-500 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-600 transition shadow-sm text-center">
            Conversar com Chatbot IA
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Manutenção Preventiva</h3>
                <p className="text-xs text-yellow-600 font-medium">Atenção necessária em breve</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-6">O filtro do Ar-condicionado da sala atinge o ciclo de limpeza recomendada em 5 dias.</p>
            <Link to="/busca" className="inline-block bg-slate-50 border border-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition">
              Contratar Técnico Especializado
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Eficiência Energética</h3>
                <p className="text-xs text-emerald-600 font-medium">Desempenho ideal</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-6">O consumo geral da residência reduziu 12% após a revisão recente do chuveiro elétrico.</p>
            <Link to="/minhacasa" className="inline-block bg-slate-50 border border-gray-200 text-gray-700 font-bold px-4 py-2 rounded-xl text-sm hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition">
              Ver equipamentos
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}