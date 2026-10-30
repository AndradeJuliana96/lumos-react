
import { emCentavos, formatarMoeda, subtotal } from "../utils/moeda.js";
import { useCarrinho } from "../context/CarrinhoContext.jsx";

export default function ItemCarrinho({ produto, compacto = false }) {
  const { alterarQuantidade, removerItem } = useCarrinho();

  const diminuirQuantidade = () => {
    if (produto.quantidade > 1) {
      alterarQuantidade(produto.id, produto.quantidade - 1);
    }
  };

  const aumentarQuantidade = () => {
    if (produto.quantidade < produto.estoque) {
      alterarQuantidade(produto.id, produto.quantidade + 1);
    }
  };

  return (
    <article className={`item-produto ${compacto ? "compacto" : ""}`}>
      <img
        className="foto-produto"
        src={produto.imagem}
        alt={produto.alt || produto.nome}
        width="160"
        height="160"
      />

      <div className="produto-texto">
        <span className="eyebrow">{produto.categoria}</span>

        <h3>{produto.nome}</h3>

        {!compacto && <p>{produto.descricao}</p>}

        <span className="preco-unitario">
          {formatarMoeda(emCentavos(produto.preco))} / unidade
        </span>
      </div>

      <div className="quantidade">
        <span>Qtd.</span>

        {compacto ? (
          <strong>
            {String(produto.quantidade).padStart(2, "0")}
          </strong>
        ) : (
          <div className="controle-quantidade">
            <button
              type="button"
              onClick={diminuirQuantidade}
              disabled={produto.quantidade <= 1}
              aria-label={`Diminuir quantidade de ${produto.nome}`}
            >
              −
            </button>

            <strong>{produto.quantidade}</strong>

            <button
              type="button"
              onClick={aumentarQuantidade}
              disabled={produto.quantidade >= produto.estoque}
              aria-label={`Aumentar quantidade de ${produto.nome}`}
            >
              +
            </button>
          </div>
        )}

        {!compacto && (
          <button
            type="button"
            className="remover-item"
            onClick={() => removerItem(produto.id)}
          >
            Remover
          </button>
        )}
      </div>

      <div className="subtotal">
        <span>Subtotal</span>

        <strong>{formatarMoeda(subtotal(produto))}</strong>
      </div>
    </article>
  );
}
