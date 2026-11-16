import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import CadastroTipo from './pages/CadastroTipo'
import CadastroCliente from './pages/CadastroCliente'
import CadastroProfissional from './pages/CadastroProfissional'
import PainelCliente from './pages/PainelCliente'
import PainelProfissional from './pages/PainelProfissional'
import BuscaProfissionais from './pages/BuscaProfissionais'
import PerfilProfissional from './pages/PerfilProfissional'
import SolicitarServico from './pages/SolicitarServico'
import Acompanhamento from './pages/Acompanhamento'
import Avaliacao from './pages/Avaliacao'
import Chat from './pages/Chat'
import MinhaCasa from './pages/MinhaCasa'
import RecomendacoesIA from './pages/RecomendacoesIA'
import ChatbotIA from './pages/ChatbotIA'
import RecuperacaoSenha from './pages/RecuperacaoSenha'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroTipo />} />
        <Route path="/cadastro/cliente" element={<CadastroCliente />} />
        <Route path="/cadastro/profissional" element={<CadastroProfissional />} />
        <Route path="/painel" element={<PainelCliente />} />
        <Route path="/painel-profissional" element={<PainelProfissional />} />
        <Route path="/busca" element={<BuscaProfissionais />} />
        <Route path="/perfil/:id" element={<PerfilProfissional />} />
        <Route path="/perfil" element={<PerfilProfissional />} />
        <Route path="/solicitar" element={<SolicitarServico />} />

        <Route path="/acompanhamento/:id?" element={<Acompanhamento />} />
        <Route path="/avaliacao" element={<Avaliacao />} />
        <Route path="/chat/:id?" element={<Chat />} />

        <Route path="/minhacasa" element={<MinhaCasa />} />
        <Route path="/recomendacoes" element={<RecomendacoesIA />} />
        <Route path="/chatbot" element={<ChatbotIA />} />
        <Route path="/recuperar-senha" element={<RecuperacaoSenha />} />
      </Routes>
    </BrowserRouter>
  )
}