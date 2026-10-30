import { useEffect, useRef } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Sobre from "./pages/Sobre.jsx";
import Carrinho from "./pages/Carrinho.jsx";
import Catalogo from "./pages/Catalogo.jsx";
import DetalheProduto from "./pages/DetalheProduto.jsx";
import Pagamento from "./pages/Pagamento.jsx";
import Sucesso from "./pages/Sucesso.jsx";
import Falha from "./pages/Falha.jsx";
import Resultado from "./pages/Resultado.jsx";

import Icone from "./components/Icone.jsx";
import { useCarrinho } from "./context/CarrinhoContext.jsx";

function PagamentoProtegido() {
  const { itens } = useCarrinho();
  const autorizado = useRef(itens.length > 0);

  if (!autorizado.current) {
    return <Navigate to="/carrinho" replace />;
  }

  return <Pagamento />;
}

export default function App() {
  const { quantidadeTotal } = useCarrinho();
  const { pathname } = useLocation();
  const mainRef = useRef(null);

  useEffect(() => {
    const titulos = {
      "/": "Início",
      "/sobre": "Sobre a Lumos",
      "/produtos": "Produtos",
      "/carrinho": "Seu carrinho",
      "/pagamento": "Pagamento",
      "/sucesso": "Compra aprovada",
      "/falha": "Compra não aprovada",
    };

    document.title = `Lumos | ${
      titulos[pathname] ||
      (pathname.startsWith("/produtos/") ? "Detalhes do produto" : "Página")
    }`;

    mainRef.current?.focus();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>

      <div className="faixa">
        Luz, forma e aconchego. <span>Encontre o seu equilíbrio.</span>
      </div>

      <header className="cabecalho">
        <Link className="marca" to="/" aria-label="Lumos — voltar ao início">
          <img
            src="/images/logo.png"
            alt="Lumos Luminárias & Iluminação"
            width="200"
            height="110"
          />
        </Link>

        <div className="cabecalho-descricao">LUMINÁRIAS & ILUMINAÇÃO</div>

        <nav className="navegacao" aria-label="Navegação principal">
          <Link to="/">Início</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/sobre">Sobre</Link>
        </nav>

        <Link
          className="sacola"
          to="/carrinho"
          aria-label={`Carrinho com ${quantidadeTotal} ${
            quantidadeTotal === 1 ? "unidade" : "unidades"
          }`}
        >
          <Icone nome="sacola" />
          <span>Seu carrinho</span>
          <b>{quantidadeTotal}</b>
        </Link>
      </header>

      <main id="conteudo" tabIndex={-1} ref={mainRef}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/sobre" element={<Sobre />} />

          <Route path="/produtos" element={<Catalogo />} />

          <Route path="/produtos/:id" element={<DetalheProduto />} />

          <Route path="/carrinho" element={<Carrinho />} />

          <Route path="/pagamento" element={<PagamentoProtegido />} />

          <Route path="/sucesso" element={<Sucesso />} />

          <Route path="/falha" element={<Falha />} />

          <Route path="/resultado/:status" element={<Resultado />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer>
        <p>
          <strong>Lumos</strong>
          <span>Iluminar é transformar.</span>
        </p>

        <span>Projeto demonstrativo · Pagamento fictício</span>

        <span>© {new Date().getFullYear()} Lumos</span>
      </footer>
    </>
  );
}
