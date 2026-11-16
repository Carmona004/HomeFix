
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { criarSolicitacao } from '../services/api'

export default function SolicitarServico() {
  const [servico, setServico] = useState('1')
  const [descricao, setDescricao] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const navigate = useNavigate()

  const categorias = [
    { id: 1, nome: 'Hidráulica', profissional: 'João Silva', especialidade: 'Encanador' },
    { id: 2, nome: 'Elétrica', profissional: 'Carlos Lima', especialidade: 'Eletricista' },
    { id: 3, nome: 'Pintura', profissional: 'Maria Santos', especialidade: 'Pintora' },
  ]

  const categoriaSelecionada = categorias.find(
    (categoria) => categoria.id === Number(servico)
  )

  const handleEnviar = async (e) => {
    e.preventDefault()
    setErro('')

    if (!descricao.trim()) {
      setErro('Descreva o problema que precisa de atendimento.')
      return
    }

    try {
      setCarregando(true)

      const resposta = await criarSolicitacao(descricao, servico)

      // Guarda o ID da solicitação criada
      sessionStorage.setItem(
        'homefix_ultima_solicitacao',
        resposta.solicitacao.id
      )

      // Volta ao painel para visualizar a solicitação
      navigate('/painel')
    } catch (error) {
      setErro(error.message || 'Não foi possível cadastrar a solicitação.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 relative overflow-hidden">

        {carregando && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
            <h2 className="text-xl font-bold text-gray-900">
              Enviando sua solicitação...
            </h2>
            <p className="text-gray-500 mt-2">
              Aguarde enquanto registramos seu pedido.
            </p>
          </div>
        )}

        <div className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <Link
              to="/"
              className="text-xl font-bold text-gray-800 flex items-center gap-2"
            >
              <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              HomeFix
            </Link>

            <span className="text-sm font-medium text-emerald-600">
              Nova solicitação
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Solicitar serviço
          </h1>

          <p className="text-gray-500 text-sm mb-6">
            Conte o que está acontecendo e escolha a categoria do atendimento.
          </p>

          <form onSubmit={handleEnviar} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria do serviço
              </label>

              <select
                value={servico}
                onChange={(e) => setServico(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition bg-white"
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>

            {categoriaSelecionada && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  Profissional responsável
                </p>

                <p className="font-bold text-gray-900 mt-1">
                  {categoriaSelecionada.profissional}
                </p>

                <p className="text-sm text-emerald-700">
                  {categoriaSelecionada.especialidade}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descreva o que precisa
              </label>

              <textarea
                rows="4"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Ex.: Minha torneira está vazando e preciso de manutenção."
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none"
              />
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
                {erro}
              </div>
            )}

            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={() => navigate('/painel')}
                className="text-gray-500 hover:text-gray-700 font-medium transition"
              >
                Voltar
              </button>

              <button
                type="submit"
                disabled={carregando}
                className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-600 transition shadow-lg disabled:opacity-50"
              >
                {carregando ? 'Enviando...' : 'Confirmar Solicitação'}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:flex w-1/3 bg-slate-900 rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-emerald-900 opacity-20"></div>

          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
            <h3 className="text-lg font-bold mb-1">
              HomeFix
            </h3>

            <p className="text-emerald-400 text-sm font-medium">
              Encontre o profissional certo para resolver o problema da sua casa.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
