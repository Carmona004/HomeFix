
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  buscarCategorias,
  criarSolicitacao,
  enviarMensagemChatbot
} from '../services/api'

export default function ChatbotIA() {
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const iniciarSolicitacao = async (e) => {
    e.preventDefault()
    setErro('')

    if (!descricao.trim()) {
      setErro('Conte ao assistente qual problema precisa resolver.')
      return
    }

    try {
      setCarregando(true)

      // Busca as categorias cadastradas no banco
      const dados = await buscarCategorias()
      const categorias = dados.categorias || []

      if (!categorias.length) {
        throw new Error('Não há categorias cadastradas no sistema.')
      }

      // Identifica a categoria provável pela descrição
      const texto = descricao
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

      const termos = {
        hidraulica: ['vazamento', 'torneira', 'cano', 'pia', 'agua', 'ralo', 'descarga'],
        eletrica: ['tomada', 'lampada', 'luz', 'energia', 'disjuntor', 'fio', 'chuveiro'],
        pintura: ['pintura', 'parede', 'tinta', 'pintar', 'mofo', 'infiltracao']
      }

      const encontrada = categorias.find(cat => {
        const nome = (cat.name || '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()

        return Object.entries(termos).some(([tipo, palavras]) =>
          nome.includes(tipo) &&
          palavras.some(palavra => texto.includes(palavra))
        )
      }) || categorias[0]

      // Cria a solicitação no banco de dados
      const resposta = await criarSolicitacao(
        descricao.trim(),
        encontrada.id
      )

      const id = resposta.solicitacao?.id

      if (!id) {
        throw new Error('A API não retornou o número da solicitação.')
      }

      // Guarda o ID da solicitação
      sessionStorage.setItem(
        'homefix_ultima_solicitacao',
        String(id)
      )

      // ENVIA A PRIMEIRA DESCRIÇÃO PARA O CHATBOT
      await enviarMensagemChatbot(id, descricao.trim())

      // Abre o chat com a resposta do chatbot
      navigate(`/chat/${id}`)

    } catch (error) {
      setErro(error.message || 'Não foi possível iniciar a solicitação.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-slate-900 text-white p-4 shadow-md flex items-center justify-between px-8">
        <Link to="/painel" className="hover:text-emerald-400 transition">
          ← Voltar ao painel
        </Link>

        <h1 className="font-bold text-lg">Assistente HomeFix</h1>
        <span className="w-6" />
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-8 flex items-center">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full p-6 md:p-8">

          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-5">
            HF
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Vamos abrir sua solicitação?
          </h2>

          <p className="text-gray-600 mb-6">
            Descreva o que está acontecendo. Vou registrar o pedido,
            analisar o problema e indicar a categoria e o profissional.
          </p>

          <form onSubmit={iniciarSolicitacao} className="space-y-4">

            <textarea
              rows="5"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              placeholder="Ex.: A torneira da cozinha está vazando..."
              className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:border-emerald-500"
              required
            />

            {erro && (
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {erro}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-emerald-500 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 disabled:opacity-50"
            >
              {carregando
                ? 'Registrando solicitação...'
                : 'Solicitar pelo chatbot'}
            </button>

          </form>
        </div>
      </main>
    </div>
  )
}
