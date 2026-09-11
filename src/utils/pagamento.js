import { z } from 'zod';

// Só espaços e hífens são ignorados: letras e outros símbolos continuam inválidos.
export const normalizarCartao = numero => numero.replace(/[\s-]/g, '');
export function digitosTodosIguais(numero) {
  const normalizado = normalizarCartao(numero);
  return /^(\d)\1{15}$/.test(normalizado);
}
export const pagamentoSchema = z.object({
  titular: z.string().trim().min(1, 'Informe o nome do titular.'),
  numero: z.string().transform(normalizarCartao).pipe(z.string().regex(/^\d{16}$/, 'Informe os 16 dígitos do cartão.')),
  validade: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Use MM/AA, com mês de 01 a 12.'),
  cvv: z.string().regex(/^\d{3}$/, 'Informe os 3 dígitos do CVV.')
});
export async function simularPagamento(numero) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return digitosTodosIguais(numero) ? 'falha' : 'sucesso';
}
