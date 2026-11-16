import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Avaliacao() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [comentario, setComentario] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/painel')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Avalie o serviço</h1>
        <p className="text-gray-500 text-sm mb-8">Como foi a sua experiência com o profissional?</p>

        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden mb-4 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400 mt-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-900">João Silva</h2>
          <p className="text-emerald-600 text-sm font-medium">Eletricista</p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button 
              type="button"
              key={star} 
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="focus:outline-none transition-transform hover:scale-110"
            >
              <svg 
                className={`w-10 h-10 ${
                  star <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                } transition-colors`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea 
            rows="3"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Deixe um comentário sobre o serviço (opcional)"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition resize-none text-sm"
          ></textarea>

          <button type="submit" className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition shadow-md mt-2">
            Enviar avaliação
          </button>
          
          <Link to="/painel" className="text-gray-400 text-sm font-medium hover:text-gray-600 transition mt-2">
            Pular esta etapa
          </Link>
        </form>

      </div>
    </div>
  )
}