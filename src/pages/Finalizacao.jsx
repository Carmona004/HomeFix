import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { finalizarSolicitacao } from '../services/api'

export default function Finalizacao() {
  const { id } = useParams()

  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState(false)

  useEffect(() => {
    async function finalizar() {
      if (!id) {
        setErro('Não foi possível identificar a solicitação.')
        setCarregando(false)
        return
      }

      try {
        await finalizarSolicitacao(id)
        setSucesso(true)
      } catch (error) {
        setErro(error.message || 'Erro ao finalizar o serviço.')
      } finally {
        setCarregando(false)
      }
    }

    finalizar()
  }, [id])

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-sm border border-gray-100 text-center">

        {carregando ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Finalizando serviço...
            </h1>
            <p className="text-gray-500">
              Aguarde enquanto registramos a conclusão.
            </p>
          </>
        ) : sucesso ? (
          <>
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Serviço finalizado!
            </h1>

            <p className="text-gray-500 mb-8">
              Sua solicitação foi concluída com sucesso.
            </p>

            <Link
              to="/avaliacao"
              className="block w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition"
            >
              Avaliar serviço
            </Link>

            <Link
              to="/painel"
              className="block text-gray-400 text-sm mt-5 hover:text-gray-600"
            >
              Voltar ao início
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Não foi possível finalizar
            </h1>

            <p className="text-red-500 mb-8">
              {erro}
            </p>

            <Link
              to="/painel"
              className="block w-full bg-gray-900 text-white font-bold py-3 rounded-lg"
            >
              Voltar ao painel
            </Link>
          </>
        )}

      </div>
    </div>
  )
}