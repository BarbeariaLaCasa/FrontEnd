import React, { useState, useEffect } from "react";
import axios from "axios";
import { QuadradoAgendamento } from "./BarbeiroPageStyle";
import { Agendamento } from "../../types/types";

const BarbeiroPage = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [mostrarAgendamentos, setMostrarAgendamentos] = useState(false);
  const [nomeBarbeiro, setNomeBarbeiro] = useState("");
  const [barbeiroIdLogado, setBarbeiroIdLogado] = useState<number | null>(null);
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

  return (
    <div>
      <h1 style={{ color: "black" }}>Olá, {nomeBarbeiro}</h1>
      <button onClick={buscarAgendamentos}>Solicitações de Agendamentos</button>

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
    </div>
  );
};

export default BarbeiroPage;
