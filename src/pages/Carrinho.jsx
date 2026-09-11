import { Link } from 'react-router-dom';
import ItemCarrinho from '../components/ItemCarrinho.jsx';
import ResumoCompra from '../components/ResumoCompra.jsx';
import Etapas from '../components/Etapas.jsx';
import Icone from '../components/Icone.jsx';
export default function Carrinho({
  produtos
}) {
  return <><Etapas atual={0} /><div className="titulo-pagina"><span className="eyebrow">Uma nova luz para sua casa</span><h1>Seu carrinho<span>.</span></h1><p>Os detalhes que vão transformar o seu espaço.</p></div><div className="layout-compra"><section className="lista-produtos" aria-label="Produtos no carrinho"><div className="lista-cabecalho"><h2>Sua seleção</h2><span>03 modelos · 04 unidades</span></div>{produtos.map(produto => <ItemCarrinho key={produto.id} produto={produto} />)}<div className="bilhete"><span className="bilhete-marca">L</span><p><strong>Pequenos detalhes. Novas atmosferas.</strong><br />Uma seleção de luminárias para deixar cada canto com a sua luz.</p></div></section><ResumoCompra produtos={produtos}><Link className="botao" to="/pagamento">Finalizar compra <Icone nome="seta" /></Link></ResumoCompra></div></>;
}
