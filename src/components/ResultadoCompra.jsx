
import { Link, useLocation } from "react-router-dom";
import Icone from "./Icone.jsx";
import Etapas from "./Etapas.jsx";

export default function ResultadoCompra({ sucesso }) {
  const location = useLocation();
  const pedidoId = sucesso ? location.state?.pedidoId : null;

  return (
    <>
      <Etapas atual={2} />

      <section className={`resultado ${sucesso ? "aprovado" : "recusado"}`}>
        <div className="icone-resultado">
          <Icone
            nome={sucesso ? "check" : "alerta"}
            tamanho={42}
          />
        </div>

        <span className="eyebrow">
          {sucesso ? "Tudo certo por aqui" : "Compra não aprovada"}
        </span>

        <h1>
          {sucesso ? "Sua casa merece essa luz." : "Não foi dessa vez."}
        </h1>

        {sucesso ? (
          <p className="mensagem-resultado">Compra aprovada!</p>
        ) : (
          <p className="mensagem-resultado" role="alert">
            tentativa de golpe
          </p>
        )}

        <p>
          {sucesso
            ? "Sua simulação foi concluída com sucesso. Obrigado por escolher a Lumos."
            : "O cartão informado possui todos os dígitos iguais. Volte ao pagamento e tente com outro número fictício."}
        </p>

        {sucesso && pedidoId && (
          <div className="pedido-confirmacao">
            <span className="eyebrow">Número do pedido</span>

            <strong className="pedido-confirmacao-id">
              {pedidoId}
            </strong>

            <p>
              Guarde este número para consultar sua compra
              simulada neste navegador.
            </p>
          </div>
        )}

        {sucesso ? (
          <>
            {pedidoId && (
              <Link
                className="botao"
                to="/pedidos"
                state={{ pedidoId }}
              >
                Acompanhar pedido
                <Icone nome="seta" />
              </Link>
            )}

            <Link className="link-secundario" to="/">
              Voltar ao início
            </Link>
          </>
        ) : (
          <>
            <Link className="botao" to="/pagamento">
              Tentar novamente
              <Icone nome="seta" />
            </Link>

            <Link className="link-secundario" to="/carrinho">
              Voltar ao carrinho
            </Link>
          </>
        )}

        <small>
          Simulação concluída. Nenhum valor foi cobrado.
        </small>
      </section>
    </>
  );
}
