const API_URL = 'http://localhost:3001/produtos';

async function requisitar(url, signal) {
  const resposta = await fetch(url, { signal });
  if (!resposta.ok) throw new Error('Não foi possível carregar os produtos.');
  return resposta.json();
}

export function listarProdutos(signal) {
  return requisitar(API_URL, signal);
}

export function buscarProduto(id, signal) {
  return requisitar(`${API_URL}/${id}`, signal);
}
