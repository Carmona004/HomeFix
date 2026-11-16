import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function PerfilProfissional() {
  const { id } = useParams()
  const [abaAtiva, setAbaAtiva] = useState('Sobre')

  const baseDadosProfissionais = {
    1: { 
      nome: 'João Silva', 
      profissao: 'Eletricista Residencial', 
      rating: '4.9', 
      avaliacoes: '120', 
      sobre: 'Especialista em instalações elétricas, troca de disjuntores, tomadas, chuveiros, lustres e reparação de curtos-circuitos residenciais.',
      itensAtendidos: ['Chuveiros elétricos', 'Troca de lâmpadas e lustres', 'Disjuntores e quadros elétricos', 'Tomadas e interruptores']
    },
    2: { 
      nome: 'Mariana Costa', 
      profissao: 'Técnica de Eletrodomésticos e Refrigeração', 
      rating: '4.8', 
      avaliacoes: '85', 
      sobre: 'Especializada em diagnóstico e conserto de geladeiras, máquinas de lavar roupa, micro-ondas e eletrodomésticos da linha branca.',
      itensAtendidos: ['Geladeiras e freezers', 'Máquinas de lavar', 'Micro-ondas', 'Fornos elétricos']
    },
    3: { 
      nome: 'Carlos Souza', 
      profissao: 'Encanador e Reparador Hidráulico', 
      rating: '4.7', 
      avaliacoes: '94', 
      sobre: 'Especialista em caça-vazamentos, desentupimentos rápidos, reparo de torneiras, caixas de descarga e tubulações.',
      itensAtendidos: ['Vazamentos e canos furados', 'Torneiras e registros', 'Desentupimentos', 'Caixas de descarga']
    },
    4: { 
      nome: 'Ana Paula Lima', 
      profissao: 'Especialista em Climatização e Ar-Condicionado', 
      rating: '5.0', 
      avaliacoes: '62', 
      sobre: 'Instalação completa, higienização de filtros profunda e manutenção preventiva ou corretiva em aparelhos de ar-condicionado.',
      itensAtendidos: ['Ar-condicionado Split', 'Limpeza e troca de filtros', 'Carga de gás', 'Manutenção preventiva']
    },
    5: { 
      nome: 'Marcos Oliveira', 
      profissao: 'Técnico de Reparos Gerais', 
      rating: '4.9', 
      avaliacoes: '140', 
      sobre: 'Solução prática para pequenos reparos domésticos, montagem de móveis, fixação de suportes de TV, prateleiras e cortinas.',
      itensAtendidos: ['Montagem de móveis', 'Suportes de TV e quadros', 'Pequenos consertos', 'Instalação de varões e cortinas']
    }
  }

  const profissional = baseDadosProfissionais[id] || baseDadosProfissionais[1]

  const avaliacoesClientes = [
    { id: 1, nome: 'Carlos Almeida', nota: 5, data: '15/10/2026', comentario: 'Excelente profissional! Muito pontual, educado e resolveu o problema perfeitamente.' },
    { id: 2, nome: 'Roberto Mendes', nota: 5, data: '02/10/2026', comentario: 'Serviço limpo e organizado. Explicou tudo o que estava errado antes de consertar.' },
    { id: 3, nome: 'Fernanda Lima', nota: 5, data: '20/09/2026', comentario: 'Salvou o meu dia! Rápido, honesto e cobrou um preço justo pelo reparo.' }
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full bg-slate-900 text-white p-4 flex items-center px-8">
        <Link to="/busca" className="flex items-center gap-2 hover:text-emerald-400 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Voltar para a busca
        </Link>
      </div>

      <div className="w-full max-w-4xl p-6 mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden shrink-0">
            <svg className="w-full h-full text-gray-400 mt-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-gray-900">{profissional.nome}</h1>
              <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-gray-600 text-lg mb-2">{profissional.profissao}</p>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center gap-1 font-medium text-gray-700">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                {profissional.rating} ({profissional.avaliacoes} avaliações)
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                São Paulo - SP
              </span>
            </div>

            <div className="flex gap-4">
              <Link to="/solicitar" className="bg-emerald-500 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-600 transition shadow-sm">
                Solicitar serviço
              </Link>
              <Link to="/chat" className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-bold hover:bg-gray-50 transition shadow-sm">
                Enviar mensagem
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-b border-gray-200 w-full">
          <nav className="flex gap-8">
            {['Sobre', 'Serviços', 'Avaliações'].map((aba) => (
              <button
                key={aba}
                type="button"
                onClick={() => setAbaAtiva(aba)}
                className={`pb-4 font-bold transition focus:outline-none ${
                  abaAtiva === aba 
                    ? 'text-emerald-500 border-b-2 border-emerald-500' 
                    : 'text-gray-500 hover:text-gray-700 font-medium'
                }`}
              >
                {aba}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 w-full">
          {abaAtiva === 'Sobre' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Sobre o profissional</h2>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {profissional.sobre}
              </p>
            </div>
          )}

          {abaAtiva === 'Serviços' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">O que costuma arrumar em casa</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profissional.itensAtendidos.map((servico, index) => (
                  <div key={index} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-3">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-gray-800 font-medium text-sm">{servico}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {abaAtiva === 'Avaliações' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Avaliações de clientes</h2>
              {avaliacoesClientes.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-900">{item.nome}</h3>
                    <span className="text-xs text-gray-400">{item.data}</span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(item.nota)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{item.comentario}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}