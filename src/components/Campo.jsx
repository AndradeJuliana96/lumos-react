export default function Campo({
  label,
  nome,
  registro,
  erro,
  ajuda,
  ...props
}) {
  return <div className="campo"><label htmlFor={nome}>{label}</label><input id={nome} {...registro} {...props} aria-invalid={Boolean(erro)} aria-describedby={erro ? `${nome}-erro` : ajuda ? `${nome}-ajuda` : undefined} />{erro ? <p className="erro" id={`${nome}-erro`} role="alert">{erro.message}</p> : ajuda ? <p className="ajuda" id={`${nome}-ajuda`}>{ajuda}</p> : null}</div>;
}
