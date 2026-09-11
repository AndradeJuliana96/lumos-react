export const emCentavos = preco => Math.round(preco * 100);
export const subtotal = produto => emCentavos(produto.preco) * produto.quantidade;
export const totalCompra = produtos => produtos.reduce((total, produto) => total + subtotal(produto), 0);
export const formatarMoeda = centavos => new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
}).format(centavos / 100);
