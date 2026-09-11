import { Link, Route, Routes } from 'react-router-dom';
import Carrinho from './pages/Carrinho.jsx';
import { produtos } from './data/produtos.js';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Carrinho produtos={produtos} />} />
      <Route path="/pagamento" element={
        <main>
          <h1>Pagamento em construção</h1>
          <Link to="/">Voltar ao carrinho</Link>
        </main>
      } />
    </Routes>
  );
}
