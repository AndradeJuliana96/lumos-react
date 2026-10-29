
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCarrinho } from "../context/CarrinhoContext.jsx";
import { estoqueDisponivel } from "../utils/carrinho.js";
import { emCentavos, formatarMoeda } from "../utils/moeda.js";
import SeletorQuantidade from "./SeletorQuantidade.jsx";

export default function ProdutoCard({ produto }) {
  const { adicionarItem, itens } = useCarrinho();
  const [quantidade, setQuantidade] = useState(1);

  const noCarrinho =
    itens.find((item) => item.id === produto.id)?.quantidade ?? 0;

  const restante = estoqueDisponivel(produto, noCarrinho);
  const estoqueInvalido = restante === null;
  const disponivel = restante ?? 0;
  const esgotado = restante === 0 && noCarrinho === 0;
  const limiteAtingido = restante === 0 && !esgotado;
  const bloqueado = estoqueInvalido || esgotado || limiteAtingido;

  return (
    <article className="produto-card">
      <Link
        to={`/produtos/${produto.id}`}
        className="produto-card-imagem"
        aria-label={`Ver detalhes de ${produto.nome}`}
      >
        <img
          src={produto.imagem}
          alt={produto.alt || produto.nome}
        />
      </Link>

      <div className="produto-card-conteudo">
        <span className="eyebrow">{produto.categoria}</span>

        <h2>
          <Link to={`/produtos/${produto.id}`}>
            {produto.nome}
          </Link>
        </h2>

        <p>{produto.descricao}</p>

        <strong>
          {formatarMoeda(emCentavos(produto.preco))}
        </strong>

        <span className="estoque">
          {estoqueInvalido
            ? "Estoque indisponível"
            : esgotado
              ? "Produto esgotado"
              : `${disponivel} disponíveis`}
        </span>

        <div className="produto-acoes">
          <SeletorQuantidade
            maximo={disponivel}
            onChange={setQuantidade}
            disabled={bloqueado}
          />

          <button
            className="botao botao-card"
            type="button"
            disabled={bloqueado}
            onClick={() => adicionarItem(produto, quantidade)}
          >
            {estoqueInvalido
              ? "Estoque indisponível"
              : esgotado
                ? "Sem estoque"
                : limiteAtingido
                  ? "Limite no carrinho"
                  : "Adicionar ao carrinho"}
          </button>
        </div>

        <Link
          className="link-detalhes"
          to={`/produtos/${produto.id}`}
        >
          Ver detalhes <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

ProdutoCard.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    nome: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired,
    alt: PropTypes.string,
    estoque: PropTypes.number.isRequired,
  }).isRequired,
};
