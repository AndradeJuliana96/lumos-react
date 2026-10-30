import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImagem from "../assets/home-hero.png";
import ProdutoCard from "../components/ProdutoCard.jsx";
import { listarProdutos } from "../services/produtosApi.js";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [status, setStatus] = useState("carregando");
  useEffect(() => {
    const controller = new AbortController();
    listarProdutos(controller.signal)
      .then((dados) => {
        setProdutos(dados.slice(0, 4));
        setStatus("pronto");
      })
      .catch((erro) => {
        if (erro.name !== "AbortError") setStatus("erro");
      });
    return () => controller.abort();
  }, []);
  return (
    <>
      <section
        className="home-banner"
        style={{ "--home-hero": `url(${heroImagem})` }}
      >
        <div className="home-banner-conteudo">
          <span className="eyebrow">Luz, forma e aconchego</span>
          <h1>
            Iluminação que transforma <span>ambientes.</span>
          </h1>
          <p>
            Peças que unem aconchego, elegância e personalidade para a sua casa.
          </p>
          <Link className="botao home-banner-botao" to="/produtos">
            Conhecer produtos
          </Link>
        </div>
      </section>
      <section className="home-apresentacao">
        <span className="eyebrow">A essência Lumos</span>
        <h2>Iluminação para os momentos que importam.</h2>
        <p>
          Peças atemporais, materiais honestos e uma curadoria feita para deixar
          sua casa mais sua. Explore ideias para iluminar cada canto com
          intenção.
        </p>
        <Link className="link-detalhes" to="/produtos">
  Explore nossa coleção <span aria-hidden="true">→</span>
</Link>
      </section>
      <section className="home-destaques">
        <div className="grade-cabecalho">
          <div>
            <span className="eyebrow">Escolhas da casa</span>
            <h2>Produtos em destaque</h2>
          </div>
          <Link className="link-detalhes" to="/produtos">
            Ver catálogo <span aria-hidden="true">→</span>
          </Link>
        </div>
        {status === "carregando" && (
          <p className="estado-catalogo">Carregando destaques...</p>
        )}
        {status === "erro" && (
          <p className="estado-catalogo" role="alert">
            Não foi possível carregar os destaques.
          </p>
        )}
        {status === "pronto" && (
          <div className="grade-cards">
            {produtos.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
