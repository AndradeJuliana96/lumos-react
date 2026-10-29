export const estadoInicialCarrinho = [];

export function numeroFinito(valor) {
  const numero = typeof valor === 'string' && valor.trim() === '' ? NaN : Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

export function normalizarQuantidade(valor, maximo = Number.MAX_SAFE_INTEGER) {
  const numero = numeroFinito(valor); const max = numeroFinito(maximo);
  if (numero === null || max === null || max < 1) return null;
  return Math.max(1, Math.min(Math.trunc(numero), Math.trunc(max)));
}

export function normalizarProduto(produto) {
  if (!produto || produto.id === undefined) return null;
  const preco = numeroFinito(produto.preco); const estoque = numeroFinito(produto.estoque);
  if (preco === null || preco < 0 || estoque === null || estoque < 0) return null;
  const quantidade = produto.quantidade === undefined ? 1 : normalizarQuantidade(produto.quantidade, estoque);
  if (quantidade === null) return null;
  return { ...produto, preco, estoque: Math.trunc(estoque), quantidade };
}

export function normalizarItens(itens) { return Array.isArray(itens) ? itens.map(normalizarProduto).filter(Boolean) : []; }

export function estoqueDisponivel(estoque, quantidadeNoCarrinho = 0) {
  const valorEstoque = estoque && typeof estoque === 'object' ? estoque.estoque : estoque;
  const total = numeroFinito(valorEstoque); const usado = numeroFinito(quantidadeNoCarrinho);
  if (total === null || usado === null || total < 0 || usado < 0) return null;
  return Math.max(0, Math.trunc(total) - Math.trunc(usado));
}

export function carrinhoReducer(itens, acao) {
  const atuais = normalizarItens(itens);
  switch (acao.type) {
    case 'ADICIONAR': {
      const produto = normalizarProduto({ ...acao.produto, quantidade: undefined });
      if (!produto) return atuais;
      const quantidade = normalizarQuantidade(acao.quantidade ?? 1, produto.estoque);
      if (quantidade === null) return atuais;
      const existente = atuais.find((item) => item.id === produto.id);
      if (existente) { const novaQuantidade = Math.min(existente.quantidade + quantidade, existente.estoque); return atuais.map((item) => item.id === produto.id ? { ...item, quantidade: novaQuantidade } : item); }
      return [...atuais, { ...produto, quantidade }];
    }
    case 'ALTERAR_QUANTIDADE':
      return atuais.map((item) => item.id === acao.id ? { ...item, quantidade: normalizarQuantidade(acao.quantidade, item.estoque) ?? item.quantidade } : item);
    case 'REMOVER': return atuais.filter((item) => item.id !== acao.id);
    case 'LIMPAR': return estadoInicialCarrinho;
    default: return atuais;
  }
}

export const podeAcessarPagamento = (itens) => Array.isArray(itens) && itens.length > 0;
