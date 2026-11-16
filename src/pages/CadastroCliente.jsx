
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cadastrarMorador, loginUsuario } from '../services/api'

export default function CadastroCliente() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [apartamento, setApartamento] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()

  const handleCadastro = async (e) => {
    e.preventDefault()
    setErro('')

    if (!nome.trim() || !email.trim() || !senha || !apartamento.trim()) {
      setErro('Preencha todos os campos.')
      return
    }

    try {
      setCarregando(true)

      await cadastrarMorador({
        name: nome.trim(),
        email: email.trim(),
        password: senha,
        apartment: apartamento.trim()
      })

      await loginUsuario(email.trim(), senha)

      navigate('/painel')

    } catch (error) {
      setErro(error.message || 'Não foi possível realizar o cadastro.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-sm border border-gray-100">

        <div className="flex justify-between items-center mb-10">
          <Link to="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
            HomeFix
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Cadastro de Cliente
        </h1>

        <form onSubmit={handleCadastro} className="flex flex-col gap-6">

          {erro && (
            <div className="bg-red-50 text-red-500 text-sm font-medium p-3 rounded-lg text-center">
              {erro}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome completo
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apartamento
            </label>
            <input
              type="text"
              value={apartamento}
              onChange={(e) => setApartamento(e.target.value)}
              placeholder="Ex.: 102"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <Link to="/cadastro" className="text-gray-500 hover:text-gray-700 font-medium transition">
              Voltar
            </Link>

            <button
              type="submit"
              disabled={carregando}
              className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-600 transition shadow-lg text-center disabled:opacity-50"
            >
              {carregando ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
