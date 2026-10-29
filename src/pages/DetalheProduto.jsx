
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { emCentavos, formatarMoeda } from "../utils/moeda.js";
import { useCarrinho } from "../context/CarrinhoContext.jsx";
import { estoqueDisponivel } from "../utils/carrinho.js";
import { buscarProduto } from "../services/produtosApi.js";
import SeletorQuantidade from "../components/SeletorQuantidade.jsx";

export default function DetalheProduto() {
  const { id } = useParams();
  const { adicionarItem, itens } = useCarrinho();

  const [produto, setProduto] = useState(null);
  const [status, setStatus] = useState("carregando");
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    const controller = new AbortController();

    setStatus("carregando");

    buscarProduto(id, controller.signal)
      .then((dados) => {
        setProduto(dados);
        setQuantidade(1);
        setStatus("pronto");
      })
      .catch((erro) => {
        if (erro.name !== "AbortError") {
          setStatus("erro");
        }
      });

    return () => controller.abort();
  }, [id]);

  if (status === "carregando") {
    return (
      <p className="estado-catalogo">
        Carregando produto...
      </p>
    );
  }

  if (status === "erro" || !produto) {
    return (
      <section className="estado-catalogo">
        <h1>Produto não encontrado.</h1>
        <Link className="botao detalhe-botao" to="/produtos">
          Voltar ao catálogo
        </Link>
      </section>
    );
  }

  const noCarrinho =
    itens.find((item) => item.id === produto.id)?.quantidade ?? 0;

  const restante = estoqueDisponivel(produto, noCarrinho);
  const estoqueInvalido = restante === null;
  const disponivel = restante ?? 0;
  const esgotado = restante === 0 && noCarrinho === 0;
  const limiteAtingido = restante === 0 && !esgotado;
  const bloqueado = estoqueInvalido || esgotado || limiteAtingido;

  return (
    <section className="detalhe-produto">
      <Link className="voltar" to="/produtos">
        ← Voltar ao catálogo
      </Link>

      <div className="detalhe-grid">
        <div className="detalhe-imagem">
          <img
            src={produto.imagem}
            alt={produto.alt || produto.nome}
          />
        </div>

        <div className="detalhe-info">
          <span className="eyebrow">{produto.categoria}</span>

          <h1>
            {produto.nome}
            <span>.</span>
          </h1>

          <p>{produto.descricao}</p>

          <strong className="detalhe-preco">
            {formatarMoeda(emCentavos(produto.preco))}
          </strong>

          <span className="estoque detalhe-estoque">
            {estoqueInvalido
              ? "Estoque indisponível"
              : esgotado
                ? "Produto esgotado"
                : `${disponivel} disponíveis`}
          </span>

          <div className="detalhe-acoes">
            <SeletorQuantidade
              maximo={disponivel}
              onChange={setQuantidade}
              disabled={bloqueado}
            />

            <button
              className="botao detalhe-botao"
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
        </div>
      </div>
    </section>
  );
}
