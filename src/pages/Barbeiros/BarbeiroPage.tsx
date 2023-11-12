import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BotoesAgendamento,
  BotoesAgendamentoAceitar,
  BotoesAgendamentoRecusar,
  BotoesBarbeiro,
  DivAgendamentosBarbeiro,
  DivBarbeiro,
  DivBotoesBarbeiro,
  DivFooterBarbeiro,
  DivResumoFinanceiroBarbeiro,
  DivUlBarbeiros,
  H2AgendamentosBarbeiro,
  H2ResumoFinanceiroBarbeiro,
  H2ResumoFormaPagamentoBarbeiro,
  LiResumoFormaPagamentoBarbeiro,
  NomeBarbeiro,
  PQuadroAgendamento,
  PResumoFinanceiroBarbeiro,
  QuadradoAgendamento,
  TextAgendamentoConteudo,
  TextResumoFinanceiroBarbeiro,
  UlBarbeiros,
  UlFormasPagamentoBarbeiro,
} from "./BarbeiroPageStyle";
import { Agendamento } from "../../types/types";
import Header from "../../containers/Header/Header";
import { DivBotoesAgendamento } from "../User/UserPageStyle";
import Footer from "../../containers/Footer/Footer";

const BarbeiroPage = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [mostrarAgendamentos, setMostrarAgendamentos] = useState(false);
  const [nomeBarbeiro, setNomeBarbeiro] = useState("");
  const [barbeiroIdLogado, setBarbeiroIdLogado] = useState<number | null>(null);
  const [resumoFinanceiro, setResumoFinanceiro] = useState({
    quantidadeCortes: 0,
    valorTotal: 0,
    mediaPorCorte: 0,
    formasPagamento: 0,
  });

  const [formasPagamento, setFormasPagamento] = useState<{
    [forma: string]: number;
  }>({});

  const aceitarAgendamento = (agendamentoId: number) => {
    const novoStatus = "aceito";
    console.log(
      "Aceitar Agendamento - ID:",
      agendamentoId,
      "Status:",
      novoStatus
    );
    atualizarStatusAgendamento(agendamentoId, novoStatus);
  };

  const recusarAgendamento = (agendamentoId: number) => {
    const novoStatus = "recusado";
    console.log(
      "Recusar Agendamento - ID:",
      agendamentoId,
      "Status:",
      novoStatus
    );
    atualizarStatusAgendamento(agendamentoId, novoStatus);
  };

  const buscarAgendamentos = () => {
    axios
      .get<Agendamento[]>("http://localhost:3001/agendamentos")
      .then((response) => {
        const agendamentosFiltrados = response.data.filter(
          (agendamento) => agendamento.barbeiro_id === barbeiroIdLogado
        );
        setAgendamentos(agendamentosFiltrados);
        setMostrarAgendamentos(true);
      })
      .catch((error) => {
        console.error("Erro ao buscar agendamentos:", error);
      });
  };

  const atualizarStatusAgendamento = (
    agendamentoId: number,
    novoStatus: string
  ) => {
    const url = `http://localhost:3001/agendamentos/${
      novoStatus === "aceito" ? "aceito" : "recusado"
    }/${agendamentoId}`;

    axios
      .put(url, {})
      .then((response) => {
        buscarAgendamentos();
      })
      .catch((error) => {
        console.error(
          `Erro ao ${
            novoStatus === "aceito" ? "aceitar" : "recusar"
          } agendamento:`,
          error
        );
      });
  };

  useEffect(() => {
    const barbeiroIdLogado = localStorage.getItem("barbeiroId");
    if (barbeiroIdLogado) {
      setBarbeiroIdLogado(parseInt(barbeiroIdLogado));
      axios
        .get(`http://localhost:3001/barbeiros/${barbeiroIdLogado}`)
        .then((response) => {
          setNomeBarbeiro(response.data.nome);
        })
        .catch((error) => {
          console.error("Erro ao buscar o nome do barbeiro:", error);
        });
    }
  }, []);

  const calcularResumoFinanceiro = (barbeiroId: string) => {
    axios
      .get(`http://localhost:3001/agendamentos/barbeiro/${barbeiroId}`)
      .then((response) => {
        const agendamentos = response.data;
        const quantidadeCortes = agendamentos.length;

        const valorTotal = agendamentos.reduce(
          (total: number, agendamento: { valor: string }) =>
            total + parseFloat(agendamento.valor),
          0
        );

        const mediaPorCorte =
          quantidadeCortes > 0 ? valorTotal / quantidadeCortes : 0;

        const formasPagamento: { [forma: string]: number } = {};
        agendamentos.forEach((agendamento: { forma_pagamento: any }) => {
          const formaPagamento = agendamento.forma_pagamento;
          formasPagamento[formaPagamento] =
            (formasPagamento[formaPagamento] || 0) + 1;
        });

        setResumoFinanceiro({
          quantidadeCortes,
          valorTotal,
          mediaPorCorte,
          formasPagamento,
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar os agendamentos:", error);
      });
  };

  const handleMostrarResumoFinanceiro = () => {
    const barbeiroId = localStorage.getItem("barbeiroId");
    if (barbeiroId) {
      calcularResumoFinanceiro(barbeiroId);
    } else {
      console.error("ID do usuário não encontrado no localStorage.");
    }
  };

  return (
    <DivBarbeiro>
      <Header></Header>
      <NomeBarbeiro>Olá, {nomeBarbeiro}</NomeBarbeiro>
      <DivBotoesBarbeiro>
        <BotoesBarbeiro onClick={buscarAgendamentos}>
          Solicitações de Agendamentos
        </BotoesBarbeiro>
        <BotoesBarbeiro onClick={handleMostrarResumoFinanceiro}>
          Resumo Financeiro
        </BotoesBarbeiro>
      </DivBotoesBarbeiro>
      {mostrarAgendamentos && (
        <DivAgendamentosBarbeiro>
          <H2AgendamentosBarbeiro>Agendamentos:</H2AgendamentosBarbeiro>
          <DivUlBarbeiros>
            <UlBarbeiros>
              {agendamentos.map((agendamento, index) => (
                <QuadradoAgendamento key={index}>
                  <PQuadroAgendamento>
                    Hora:{" "}
                    <TextAgendamentoConteudo>
                      {agendamento.hora}
                    </TextAgendamentoConteudo>
                  </PQuadroAgendamento>
                  <PQuadroAgendamento>
                    Data:{" "}
                    <TextAgendamentoConteudo>
                      {agendamento.data}
                    </TextAgendamentoConteudo>
                  </PQuadroAgendamento>
                  <PQuadroAgendamento>
                    Valor:
                    <TextAgendamentoConteudo>
                      R$ {agendamento.valor}
                    </TextAgendamentoConteudo>
                  </PQuadroAgendamento>
                  <PQuadroAgendamento>
                    Forma de Pagamento:{" "}
                    <TextAgendamentoConteudo>
                      {agendamento.forma_pagamento}
                    </TextAgendamentoConteudo>
                  </PQuadroAgendamento>
                  <PQuadroAgendamento>
                    Status:{" "}
                    <TextAgendamentoConteudo>
                      {agendamento.status}
                    </TextAgendamentoConteudo>
                  </PQuadroAgendamento>
                  <DivBotoesAgendamento>
                    <BotoesAgendamentoAceitar
                      onClick={() =>
                        aceitarAgendamento(agendamento.idagendamentos)
                      }
                    >
                      Aceitar
                    </BotoesAgendamentoAceitar>
                    <BotoesAgendamentoRecusar
                      onClick={() =>
                        recusarAgendamento(agendamento.idagendamentos)
                      }
                    >
                      Recusar
                    </BotoesAgendamentoRecusar>
                  </DivBotoesAgendamento>
                </QuadradoAgendamento>
              ))}
            </UlBarbeiros>
          </DivUlBarbeiros>
        </DivAgendamentosBarbeiro>
      )}
      {resumoFinanceiro && (
        <DivResumoFinanceiroBarbeiro>
          <H2ResumoFinanceiroBarbeiro>
            Resumo Financeiro
          </H2ResumoFinanceiroBarbeiro>
          <PResumoFinanceiroBarbeiro>
            Quantidade de Cortes:{" "}
            <TextResumoFinanceiroBarbeiro>
              {resumoFinanceiro.quantidadeCortes}
            </TextResumoFinanceiroBarbeiro>
          </PResumoFinanceiroBarbeiro>
          <PResumoFinanceiroBarbeiro>
            Valor Total:{" "}
            <TextResumoFinanceiroBarbeiro>
              R$
              {resumoFinanceiro.valorTotal.toFixed(2)}
            </TextResumoFinanceiroBarbeiro>
          </PResumoFinanceiroBarbeiro>
          <PResumoFinanceiroBarbeiro>
            Média por Corte:
            <TextResumoFinanceiroBarbeiro>
              R$ {resumoFinanceiro.mediaPorCorte.toFixed(2)}
            </TextResumoFinanceiroBarbeiro>
          </PResumoFinanceiroBarbeiro>
          <H2ResumoFormaPagamentoBarbeiro>
            Formas de Pagamento
          </H2ResumoFormaPagamentoBarbeiro>
          <UlFormasPagamentoBarbeiro>
            {Object.keys(resumoFinanceiro.formasPagamento).map((forma) => (
              <LiResumoFormaPagamentoBarbeiro key={forma}>
                {forma}:{" "}
                <TextResumoFinanceiroBarbeiro>
                  {resumoFinanceiro.formasPagamento[forma]}
                </TextResumoFinanceiroBarbeiro>
              </LiResumoFormaPagamentoBarbeiro>
            ))}
          </UlFormasPagamentoBarbeiro>
        </DivResumoFinanceiroBarbeiro>
      )}
      <DivFooterBarbeiro>
        <Footer></Footer>
      </DivFooterBarbeiro>
    </DivBarbeiro>
  );
};

export default BarbeiroPage;
