
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ProdutoCard({ produto }) {
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(produto.preco);

  const esgotado = produto.estoque === 0;

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

        <strong>{precoFormatado}</strong>

        <span className="estoque">
          {esgotado
            ? 'Produto esgotado'
            : `${produto.estoque} disponíveis`}
        </span>

        <div className="produto-acoes">
          <button
            className="botao botao-card"
            type="button"
            disabled
            title="Disponível na próxima etapa"
          >
            Adicionar ao carrinho
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
