import { useRef, useState } from 'react';
import { simularPagamento } from '../utils/pagamento.js';
export default function usePagamento() {
  const [processando, setProcessando] = useState(false);
  // A trava imediata cobre dois eventos antes da próxima renderização do React.
  const emAndamento = useRef(false);
  async function processar(numero) {
    if (emAndamento.current) return null;
    emAndamento.current = true;
    setProcessando(true);
    try {
      return await simularPagamento(numero);
    } finally {
      emAndamento.current = false;
      setProcessando(false);
    }
  }
  return {
    processando,
    processar
  };
}
