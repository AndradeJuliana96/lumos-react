
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { buscarProduto } from "../services/produtosApi.js";

export default function DetalheProduto() {
  const { id } = useParams();

  const [produto, setProduto] = useState(null);
  const [status, setStatus] = useState("carregando");

  useEffect(() => {
    const controller = new AbortController();

    buscarProduto(id, controller.signal)
      .then((dados) => {
        setProduto(dados);
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

        <Link
          className="botao detalhe-botao"
          to="/produtos"
        >
          Voltar ao catálogo
        </Link>
      </section>
    );
  }

  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(produto.preco);

  const esgotado = produto.estoque === 0;

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
          <span className="eyebrow">
            {produto.categoria}
          </span>

          <h1>
            {produto.nome}
            <span>.</span>
          </h1>

          <p>{produto.descricao}</p>

          <strong className="detalhe-preco">
            {precoFormatado}
          </strong>

          <span className="estoque detalhe-estoque">
            {esgotado
              ? "Produto esgotado"
              : `${produto.estoque} disponíveis`}
          </span>

          <div className="detalhe-acoes">
            <button
              className="botao detalhe-botao"
              type="button"
              disabled
              title="Disponível na próxima etapa"
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
