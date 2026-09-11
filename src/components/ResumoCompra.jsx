import { totalCompra, formatarMoeda } from '../utils/moeda.js';
import Icone from './Icone.jsx';
export default function ResumoCompra({
  produtos,
  children
}) {
  const total = totalCompra(produtos);
  const quantidade = produtos.reduce((soma, produto) => soma + produto.quantidade, 0);
  return <aside className="resumo" aria-label="Resumo da compra"><span className="eyebrow">Tudo pronto para iluminar</span><h2>Resumo do pedido</h2><dl><div><dt>Produtos ({quantidade} unidades)</dt><dd>{formatarMoeda(total)}</dd></div><div><dt>Entrega</dt><dd className="entrega">Sem custo nesta simulação</dd></div><div className="total"><dt>Total</dt><dd>{formatarMoeda(total)}</dd></div></dl><p className="pagamento-unico">Pagamento único no cartão</p>{children}<div className="nota-segura"><Icone nome="cadeado" tamanho={18} /><p>Compra demonstrativa.<br />Nenhum valor será cobrado.</p></div></aside>;
}
