export function filtrarProdutos(produtos, termo = '', categoria = 'Todas') {
  const busca = termo.trim().toLocaleLowerCase();
  return produtos.filter((produto) => {
    const correspondeCategoria = categoria === 'Todas' || produto.categoria === categoria;
    const texto = `${produto.nome} ${produto.descricao} ${produto.categoria}`.toLocaleLowerCase();
    return correspondeCategoria && (!busca || texto.includes(busca));
  });
}
