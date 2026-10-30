
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { buscarPedido } from "../utils/pedidos.js";
import { formatarMoeda } from "../utils/moeda.js";

const etapas = [
  "Pedido confirmado",
  "Em preparação",
  "Enviado",
  "Entregue",
];

export default function Pedidos() {
  const location = useLocation();
  const pedidoInicial = location.state?.pedidoId || "";

  const [id, setId] = useState(pedidoInicial);
  const [pedido, setPedido] = useState(() =>
    pedidoInicial ? buscarPedido(pedidoInicial) : null
  );
  const [consultado, setConsultado] = useState(Boolean(pedidoInicial));

  function consultar(event) {
    event.preventDefault();

    setPedido(buscarPedido(id));
    setConsultado(true);
  }

  return (
    <section className="pedidos-pagina">
      <div className="titulo-pagina">
        <span className="eyebrow">Acompanhar pedido</span>

        <h1>
          Onde está sua luz<span>?</span>
        </h1>

        <p>
          Consulte uma simulação salva neste navegador usando
          somente o número do pedido.
        </p>
      </div>

      <form className="pedido-consulta" onSubmit={consultar}>
        <div className="campo">
          <label htmlFor="pedido-id">Número do pedido</label>

          <input
            id="pedido-id"
            value={id}
            onChange={(event) => setId(event.target.value)}
            placeholder="LUM-..."
            required
          />
        </div>

        <button className="botao" type="submit">
          Consultar pedido
        </button>
      </form>

      {consultado && !pedido && (
        <p className="erro" role="alert">
          Não encontramos um pedido com esse número.
          Confira o ID e tente novamente.
        </p>
      )}

      {pedido && (
        <article className="pedido-resultado">
          <div className="pedido-cabecalho">
            <div>
              <span className="eyebrow">Simulação local</span>
              <h2>{pedido.id}</h2>
            </div>

            <strong>{formatarMoeda(pedido.valor)}</strong>
          </div>

          <p>
            Data do pedido:{" "}
            {new Date(pedido.data).toLocaleDateString("pt-BR")}
          </p>

          <p className="pedido-status">
            Status demonstrativo: <strong>Pedido confirmado</strong>
          </p>

          <div className="pedido-itens">
            <h3>Produtos</h3>

            <ul>
              {pedido.itens.map((item) => (
                <li key={item.id}>
                  {item.nome}

                  <strong>
                    {item.quantidade}{" "}
                    {item.quantidade === 1
                      ? "unidade"
                      : "unidades"}
                  </strong>
                </li>
              ))}
            </ul>

            <p className="pedido-total">
              Total: <strong>{formatarMoeda(pedido.valor)}</strong>
            </p>
          </div>

          <ol className="linha-tempo">
            {etapas.map((etapa, indice) => (
              <li
                key={etapa}
                className={indice === 0 ? "etapa-atual" : ""}
              >
                <span>{indice + 1}</span>
                {etapa}
              </li>
            ))}
          </ol>

          <small>
            Todos os status são demonstrativos. O histórico
            fica limitado a este navegador/dispositivo.
          </small>
        </article>
      )}
    </section>
  );
}
