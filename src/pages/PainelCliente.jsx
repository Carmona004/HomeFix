
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { buscarSolicitacoes } from '../services/api'

export default function PainelCliente() {
  const [filtro, setFiltro] = useState('todas')
  const [solicitacoes, setSolicitacoes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    async function carregarSolicitacoes() {
      try {
        setCarregando(true)
        setErro('')

        const dados = await buscarSolicitacoes()

        setSolicitacoes(dados.solicitacoes || [])
      } catch (error) {
        setErro(error.message || 'Não foi possível carregar suas solicitações.')
      } finally {
        setCarregando(false)
      }
    }

    carregarSolicitacoes()
  }, [])

  const solicitacoesFiltradas = solicitacoes.filter((item) => {
    if (filtro === 'abertas') return item.status === 'aberta'
    if (filtro === 'em_andamento') return item.status === 'em_andamento'
    return true
  })

  function formatarCategoria(categoria) {
    const categorias = {
      hidraulica: 'Hidráulica',
      eletrica: 'Elétrica',
      pintura: 'Pintura',
    }

    return categorias[categoria?.toLowerCase()] || categoria || 'Não informada'
  }

  function formatarStatus(status) {
    const statusMap = {
      aberta: 'Aberta',
      em_andamento: 'Em andamento',
      concluida: 'Concluída',
      cancelada: 'Cancelada',
    }

    return statusMap[status] || status
  }

  function corStatus(status) {
    if (status === 'aberta') {
      return 'bg-blue-50 text-blue-700'
    }

    if (status === 'em_andamento') {
      return 'bg-emerald-50 text-emerald-700'
    }

    if (status === 'concluida') {
      return 'bg-gray-100 text-gray-700'
    }

    if (status === 'cancelada') {
      return 'bg-red-50 text-red-700'
    }

    return 'bg-gray-100 text-gray-700'
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Minhas solicitações
          </h1>

          <Link
            to="/busca"
            className="bg-emerald-500 text-white px-6 py-3 rounded-full font-bold hover:bg-emerald-600 transition shadow-sm text-center"
          >
            Buscar Profissionais
          </Link>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <button
            type="button"
            onClick={() => setFiltro('todas')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition shadow-sm ${
              filtro === 'todas'
                ? 'bg-emerald-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Todas
          </button>

          <button
            type="button"
            onClick={() => setFiltro('abertas')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition shadow-sm ${
              filtro === 'abertas'
                ? 'bg-emerald-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Abertas
          </button>

          <button
            type="button"
            onClick={() => setFiltro('em_andamento')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition shadow-sm ${
              filtro === 'em_andamento'
                ? 'bg-emerald-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Em andamento
          </button>
        </div>

        {carregando ? (
          <div className="bg-white p-12 rounded-2xl text-center shadow-sm">
            <p className="text-gray-500">Carregando suas solicitações...</p>
          </div>
        ) : erro ? (
          <div className="bg-white p-12 rounded-2xl text-center shadow-sm">
            <p className="text-red-500">{erro}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {solicitacoesFiltradas.length > 0 ? (
              solicitacoesFiltradas.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">
                        {item.description}
                      </h3>

                      <p className="text-gray-500 text-sm mt-1">
                        {item.professional} • {formatarCategoria(item.category)}
                      </p>

                      <p className="text-gray-400 text-xs mt-1">
                        Especialidade: {item.specialty || 'Não informada'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span
                      className={`text-xs font-bold px-3 py-1.5 rounded-full ${corStatus(item.status)}`}
                    >
                      {formatarStatus(item.status)}
                    </span>

                    <button
                      type="button"
                      onClick={() => navigate(`/acompanhamento/${item.id}`)}
                      className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition flex items-center gap-1"
                    >
                      Acompanhar

                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center">
                <p className="text-gray-500 text-sm">
                  Nenhuma solicitação encontrada nesta categoria.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
