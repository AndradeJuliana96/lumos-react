
const API_URL = "http://localhost:3001/produtos";

const ARQUIVO_PRODUTOS = `${import.meta.env.BASE_URL}produtos.json`;

async function requisitar(url, signal) {
  const resposta = await fetch(url, { signal });

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar os produtos.");
  }

  return resposta.json();
}

async function carregarProdutosEstaticos(signal) {
  const dados = await requisitar(ARQUIVO_PRODUTOS, signal);

  if (!Array.isArray(dados.produtos)) {
    throw new Error("Formato inválido dos produtos.");
  }

  return dados.produtos;
}

export function listarProdutos(signal) {
  if (import.meta.env.PROD) {
    return carregarProdutosEstaticos(signal);
  }

  return requisitar(API_URL, signal);
}

export async function buscarProduto(id, signal) {
  if (import.meta.env.PROD) {
    const produtos = await carregarProdutosEstaticos(signal);

    const produto = produtos.find(
      (item) => String(item.id) === String(id)
    );

    if (!produto) {
      throw new Error("Produto não encontrado.");
    }

    return produto;
  }

  return requisitar(
    `${API_URL}/${encodeURIComponent(id)}`,
    signal
  );
}
