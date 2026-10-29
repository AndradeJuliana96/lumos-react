
import test from "node:test";
import assert from "node:assert/strict";

import {
  carrinhoReducer,
  estadoInicialCarrinho,
  estoqueDisponivel,
  normalizarQuantidade,
} from "../src/utils/carrinho.js";

const produto = {
  id: "pendente-lua",
  nome: "Pendente Lua",
  preco: 199.9,
  estoque: 5,
  quantidade: 1,
};

// Teste 1 — Adicionar um produto
test("adiciona um produto ao carrinho vazio", () => {
  const resultado = carrinhoReducer(estadoInicialCarrinho, {
    type: "ADICIONAR",
    produto,
    quantidade: 2,
  });

  assert.equal(resultado.length, 1);
  assert.equal(resultado[0].quantidade, 2);
});

// Teste 2 — Respeitar o limite de estoque
test("não permite adicionar acima do estoque", () => {
  const inicial = carrinhoReducer([], {
    type: "ADICIONAR",
    produto,
    quantidade: 4,
  });

  const resultado = carrinhoReducer(inicial, {
    type: "ADICIONAR",
    produto,
    quantidade: 3,
  });

  assert.equal(resultado[0].quantidade, 5);
});

// Teste 3 — Alterar quantidade
test("altera a quantidade de um produto", () => {
  const inicial = [{ ...produto, quantidade: 2 }];

  const resultado = carrinhoReducer(inicial, {
    type: "ALTERAR_QUANTIDADE",
    id: produto.id,
    quantidade: 4,
  });

  assert.equal(resultado[0].quantidade, 4);
});

// Teste 4 — Remover produto
test("remove um produto do carrinho", () => {
  const inicial = [{ ...produto, quantidade: 2 }];

  const resultado = carrinhoReducer(inicial, {
    type: "REMOVER",
    id: produto.id,
  });

  assert.deepEqual(resultado, []);
});

// Teste 5 — Limpar carrinho
test("limpa todos os itens do carrinho", () => {
  const inicial = [{ ...produto, quantidade: 2 }];

  const resultado = carrinhoReducer(inicial, {
    type: "LIMPAR",
  });

  assert.deepEqual(resultado, []);
});

// Teste 6 — Estoque disponível
test("calcula o estoque restante corretamente", () => {
  assert.equal(estoqueDisponivel(produto, 3), 2);
  assert.equal(estoqueDisponivel(produto, 5), 0);
});

// Teste 7 — Quantidade inválida
test("rejeita quantidade inválida", () => {
  assert.equal(normalizarQuantidade("abc", 5), null);
  assert.equal(normalizarQuantidade("", 5), null);
});

// Teste 8 — Produto inválido
test("não adiciona produto com preço inválido", () => {
  const resultado = carrinhoReducer([], {
    type: "ADICIONAR",
    produto: { ...produto, preco: -10 },
    quantidade: 1,
  });

  assert.deepEqual(resultado, []);
});
