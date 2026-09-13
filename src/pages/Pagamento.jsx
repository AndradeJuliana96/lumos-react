import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { pagamentoSchema } from '../utils/pagamento.js';
import { totalCompra, formatarMoeda } from '../utils/moeda.js';
import usePagamento from '../hooks/usePagamento.js';

import Campo from '../components/Campo.jsx';
import Etapas from '../components/Etapas.jsx';
import Icone from '../components/Icone.jsx';
import ResumoCompra from '../components/ResumoCompra.jsx';

export default function Pagamento({ produtos }) {
  const navigate = useNavigate();

  const { processando, processar } = usePagamento();

  const [erroGeral, setErroGeral] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(pagamentoSchema),
    defaultValues: {
      titular: '',
      numero: '',
      validade: '',
      cvv: ''
    },
    mode: 'onTouched'
  });

  const ocupado = processando || isSubmitting;

  async function enviar(dados) {
    setErroGeral('');

    try {
      const resultado = await processar(dados.numero);

      if (!resultado) return;

      reset();

      navigate(`/${resultado}`, {
        replace: true
      });
    } catch {
      setErroGeral(
        'Não foi possível concluir a simulação. Tente novamente.'
      );
    }
  }

  return (
    <>
      <Etapas atual={1} />

      <div className="titulo-pagina">
        <Link className="voltar" to="/">
          ← Voltar ao carrinho
        </Link>

        <h1>
          Falta pouco<span>.</span>
        </h1>

        <p>Informe os dados fictícios para simular sua compra.</p>
      </div>

      <div className="layout-compra">
        <section className="painel-pagamento">
          <div className="lista-cabecalho">
            <h2>
              <Icone nome="cartao" /> Dados do cartão
            </h2>

            <span>Simulação</span>
          </div>

          <div className="aviso">
            Use somente dados fictícios. Esta compra não gera cobrança nem
            envio de produtos.
          </div>

          <form
            id="form-pagamento"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(enviar)}
            aria-busy={ocupado}
          >
            <fieldset disabled={ocupado}>
              <legend className="sr-only">
                Informações do cartão fictício
              </legend>

              <Campo
                label="Nome do titular"
                nome="titular"
                registro={register('titular')}
                erro={errors.titular}
                placeholder="Como aparece no cartão"
                autoComplete="off"
              />

              <Campo
                label="Número do cartão"
                nome="numero"
                registro={register('numero', {
                  onChange: (event) => {
                    const numeros = event.target.value
                      .replace(/\D/g, '')
                      .slice(0, 16);

                    event.target.value = numeros
                      .replace(/(\d{4})(?=\d)/g, '$1 ');
                  }
                })}
                erro={errors.numero}
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                maxLength={19}
                autoComplete="off"
                ajuda="16 dígitos. Espaços e hífens são aceitos."
              />

              <div className="campos-duplos">
                <Campo
                  label="Validade"
                  nome="validade"
                  registro={register('validade', {
                    onChange: (event) => {
                      const numeros = event.target.value
                        .replace(/\D/g, '')
                        .slice(0, 4);

                      event.target.value =
                        numeros.length > 2
                          ? `${numeros.slice(0, 2)}/${numeros.slice(2)}`
                          : numeros;
                    }
                  })}
                  erro={errors.validade}
                  placeholder="MM/AA"
                  inputMode="numeric"
                  maxLength={5}
                />

                <Campo
                  label="Código de segurança"
                  nome="cvv"
                  registro={register('cvv')}
                  erro={errors.cvv}
                  placeholder="CVV"
                  type="password"
                  inputMode="numeric"
                  maxLength={3}
                  autoComplete="off"
                />
              </div>
            </fieldset>

            {erroGeral && (
              <p className="erro" role="alert">
                {erroGeral}
              </p>
            )}

            <p className="privacidade">
              <Icone nome="cadeado" tamanho={17} /> Os dados do cartão não são
              armazenados.
            </p>
          </form>
        </section>

        <ResumoCompra produtos={produtos}>
          <button
            className="botao"
            form="form-pagamento"
            type="submit"
            disabled={ocupado}
          >
            {ocupado ? (
              <>
                <span className="spinner" />
                Processando compra…
              </>
            ) : (
              <>
                Pagar {formatarMoeda(totalCompra(produtos))}
                <Icone nome="seta" />
              </>
            )}
          </button>

          <p
            className="sr-only"
            role="status"
            aria-live="polite"
          >
            {ocupado ? 'Processando compra…' : ''}
          </p>
        </ResumoCompra>
      </div>
    </>
  );
}