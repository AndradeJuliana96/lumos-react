import { Navigate, useParams } from 'react-router-dom';
import Sucesso from './Sucesso.jsx';
import Falha from './Falha.jsx';
export default function Resultado() {
  const {
    status
  } = useParams();
  return status === 'sucesso' ? <Sucesso /> : status === 'falha' ? <Falha /> : <Navigate to="/" replace />;
}
