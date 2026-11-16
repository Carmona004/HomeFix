import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function RecuperacaoSenha() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return
    setEnviado(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-2xl font-bold text-gray-900 mb-6 hover:text-emerald-500 transition">
            <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            HomeFix
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Esqueceu a senha?</h1>
          <p className="text-gray-500 text-sm">Digite o seu e-mail cadastrado e enviaremos as instruções para redefinir a sua senha.</p>
        </div>

        {enviado ? (
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-center text-sm font-medium mb-6">
            Instruções enviadas com sucesso para o seu e-mail!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
              />
            </div>

            <button type="submit" className="w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 transition shadow-md mt-2">
              Enviar link de recuperação
            </button>
          </form>
        )}

        <div className="mt-8 text-center">
          <Link to="/login" className="text-emerald-600 font-bold hover:underline flex items-center justify-center gap-2 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}