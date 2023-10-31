import React, { useState, useEffect } from "react";
import axios from "axios";
import { QuadradoAgendamento } from "./BarbeiroPageStyle";
import { Agendamento } from "../../types/types";

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

        // Calcular o valor total
        const valorTotal = agendamentos.reduce(
          (total: number, agendamento: { valor: string }) =>
            total + parseFloat(agendamento.valor),
          0
        );

        // Calcular a média por corte
        const mediaPorCorte =
          quantidadeCortes > 0 ? valorTotal / quantidadeCortes : 0;

        // Calcular as formas de pagamento e a contagem de uso
        const formasPagamento: { [forma: string]: number } = {};
        agendamentos.forEach((agendamento: { forma_pagamento: any }) => {
          const formaPagamento = agendamento.forma_pagamento;
          formasPagamento[formaPagamento] =
            (formasPagamento[formaPagamento] || 0) + 1;
        });

        // Atualizar os estados
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
    // Use o ID do usuário atual para buscar os agendamentos e calcular o resumo financeiro
    const barbeiroId = localStorage.getItem("barbeiroId");
    if (barbeiroId) {
      calcularResumoFinanceiro(barbeiroId);
    } else {
      console.error("ID do usuário não encontrado no localStorage.");
    }
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>Olá, {nomeBarbeiro}</h1>
      <button onClick={buscarAgendamentos}>Solicitações de Agendamentos</button>
      <button onClick={handleMostrarResumoFinanceiro}>Resumo Financeiro</button>

      {mostrarAgendamentos && (
        <div>
          <h2>Agendamentos:</h2>
          <ul>
            {agendamentos.map((agendamento, index) => (
              <QuadradoAgendamento key={index}>
                <p>ID: {agendamento.barbeiro_id}</p>
                <p>Hora: {agendamento.hora}</p>
                <p>Data: {agendamento.data}</p>
                <p>Valor: {agendamento.valor}</p>
                <p>Forma de Pagamento: {agendamento.forma_pagamento}</p>
                <p>Status: {agendamento.status}</p>
                <button
                  onClick={() => aceitarAgendamento(agendamento.idagendamentos)}
                >
                  Aceitar
                </button>
                <button
                  onClick={() => recusarAgendamento(agendamento.idagendamentos)}
                >
                  Recusar
                </button>
              </QuadradoAgendamento>
            ))}
          </ul>
        </div>
      )}
      {resumoFinanceiro && (
        <div>
          <h2>Resumo Financeiro</h2>
          <p>Quantidade de Cortes: {resumoFinanceiro.quantidadeCortes}</p>
          <p>Valor Total: R$ {resumoFinanceiro.valorTotal.toFixed(2)}</p>
          <p>Média por Corte: R$ {resumoFinanceiro.mediaPorCorte.toFixed(2)}</p>
          <h3>Formas de Pagamento</h3>
          <ul>
            {Object.keys(resumoFinanceiro.formasPagamento).map((forma) => (
              <li key={forma}>
                {forma}: {resumoFinanceiro.formasPagamento[forma]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BarbeiroPage;
