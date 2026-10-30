import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { estoqueDisponivel } from '../utils/carrinho.js';

export default function SeletorQuantidade({ maximo, onChange, disabled = false }) {
  const disponivel = estoqueDisponivel(maximo); const limite = Math.max(1, disponivel); const [quantidade, setQuantidade] = useState(1);
  useEffect(() => { setQuantidade((atual) => Math.max(1, Math.min(atual, limite))); }, [limite]);
  function atualizar(novaQuantidade) { const segura = Math.max(1, Math.min(Math.trunc(Number(novaQuantidade)), limite)); setQuantidade(segura); onChange(segura); }
  return <div className="seletor-quantidade" aria-label="Quantidade"><button type="button" aria-label="Diminuir quantidade" onClick={() => atualizar(quantidade - 1)} disabled={disabled || disponivel < 1 || quantidade <= 1}>−</button><strong aria-live="polite">{String(quantidade).padStart(2, '0')}</strong><button type="button" aria-label="Aumentar quantidade" onClick={() => atualizar(quantidade + 1)} disabled={disabled || disponivel < 1 || quantidade >= limite}>+</button></div>;
}

SeletorQuantidade.propTypes = { maximo: PropTypes.number.isRequired, onChange: PropTypes.func.isRequired, disabled: PropTypes.bool };
