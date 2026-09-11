import { Link } from 'react-router-dom';
import Icone from './Icone.jsx';
import Etapas from './Etapas.jsx';
export default function ResultadoCompra({
  sucesso
}) {
  return <><Etapas atual={2} /><section className={`resultado ${sucesso ? 'aprovado' : 'recusado'}`}><div className="icone-resultado"><Icone nome={sucesso ? 'check' : 'alerta'} tamanho={42} /></div><span className="eyebrow">{sucesso ? 'Tudo certo por aqui' : 'Compra não aprovada'}</span><h1>{sucesso ? 'Sua casa merece essa luz.' : 'Não foi dessa vez.'}</h1>{sucesso ? <p className="mensagem-resultado">Compra aprovada!</p> : <p className="mensagem-resultado" role="alert">tentativa de golpe</p>}<p>{sucesso ? 'Sua simulação foi concluída com sucesso. Obrigado por escolher a Lumos.' : 'O cartão informado possui todos os dígitos iguais. Volte ao pagamento e tente com outro número fictício.'}</p><Link className="botao" to={sucesso ? '/' : '/pagamento'}>{sucesso ? 'Voltar ao carrinho' : 'Tentar novamente'}<Icone nome="seta" /></Link>{!sucesso && <Link className="link-secundario" to="/">Voltar ao carrinho</Link>}<small>Simulação concluída. Nenhum valor foi cobrado.</small></section></>;
}
