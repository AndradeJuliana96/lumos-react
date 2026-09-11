# Lumos — Luminárias & Iluminação

Checkout demonstrativo desenvolvido em React para uma loja fictícia de luminárias.

A aplicação apresenta um carrinho fixo com três produtos, permite o preenchimento de dados fictícios de pagamento e simula de forma assíncrona o resultado da compra.

## Autor e links

- Estudante: Juliana Andrade
- Repositório: https://github.com/AndradeJuliana96/lumos-react
- Trello público: https://trello.com/b/owk3Y8DA/lumos-react
- Vídeo de apresentação: será adicionado após a gravação

## Tecnologias utilizadas

- React
- JavaScript
- JSX
- CSS
- Vite
- React Router
- React Hook Form
- Zod
- Git e GitHub

Também foram utilizados conceitos como:

- componentes funcionais;
- props;
- `map` com `key` estável;
- `reduce`;
- `useState`;
- custom hook;
- `useRef`;
- `useEffect`;
- Promises;
- `async/await`.

O projeto não utiliza Context API, back-end, gateway de pagamento ou persistência de dados do cartão.

## Como executar

Instale as dependências:

```bash
npm install
```

Execute o projeto em desenvolvimento:

```bash
npm run dev
```

Abra no navegador a URL informada pelo Vite.

Para executar os testes automatizados:

```bash
npm test
```

Para gerar a versão de produção:

```bash
npm run build
```

## Estrutura principal

```text
src/
├── assets/
│   └── styles/
│       └── index.css
├── components/
├── data/
│   └── produtos.js
├── hooks/
│   └── usePagamento.js
├── pages/
│   ├── Carrinho.jsx
│   ├── Pagamento.jsx
│   ├── Resultado.jsx
│   ├── Sucesso.jsx
│   └── Falha.jsx
├── utils/
├── App.jsx
└── main.jsx

public/
└── images/

tests/
└── pagamento.test.js
```

## Carrinho

O carrinho é representado por um array local com três produtos.

Cada produto possui:

- identificador;
- nome;
- preço unitário;
- quantidade.

Os produtos e quantidades são fixos, conforme o escopo do projeto.

A lista é renderizada utilizando `map` e `key` estável. Os subtotais e o total da compra são calculados a partir dos dados dos produtos.

Os valores monetários são calculados em centavos para evitar problemas com números decimais.

Total da compra utilizado na aplicação:

**R$ 1.109,60**

## Fluxo da aplicação

O fluxo principal utiliza as seguintes rotas:

```text
/ → /pagamento → /sucesso
               ↘ /falha
```

- `/` — exibe o carrinho e o resumo da compra;
- `/pagamento` — apresenta o formulário de pagamento;
- `/sucesso` — exibe a confirmação da compra aprovada;
- `/falha` — apresenta a mensagem de falha da simulação.

## Validação do pagamento

O formulário foi desenvolvido com React Hook Form e Zod.

São validados:

- titular obrigatório;
- cartão com 16 dígitos;
- espaços e hífens no cartão são desconsiderados;
- validade no formato `MM/AA`;
- mês entre `01` e `12`;
- CVV com exatamente três dígitos.

Não são realizadas validações de:

- bandeira do cartão;
- algoritmo de Luhn;
- vencimento real do cartão.

## Regra da simulação

Depois da validação do formulário, o número do cartão é normalizado.

Quando todos os 16 dígitos são iguais, a compra é recusada.

Exemplo:

```text
1111-1111-1111-1111
```

Resultado:

```text
tentativa de golpe
```

Para qualquer outro número que esteja no formato válido, a compra simulada é aprovada.

Exemplo utilizado:

```text
1234 5678 9012 3456
```

A operação é assíncrona e aguarda aproximadamente 1,5 segundo. Durante esse período é exibida a mensagem:

```text
Processando compra…
```

O envio também fica desabilitado para evitar operações duplicadas.

## Testes automatizados

Os testes foram executados com:

```bash
npm test
```

Resultado obtido em 11/09/2026:

```text
tests 8
pass 8
fail 0
```

Foram verificados:

- cálculos dos produtos e total;
- normalização do cartão;
- titular obrigatório;
- quantidade de dígitos do cartão;
- validade no formato `MM/AA`;
- CVV com três dígitos;
- identificação de cartões com todos os dígitos iguais;
- resultado assíncrono para aprovação e falha.

## Build

O comando:

```bash
npm run build
```

foi executado com sucesso em 11/09/2026.

A aplicação foi compilada para produção sem erros que impedissem a geração da pasta `dist`.

## Depuração com debugger

Foi realizada uma investigação utilizando o debugger do Chrome DevTools, na aba **Sources**.

O breakpoint foi colocado na função responsável por identificar cartões com todos os dígitos iguais:

```javascript
return /^(\d)\1{15}$/.test(normalizado);
```

### Cartão com dígitos repetidos

Entrada utilizada:

```text
1111-1111-1111-1111
```

Durante a pausa no breakpoint foram observados:

```text
numero = "1111111111111111"
normalizado = "1111111111111111"
```

A expressão:

```javascript
/^(\d)\1{15}$/.test(normalizado)
```

retornou:

```text
true
```

Após continuar a execução, a aplicação navegou para:

```text
/falha
```

e exibiu:

```text
tentativa de golpe
```

### Cartão com dígitos distintos

Entrada utilizada:

```text
1234 5678 9012 3456
```

A mesma expressão retornou:

```text
false
```

Após continuar a execução, a aplicação navegou para:

```text
/sucesso
```

A investigação confirmou que a regra de pagamento funciona de acordo com o comportamento esperado.

## Interface e responsividade

A interface utiliza CSS com Flexbox, Grid e media queries para adaptação entre diferentes tamanhos de tela.

Também foram aplicados recursos de acessibilidade, incluindo:

- HTML semântico;
- labels associados aos campos;
- indicação visual de foco;
- mensagens de erro acessíveis;
- gerenciamento de foco durante a navegação.

## Identidade visual

O projeto utiliza uma identidade visual inspirada em tons de verde.

Paleta utilizada:

```text
#BFE1B0
#1E4425
#A1C268
#456F5A
#588157
```

As imagens são utilizadas para apresentação visual dos produtos fictícios.

## Git e GitHub

O desenvolvimento foi dividido em feature branches.

As funcionalidades foram integradas progressivamente na branch `develop` por meio de Pull Requests.

O fluxo final será integrado na branch `main` antes da entrega.

Foram utilizados commits descritivos para registrar as etapas de implementação.

## Apoio durante o desenvolvimento

Durante o desenvolvimento foram consultados materiais de apoio, documentação e ferramentas de inteligência artificial para esclarecer dúvidas pontuais e auxiliar na revisão de alguns trechos.

As decisões de implementação foram adaptadas aos requisitos do projeto, e as funcionalidades foram executadas e verificadas durante o desenvolvimento.

## Melhorias futuras

Como possíveis evoluções do projeto:

- implementar um catálogo para escolha dos produtos;
- permitir inclusão e remoção de itens do carrinho;
- permitir alteração das quantidades;
- ampliar os testes de interface;
- realizar testes adicionais com tecnologias assistivas.

Esses recursos não fazem parte do escopo obrigatório atual.