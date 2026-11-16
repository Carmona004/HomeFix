import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const todosProfissionais = [
  { id: 1, nome: 'João Silva', servico: 'Eletricista Residencial', categoria: 'eletrica', avaliacao: '4.9' },
  { id: 2, nome: 'Lucas Almeida', servico: 'Eletricista e Instalações', categoria: 'eletrica', avaliacao: '4.8' },
  { id: 3, nome: 'Mariana Costa', servico: 'Técnica de Eletrodomésticos e Refrigeração', categoria: 'manutencao', avaliacao: '4.8' },
  { id: 4, nome: 'Roberto Dias', servico: 'Manutenção de Geladeiras e Máquinas', categoria: 'manutencao', avaliacao: '4.6' },
  { id: 5, nome: 'Carlos Souza', servico: 'Encanador e Reparador Hidráulico', categoria: 'hidraulica', avaliacao: '4.7' },
  { id: 6, nome: 'Bruno Mendes', servico: 'Caça-Vazamentos e Encanamento Geral', categoria: 'hidraulica', avaliacao: '4.9' },
  { id: 7, nome: 'Ana Paula Lima', servico: 'Especialista em Climatização e Ar-Condicionado', categoria: 'climatizacao', avaliacao: '5.0' },
  { id: 8, nome: 'Marcos Oliveira', servico: 'Técnico de Reparos Gerais e Marido de Aluguel', categoria: 'geral', avaliacao: '4.9' },
  { id: 9, nome: 'Fernanda Lima', servico: 'Montadora de Móveis e Reparos', categoria: 'geral', avaliacao: '4.7' }
]

export default function BuscaProfissionais() {
  const [searchParams] = useSearchParams()
  const termoUrl = searchParams.get('q') || ''
  
  const [termo, setTermo] = useState(termoUrl)
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')

  useEffect(() => {
    setTermo(termoUrl)
  }, [termoUrl])

  const profissionaisFiltrados = todosProfissionais.filter(p => {
    const matchTermo = 
      p.nome.toLowerCase().includes(termo.toLowerCase()) || 
      p.servico.toLowerCase().includes(termo.toLowerCase())

    if (categoriaAtiva === 'todos') return matchTermo
    return matchTermo && p.categoria === categoriaAtiva
  })

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 font-sans p-8">
      <div className="max-w-6xl mx-auto mb-10 flex items-center justify-between">
        <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2">
          ← Voltar ao Início
        </Link>
      </div>

      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Encontre o profissional ideal</h1>
          
          <div className="relative max-w-2xl mx-auto mb-6">
            <input 
              type="text" 
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Ex: Eletricista, Geladeira, Encanador..." 
              className="w-full py-4 pl-4 pr-32 rounded-full border border-gray-200 outline-none text-gray-900 shadow-sm focus:ring-2 focus:ring-emerald-500 transition bg-white"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-emerald-500 text-white px-6 rounded-full font-bold hover:bg-emerald-600 transition flex items-center gap-2">
              🔍 Buscar
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => setCategoriaAtiva('todos')} 
              className={`px-5 py-2 rounded-full font-medium transition ${categoriaAtiva === 'todos' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              Todos
            </button>
            <button 
              onClick={() => setCategoriaAtiva('eletrica')} 
              className={`px-5 py-2 rounded-full font-medium transition ${categoriaAtiva === 'eletrica' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              Elétrica
            </button>
            <button 
              onClick={() => setCategoriaAtiva('hidraulica')} 
              className={`px-5 py-2 rounded-full font-medium transition ${categoriaAtiva === 'hidraulica' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              Hidráulica
            </button>
            <button 
              onClick={() => setCategoriaAtiva('manutencao')} 
              className={`px-5 py-2 rounded-full font-medium transition ${categoriaAtiva === 'manutencao' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              Manutenção
            </button>
            <button 
              onClick={() => setCategoriaAtiva('climatizacao')} 
              className={`px-5 py-2 rounded-full font-medium transition ${categoriaAtiva === 'climatizacao' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              Climatização
            </button>
            <button 
              onClick={() => setCategoriaAtiva('geral')} 
              className={`px-5 py-2 rounded-full font-medium transition ${categoriaAtiva === 'geral' ? 'bg-emerald-500 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              Geral
            </button>
          </div>
        </div>

        {profissionaisFiltrados.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {profissionaisFiltrados.map((prof) => (
              <div key={prof.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                      {prof.nome.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{prof.nome}</h3>
                      <p className="text-sm text-emerald-600 font-medium">{prof.servico}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400 text-sm mb-6">
                    <span>★</span>
                    <span className="font-bold text-gray-800">{prof.avaliacao}</span>
                  </div>
                </div>

                <Link 
                  to={`/perfil/${prof.id}`} 
                className="w-full py-2.5 bg-white border border-gray-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 text-gray-700 text-center font-bold rounded-xl transition"
                >
                  Ver perfil
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">Nenhum profissional encontrado para esta busca.</p>
            <button 
              onClick={() => { setTermo(''); setCategoriaAtiva('todos'); }} 
              className="mt-4 px-6 py-2 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition"
            >
              Ver todos os profissionais
            </button>
          </div>
        )}
      </main>
    </div>
  )
}