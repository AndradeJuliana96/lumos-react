
import { Link } from "react-router-dom";

export default function Sobre() {
  return (
    <section className="pagina-institucional">
      <span className="eyebrow">Sobre a Lumos</span>

      <h1>Iluminar é transformar.</h1>

      <p className="institucional-lead">
        A Lumos é uma loja virtual fictícia criada para
        celebrar o papel da luz na construção de ambientes
        acolhedores.
      </p>

      <div className="institucional-grid">
        <article>
          <h2>Nossa proposta</h2>

          <p>
            Selecionar luminárias que unam beleza, conforto
            e praticidade, ajudando cada pessoa a encontrar
            uma luz que combine com sua rotina.
          </p>
        </article>

        <article>
          <h2>Nossos valores</h2>

          <p>
            Curadoria cuidadosa, simplicidade, acessibilidade
            e respeito pelos pequenos detalhes que tornam
            uma casa especial.
          </p>
        </article>
      </div>

      <Link className="botao institucional-botao" to="/produtos">
        Explorar produtos
      </Link>
    </section>
  );
}
