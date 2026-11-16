
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  buscarCategorias,
  criarSolicitacao,
  buscarMensagens,
  enviarMensagemChatbot
} from '../services/api'

export default function Chat() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [solicitacaoId, setSolicitacaoId] = useState(id || '')
  const [input, setInput] = useState('')
  const [mensagens, setMensagens] = useState([])
  const [profissional, setProfissional] = useState(null)
  const [carregando, setCarregando] = useState(Boolean(id))
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  // Identifica a categoria pelo texto digitado
  function identificarCategoria(texto, categorias) {
    const mensagem = texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()

    const palavras = {
      hidraulica: [
        'vazamento', 'torneira', 'pia', 'cano',
        'encanamento', 'descarga', 'chuveiro',
        'agua', 'registro', 'esgoto', 'ralo'
      ],
      eletrica: [
        'tomada', 'lampada', 'luz', 'energia',
        'eletrica', 'disjuntor', 'fio',
        'curto circuito', 'interruptor', 'choque'
      ],
      pintura: [
        'pintura', 'parede', 'tinta', 'pintar',
        'mofo', 'descascando', 'infiltracao'
      ]
    }

    let melhorCategoria = null
    let maiorPontuacao = 0

    categorias.forEach((categoria) => {
      const nome = categoria.name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

      let tipo = ''

      if (nome.includes('hidraul')) tipo = 'hidraulica'
      if (nome.includes('eletric')) tipo = 'eletrica'
      if (nome.includes('pintur')) tipo = 'pintura'

      if (!tipo) return

      const pontuacao = palavras[tipo].filter(
        palavra => mensagem.includes(palavra)
      ).length

      if (pontuacao > maiorPontuacao) {
        maiorPontuacao = pontuacao
        melhorCategoria = categoria
      }
    })

    return melhorCategoria
  }

  // Carrega o histórico quando já existe uma solicitação
  useEffect(() => {
    setSolicitacaoId(id || '')

    async function carregarMensagens() {
      if (!id) {
        setMensagens([])
        setProfissional(null)
        setCarregando(false)
        return
      }

      try {
        setCarregando(true)
        setErro('')

        const dados = await buscarMensagens(id)
        setMensagens(dados.mensagens || [])
      } catch (error) {
        setErro(error.message || 'Não foi possível carregar a conversa.')
      } finally {
        setCarregando(false)
      }
    }

    carregarMensagens()
  }, [id])

  function formatarHora(data) {
    if (!data) return ''

    return new Date(data).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  async function handleEnviar(e) {
    e.preventDefault()

    if (!input.trim() || enviando) return

    const mensagem = input.trim()

    try {
      setEnviando(true)
      setErro('')
      setInput('')

      let idAtual = solicitacaoId

      // Se ainda não existe solicitação, cria uma pelo primeiro envio
      if (!idAtual) {
        const dadosCategorias = await buscarCategorias()
        const categorias = dadosCategorias.categorias || []

        const categoria = identificarCategoria(
          mensagem,
          categorias
        )

        if (!categoria) {
          setMensagens(prev => [
            ...prev,
            {
              id: Date.now(),
              sender: 'resident',
              message: mensagem
            },
            {
              id: Date.now() + 1,
              sender: 'bot',
              message: 'Ainda não consegui identificar o problema. Você pode explicar melhor? Por exemplo: é um vazamento, um problema elétrico ou uma parede precisando de pintura?'
            }
          ])
          return
        }

        const novaSolicitacao = await criarSolicitacao(
          mensagem,
          categoria.id
        )

        idAtual = novaSolicitacao.solicitacao.id

        setSolicitacaoId(String(idAtual))

        sessionStorage.setItem(
          'homefix_ultima_solicitacao',
          idAtual
        )

        if (novaSolicitacao.profissional) {
          setProfissional({
            nome: novaSolicitacao.profissional,
            especialidade: novaSolicitacao.especialidade
          })
        }

        // Atualiza a URL com o ID da solicitação criada
        navigate(`/chat/${idAtual}`, { replace: true })
      }

      // Envia a mensagem para o chatbot do backend
      const resposta = await enviarMensagemChatbot(
        idAtual,
        mensagem
      )

      if (resposta.profissional_indicado) {
        setProfissional(resposta.profissional_indicado)
      }

      // Atualiza o histórico da conversa
      const historico = await buscarMensagens(idAtual)

      setMensagens(historico.mensagens || [])

    } catch (error) {
      setInput(mensagem)
      setErro(
        error.message || 'Não foi possível enviar a mensagem.'
      )
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="h-screen bg-white flex overflow-hidden">

      {/* LATERAL */}
      <div className="w-full md:w-80 border-r border-gray-100 flex flex-col bg-slate-50 shrink-0">

        <div className="p-4 border-b border-gray-100 bg-white flex items-center gap-3">
          <Link
            to="/painel"
            className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>

          <div>
            <h2 className="font-bold text-gray-900">HomeFix</h2>
            <p className="text-xs text-gray-500">Central de atendimento</p>
          </div>
        </div>

        <div className="p-4">
          <div className="bg-emerald-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                HF
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Assistente HomeFix
                </h3>
                <p className="text-xs text-emerald-700">
                  Atendimento automático
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-3">
              Descreva seu problema e vamos identificar a categoria e o profissional adequado.
            </p>
          </div>
        </div>

        <div className="px-4">
          <p className="text-xs font-semibold text-gray-400 uppercase">
            Solicitação atual
          </p>
          <p className="text-sm text-gray-700 mt-2">
            {solicitacaoId
              ? `Solicitação #${solicitacaoId}`
              : 'Nova solicitação'}
          </p>
        </div>
      </div>

      {/* CONVERSA */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">

        <header className="p-4 border-b border-gray-100 flex items-center gap-3 bg-white shadow-sm">
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            HF
          </div>

          <div>
            <h2 className="font-bold text-gray-900">
              Assistente HomeFix
            </h2>
            <p className="text-xs text-gray-500">
              Identificação de problemas residenciais
            </p>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4">

          <div className="flex justify-start">
            <div className="max-w-md rounded-2xl px-5 py-3 text-sm shadow-sm bg-white border border-gray-100 text-gray-800 rounded-tl-none">
              Olá! Sou o assistente virtual do HomeFix. Conte o que está acontecendo na sua residência para que eu possa identificar o profissional adequado.
            </div>
          </div>

          {carregando && (
            <p className="text-center text-sm text-gray-500">
              Carregando histórico da conversa...
            </p>
          )}

          {!carregando && mensagens.map((msg) => {
            const mensagemDoMorador = msg.sender === 'resident'

            return (
              <div
                key={msg.id}
                className={`flex ${
                  mensagemDoMorador ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-md rounded-2xl px-5 py-3 text-sm shadow-sm ${
                    mensagemDoMorador
                      ? 'bg-emerald-500 text-white rounded-tr-none'
                      : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {msg.message}

                  <span
                    className={`text-[10px] block mt-1 text-right ${
                      mensagemDoMorador
                        ? 'text-emerald-100'
                        : 'text-gray-400'
                    }`}
                  >
                    {formatarHora(msg.created_at)}
                  </span>
                </div>
              </div>
            )
          })}

          {enviando && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl px-5 py-3 text-sm text-gray-500">
                O assistente está analisando sua mensagem...
              </div>
            </div>
          )}

          {profissional && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 max-w-md">
              <h3 className="font-bold text-emerald-800 mb-2">
                Profissional identificado!
              </h3>

              <p className="text-sm text-gray-700">
                <strong>Nome:</strong> {profissional.nome}
              </p>

              <p className="text-sm text-gray-700">
                <strong>Especialidade:</strong> {profissional.especialidade}
              </p>

              {profissional.telefone && (
                <p className="text-sm text-gray-700">
                  <strong>Telefone:</strong> {profissional.telefone}
                </p>
              )}
            </div>
          )}

          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
              {erro}
            </div>
          )}

        </main>

        {/* CAMPO DE ENVIO */}
        <footer className="p-4 bg-white border-t border-gray-100">
          <form
            onSubmit={handleEnviar}
            className="flex gap-2 items-center bg-slate-50 p-2 rounded-full border border-gray-200 focus-within:border-emerald-500 transition shadow-sm"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Descreva seu problema..."
              disabled={enviando || carregando}
              className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 px-3"
            />

            <button
              type="submit"
              disabled={enviando || !input.trim() || carregando}
              className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white hover:bg-emerald-600 transition shadow-sm shrink-0 disabled:opacity-50"
            >
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
        </footer>

      </div>
    </div>
  )
}
