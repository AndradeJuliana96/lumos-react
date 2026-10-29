import { useEffect, useMemo, useState } from "react";
import ProdutoCard from "../components/ProdutoCard.jsx";
import { filtrarProdutos } from "../utils/buscaProdutos.js";
import { listarProdutos } from "../services/produtosApi.js";

export default function Catalogo() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [status, setStatus] = useState("carregando");
  useEffect(() => {
    const controller = new AbortController();
    listarProdutos(controller.signal)
      .then((dados) => {
        setProdutos(dados);
        setStatus("pronto");
      })
      .catch((erro) => {
        if (erro.name !== "AbortError") setStatus("erro");
      });
    return () => controller.abort();
  }, []);
  const categorias = useMemo(
    () => ["Todas", ...new Set(produtos.map((produto) => produto.categoria))],
    [produtos],
  );
  const filtrados = useMemo(
    () => filtrarProdutos(produtos, busca, categoria),
    [produtos, busca, categoria],
  );
  const limparBusca = () => {
    setBusca("");
    setCategoria("Todas");
  };
  return (
    <>
      <section className="catalogo-hero">
        <span className="eyebrow">A coleção Lumos</span>
        <h1>
          Encontre a luz <span>do seu espaço.</span>
        </h1>
        <p>
          Peças pensadas para transformar a atmosfera da sua casa com beleza e
          aconchego.
        </p>
      </section>
      <section className="catalogo-filtros" aria-label="Filtros do catálogo">
        <label htmlFor="busca-produtos">Buscar produtos</label>
        <input
          id="busca-produtos"
          type="search"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          placeholder="Nome ou ambiente"
        />
        <div className="categorias" role="group" aria-label="Categorias">
          {categorias.map((item) => (
            <button
              key={item}
              type="button"
              className={categoria === item ? "categoria-ativa" : ""}
              onClick={() => setCategoria(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      {status === "carregando" && (
        <p className="estado-catalogo">Carregando nossa seleção...</p>
      )}
      {status === "erro" && (
        <p className="estado-catalogo" role="alert">
          Não foi possível carregar o catálogo. Inicie o servidor com{" "}
          <code>npm run api</code>.
        </p>
      )}
      {status === "pronto" && (
        <section className="grade-produtos" aria-live="polite">
          <div className="grade-cabecalho">
            <h2>Peças para iluminar</h2>
            <span>
              {filtrados.length}{" "}
              {filtrados.length === 1 ? "produto" : "produtos"}
            </span>
          </div>
          {produtos.length === 0 ? (
            <p className="estado-catalogo">
              Nenhum produto disponível no catálogo.
            </p>
          ) : filtrados.length ? (
            <div className="grade-cards">
              {filtrados.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>
          ) : (
            <div className="estado-catalogo">
              <p>Nenhum produto encontrado para essa busca.</p>
              <button
                type="button"
                className="botao limpar-busca"
                onClick={limparBusca}
              >
                Limpar busca
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}
