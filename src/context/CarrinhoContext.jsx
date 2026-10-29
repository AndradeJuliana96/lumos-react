
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { totalCompra } from "../utils/moeda.js";
import {
  carrinhoReducer,
  estadoInicialCarrinho,
  normalizarItens,
} from "../utils/carrinho.js";

const CarrinhoContext = createContext(null);

const CHAVE_CARRINHO = "lumos-carrinho";

function carregarCarrinho() {
  try {
    const salvo = localStorage.getItem(CHAVE_CARRINHO);

    if (!salvo) {
      return estadoInicialCarrinho;
    }

    return normalizarItens(JSON.parse(salvo));
  } catch {
    return estadoInicialCarrinho;
  }
}

export function CarrinhoProvider({ children }) {
  const [itens, dispatch] = useReducer(
    carrinhoReducer,
    estadoInicialCarrinho,
    carregarCarrinho
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(itens)
      );
    } catch {
      // O carrinho continua funcionando na sessão
      // se o armazenamento não estiver disponível.
    }
  }, [itens]);

  const adicionarItem = (produto, quantidade = 1) => {
    dispatch({
      type: "ADICIONAR",
      produto,
      quantidade,
    });
  };

  const alterarQuantidade = (id, quantidade) => {
    dispatch({
      type: "ALTERAR_QUANTIDADE",
      id,
      quantidade,
    });
  };

  const removerItem = (id) => {
    dispatch({
      type: "REMOVER",
      id,
    });
  };

  const limparCarrinho = () => {
    dispatch({ type: "LIMPAR" });
  };

  const quantidadeTotal = useMemo(
    () => itens.reduce(
      (total, item) => total + item.quantidade,
      0
    ),
    [itens]
  );

  const valorTotal = useMemo(
    () => totalCompra(itens),
    [itens]
  );

  const valor = useMemo(
    () => ({
      itens,
      adicionarItem,
      alterarQuantidade,
      removerItem,
      limparCarrinho,
      quantidadeTotal,
      valorTotal,
    }),
    [itens, quantidadeTotal, valorTotal]
  );

  return (
    <CarrinhoContext.Provider value={valor}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);

  if (!contexto) {
    throw new Error(
      "useCarrinho deve ser usado dentro de CarrinhoProvider"
    );
  }

  return contexto;
}
