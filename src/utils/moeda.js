export const emCentavos = preco => {
  if (preco === null || (typeof preco === 'string' && preco.trim() === '') || !Number.isFinite(Number(preco))) throw new TypeError('Preço deve ser um número finito.');
  return Math.round(Number(preco) * 100);
};
export const subtotal = produto => {
  if (!produto || produto.quantidade === null || (typeof produto.quantidade === 'string' && produto.quantidade.trim() === '') || !Number.isFinite(Number(produto.quantidade))) throw new TypeError('Quantidade deve ser um número finito.');
  return emCentavos(produto.preco) * Number(produto.quantidade);
};
export const totalCompra = produtos => produtos.reduce((total, produto) => total + subtotal(produto), 0);
export const formatarMoeda = centavos => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(centavos / 100);
