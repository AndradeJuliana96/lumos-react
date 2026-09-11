import { formatarMoeda, emCentavos, subtotal } from '../utils/moeda.js';
export default function ItemCarrinho({
  produto,
  compacto = false
}) {
  return <article className={`item-produto ${compacto ? 'compacto' : ''}`}>

    <img className="foto-produto" src={produto.imagem} alt={produto.alt} width="160" height="160" />

    <div className="produto-texto"><span className="eyebrow">{produto.categoria}</span><h3>{produto.nome}</h3>{!compacto && <p>{produto.descricao}</p>}<span className="preco-unitario">{formatarMoeda(emCentavos(produto.preco))} / unidade</span></div>

    <div className="quantidade"><span>Qtd.</span><strong>{String(produto.quantidade).padStart(2, '0')}</strong></div>

    <div className="subtotal"><span>Subtotal</span><strong>{formatarMoeda(subtotal(produto))}</strong></div>

  </article>;
}
