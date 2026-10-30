const CHAVE_PEDIDOS = 'lumos-pedidos';

function lerPedidos() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE_PEDIDOS) || '[]');
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

export function gerarIdPedido(agora = Date.now()) {
  const aleatorio = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LUM-${agora.toString(36).toUpperCase()}-${aleatorio}`;
}

export function criarPedido({ itens, valor, cep, agora = Date.now() }) {
  return {
    id: gerarIdPedido(agora),
    data: new Date(agora).toISOString(),
    itens: itens.map(({ id, nome, preco, quantidade, imagem }) => ({ id, nome, preco, quantidade, imagem })),
    valor,
    cep,
    status: 'confirmado'
  };
}

export function salvarPedido(pedido) {
  const pedidos = lerPedidos();
  const existente = pedidos.find((item) => item.id === pedido.id);
  if (!existente) localStorage.setItem(CHAVE_PEDIDOS, JSON.stringify([...pedidos, pedido]));
  return existente || pedido;
}

export function buscarPedido(id) {
  return lerPedidos().find((item) => item.id.toLowerCase() === String(id).trim().toLowerCase()) || null;
}

export function obterPedido(id) {
  return lerPedidos().find((item) => item.id.toLowerCase() === String(id).trim().toLowerCase()) || null;
}

export function listarPedidos() {
  return lerPedidos();
}

export function limparPedidos() {
  localStorage.removeItem(CHAVE_PEDIDOS);
}
