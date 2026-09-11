import test from 'node:test';
import assert from 'node:assert/strict';
import {
  pagamentoSchema,
  normalizarCartao,
  digitosTodosIguais,
  simularPagamento
} from '../src/utils/pagamento.js';
import { produtos } from '../src/data/produtos.js';
import { totalCompra, subtotal, formatarMoeda } from '../src/utils/moeda.js';

const valido = {
  titular: 'Pessoa de Teste',
  numero: '1234 5678 9012 3456',
  validade: '12/30',
  cvv: '123'
};

test('calcula os subtotais e o total em centavos sem erro decimal', () => {
  assert.deepEqual(produtos.map(subtotal), [28990, 35980, 45990]);
  assert.equal(totalCompra(produtos), 110960);
  assert.equal(formatarMoeda(110960).replace(/\s/g, ' '), 'R$ 1.109,60');
});

test('aceita os dados válidos e normaliza espaços e hífens', () => {
  const dados = pagamentoSchema.parse({
    ...valido,
    numero: '1234-5678 9012-3456'
  });

  assert.equal(dados.numero, '1234567890123456');
  assert.equal(
    normalizarCartao('1111-1111 1111-1111'),
    '1111111111111111'
  );
});

test('titular em branco é rejeitado e espaços nas pontas são removidos', () => {
  assert.equal(
    pagamentoSchema.safeParse({
      ...valido,
      titular: '   '
    }).success,
    false
  );

  assert.equal(
    pagamentoSchema.parse({
      ...valido,
      titular: '  A  '
    }).titular,
    'A'
  );
});

test('rejeita números incompletos, longos, letras e outros símbolos', () => {
  for (const numero of [
    '',
    '123456789012345',
    '12345678901234567',
    '123456789012345x',
    '1234.5678.9012.3456'
  ]) {
    assert.equal(
      pagamentoSchema.safeParse({
        ...valido,
        numero
      }).success,
      false,
      numero
    );
  }
});

test('valida MM/AA sem impor vencimento ou Luhn', () => {
  for (const validade of [
    '00/30',
    '13/30',
    '1/30',
    '12/2030',
    'ab/cd',
    ''
  ]) {
    assert.equal(
      pagamentoSchema.safeParse({
        ...valido,
        validade
      }).success,
      false,
      validade
    );
  }

  for (const validade of ['01/00', '12/99']) {
    assert.equal(
      pagamentoSchema.safeParse({
        ...valido,
        validade
      }).success,
      true
    );
  }
});

test('CVV exige exatamente três dígitos e aceita zeros', () => {
  for (const cvv of ['', '12', '1234', 'a12', ' 12']) {
    assert.equal(
      pagamentoSchema.safeParse({
        ...valido,
        cvv
      }).success,
      false
    );
  }

  assert.equal(
    pagamentoSchema.safeParse({
      ...valido,
      cvv: '000'
    }).success,
    true
  );
});

test('todos os dez dígitos repetidos passam no formato e são recusados pela regra', () => {
  for (let digito = 0; digito <= 9; digito++) {
    const numero = String(digito).repeat(16);

    assert.equal(
      pagamentoSchema.safeParse({
        ...valido,
        numero
      }).success,
      true
    );

    assert.equal(digitosTodosIguais(numero), true);
  }

  assert.equal(
    digitosTodosIguais('1111-1111 1111-1111'),
    true
  );

  assert.equal(
    digitosTodosIguais('1111111111111112'),
    false
  );
});

test('simulação assíncrona aprova o cartão comum e recusa o repetido', async () => {
  const inicio = Date.now();

  const resultados = await Promise.all([
    simularPagamento(valido.numero),
    simularPagamento('0000-0000-0000-0000')
  ]);

  assert.deepEqual(resultados, ['sucesso', 'falha']);
  assert.ok(Date.now() - inicio >= 1400);
});