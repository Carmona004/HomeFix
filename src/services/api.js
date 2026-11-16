
const API_URL = 'http://localhost:3001';

// Função central para fazer requisições ao backend
export async function requisicaoAPI(endpoint, options = {}) {
  const token = localStorage.getItem('homefix_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const resposta = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const dados = await resposta.json().catch(() => ({}));

  if (!resposta.ok) {
    throw new Error(
      dados.mensagem || dados.message || dados.erro || 'Não foi possível realizar a operação.'
    );
  }

  return dados;
}

// Cadastro de morador
export async function cadastrarMorador(dados) {
  return requisicaoAPI('/moradores', {
    method: 'POST',
    body: JSON.stringify(dados),
  });
}

// Login de morador
export async function loginUsuario(email, senha) {
  const dados = await requisicaoAPI('/moradores/login', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password: senha,
    }),
  });

  if (dados.token) {
    localStorage.setItem('homefix_token', dados.token);
  }

  return dados;
}

// Buscar categorias disponíveis
export async function buscarCategorias() {
  return requisicaoAPI('/categorias');
}

// Buscar solicitações do morador autenticado
export async function buscarSolicitacoes() {
  return requisicaoAPI('/solicitacoes');
}

// Encerrar sessão
export function logoutUsuario() {
  localStorage.removeItem('homefix_token');
}

// Criar uma nova solicitação
export async function criarSolicitacao(descricao, categoriaId) {
  return requisicaoAPI('/solicitacoes', {
    method: 'POST',
    body: JSON.stringify({
      description: descricao,
      category_id: Number(categoriaId),
    }),
  });
}

export async function buscarMensagens(solicitacaoId) {
  return requisicaoAPI(`/solicitacoes/${solicitacaoId}/mensagens`);
}

export async function enviarMensagemChatbot(solicitacaoId, message) {
  return requisicaoAPI(`/solicitacoes/${solicitacaoId}/chatbot`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}
