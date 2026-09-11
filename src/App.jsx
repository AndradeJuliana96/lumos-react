import { Link, Route, Routes } from 'react-router-dom';

import Carrinho from './pages/Carrinho.jsx';
import Pagamento from './pages/Pagamento.jsx';
import { produtos } from './data/produtos.js';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Carrinho produtos={produtos} />}
      />

      <Route
        path="/pagamento"
        element={<Pagamento produtos={produtos} />}
      />

      <Route
        path="/sucesso"
        element={
          <main>
            <h1>Compra aprovada!</h1>
            <Link to="/">Voltar ao carrinho</Link>
          </main>
        }
      />

      <Route
        path="/falha"
        element={
          <main>
            <h1>tentativa de golpe</h1>
            <Link to="/pagamento">Tentar novamente</Link>
          </main>
        }
      />
    </Routes>
  );
}