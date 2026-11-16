import { Link, useParams } from 'react-router-dom'

export default function Acompanhamento() {
  const { id } = useParams()
  const solicitacaoId = id || sessionStorage.getItem('homefix_ultima_solicitacao')

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">

        <div className="flex items-center gap-4 mb-8">
          <Link to="/painel" className="text-gray-400 hover:text-emerald-500 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>

          <h1 className="text-2xl font-bold text-gray-900">
            Acompanhamento do serviço
          </h1>

          <span className="ml-auto px-4 py-1 bg-emerald-50 text-emerald-600 font-semibold rounded-full text-sm">
            Em andamento
          </span>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">
            Solicitação #{solicitacaoId || 'HF1024'}
          </p>
          <h2 className="text-lg font-bold text-gray-800">
            Instalação de chuveiro elétrico
          </h2>
        </div>

        {/* Linha do tempo do serviço */}
        <div className="relative border-l-2 border-emerald-500 ml-3 md:ml-4 space-y-8 pb-8">

          <div className="relative pl-8">
            <div className="absolute -left-[11px] top-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">Solicitação enviada</h3>
            <p className="text-sm text-gray-500">28/11 às 10:00</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[11px] top-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">Profissional confirmou</h3>
            <p className="text-sm text-gray-500">28/11 às 10:30</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[11px] top-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">Profissional a caminho</h3>
            <p className="text-sm text-gray-500">28/11 às 11:05</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[11px] top-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="font-bold text-emerald-600">Serviço em andamento</h3>
            <p className="text-sm text-emerald-500 font-medium">Agora</p>
          </div>

          <div className="relative pl-8">
            <div className="absolute -left-[11px] top-0 w-5 h-5 bg-gray-200 rounded-full border-4 border-white"></div>
            <h3 className="font-bold text-gray-400">Serviço concluído</h3>
          </div>

        </div>

        {/* Informações do profissional e ações */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-gray-100">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
              JS
            </div>

            <div>
              <h4 className="font-bold text-gray-900 text-sm">João Silva</h4>
              <p className="text-xs text-gray-500">Eletricista</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">

            <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-emerald-500 hover:border-emerald-500 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>

            <Link to="/chat" className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012 2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </Link>

            <Link
              to={solicitacaoId ? `/finalizacao/${solicitacaoId}` : "/painel"}
              className="px-4 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition shadow-sm text-sm flex items-center"
            >
              Finalizar e Avaliar
            </Link>

          </div>
        </div>

      </div>
    </div>
  )
}