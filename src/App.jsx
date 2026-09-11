import { useEffect, useRef } from 'react';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { produtos } from './data/produtos.js';
import Carrinho from './pages/Carrinho.jsx';
import Pagamento from './pages/Pagamento.jsx';
import Sucesso from './pages/Sucesso.jsx';
import Falha from './pages/Falha.jsx';
import Resultado from './pages/Resultado.jsx';
import Icone from './components/Icone.jsx';
export default function App() {
  const {
    pathname
  } = useLocation();
  const mainRef = useRef(null);
  useEffect(() => {
    const titulos = {
      '/': 'Seu carrinho',
      '/pagamento': 'Pagamento',
      '/sucesso': 'Compra aprovada',
      '/falha': 'Compra não aprovada'
    };
    document.title = `Lumos | ${titulos[pathname] || 'Resultado da compra'}`;
    mainRef.current?.focus();
    window.scrollTo(0, 0);
  }, [pathname]);
  return <>

      <a className="pular" href="#conteudo">Pular para o conteúdo</a>

      <div className="faixa">Luz, forma e aconchego. <span>Encontre o seu equilíbrio.</span></div>

      <header className="cabecalho">

        <Link className="marca" to="/" aria-label="Lumos — voltar ao carrinho">

          <img src="/images/logo.png" alt="Lumos Luminárias & Iluminação" width="200" height="110" />

        </Link>

        <div className="cabecalho-descricao">LUMINÁRIAS & ILUMINAÇÃO</div>

        <Link className="sacola" to="/" aria-label="Carrinho com quatro unidades">

          <Icone nome="sacola" /><span>Seu carrinho</span><b>4</b>

        </Link>

      </header>

      <main id="conteudo" tabIndex={-1} ref={mainRef}>

        <Routes>

          <Route path="/" element={<Carrinho produtos={produtos} />} />

          <Route path="/pagamento" element={<Pagamento produtos={produtos} />} />

          <Route path="/sucesso" element={<Sucesso />} />

          <Route path="/falha" element={<Falha />} />

          <Route path="/resultado/:status" element={<Resultado />} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

      </main>

      <footer>

        <p><strong>Lumos</strong><span>Iluminar é transformar.</span></p>

        <span>Projeto demonstrativo · Pagamento fictício</span>

        <span>© {new Date().getFullYear()} Lumos</span>

      </footer>

    </>;
}
