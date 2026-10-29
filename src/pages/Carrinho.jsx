
import { Link } from "react-router-dom";
import ItemCarrinho from "../components/ItemCarrinho.jsx";
import ResumoCompra from "../components/ResumoCompra.jsx";
import Etapas from "../components/Etapas.jsx";
import Icone from "../components/Icone.jsx";
import { useCarrinho } from "../context/CarrinhoContext.jsx";

export default function Carrinho() {
  const { itens, quantidadeTotal } = useCarrinho();

  const quantidadeModelos = itens.length;

  return (
    <>
      <Etapas atual={0} />

      <div className="titulo-pagina">
        <span className="eyebrow">
          Uma nova luz para sua casa
        </span>

        <h1>
          Seu carrinho<span>.</span>
        </h1>

        <p>Os detalhes que vão transformar o seu espaço.</p>
      </div>

      {itens.length === 0 ? (
        <section className="carrinho-vazio">
          <h2>Seu carrinho está vazio.</h2>

          <p>
            Explore nossa coleção e encontre a iluminação
            ideal para o seu espaço.
          </p>

          <Link
            className="botao carrinho-vazio-botao"
            to="/produtos"
          >
            Explorar produtos
          </Link>
        </section>
      ) : (
        <div className="layout-compra">
          <section
            className="lista-produtos"
            aria-label="Produtos no carrinho"
          >
            <Link className="continuar-comprando" to="/produtos">
              ← Continuar comprando
            </Link>

            <div className="lista-cabecalho">
              <h2>Sua seleção</h2>

              <span>
                {quantidadeModelos}{" "}
                {quantidadeModelos === 1 ? "modelo" : "modelos"}
                {" · "}
                {quantidadeTotal}{" "}
                {quantidadeTotal === 1 ? "unidade" : "unidades"}
              </span>
            </div>

            {itens.map((produto) => (
              <ItemCarrinho
                key={produto.id}
                produto={produto}
              />
            ))}

            <div className="bilhete">
              <span className="bilhete-marca">L</span>

              <p>
                <strong>
                  Pequenos detalhes. Novas atmosferas.
                </strong>
                <br />
                Uma seleção de luminárias para deixar cada
                canto com a sua luz.
              </p>
            </div>
          </section>

          <ResumoCompra produtos={itens}>
            <Link className="botao" to="/pagamento">
              Finalizar compra
              <Icone nome="seta" />
            </Link>
          </ResumoCompra>
        </div>
      )}
    </>
  );
}
