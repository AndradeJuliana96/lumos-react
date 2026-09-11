export default function Etapas({
  atual
}) {
  return <ol className="etapas" aria-label="Etapas da compra">{['Carrinho', 'Pagamento', 'Confirmação'].map((etapa, indice) => <li key={etapa} className={indice <= atual ? 'ativa' : ''} aria-current={indice === atual ? 'step' : undefined}><span>{indice < atual ? '✓' : `0${indice + 1}`}</span>{etapa}</li>)}</ol>;
}
