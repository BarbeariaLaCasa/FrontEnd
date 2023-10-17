import React from "react";
import { QuadradoAgendamento } from "./AgendamentoBarbeiroStyle";
import { Agendamento } from "../../types/types";

const AgendamentoBarbeiro = ({
  agendamento,
  aceitarAgendamento,
  recusarAgendamento,
}: {
  agendamento: Agendamento;
  aceitarAgendamento: (agendamentoId: number) => void;
  recusarAgendamento: (agendamentoId: number) => void;
}) => {
  return (
    <QuadradoAgendamento>
      <p>ID: {agendamento.barbeiro_id}</p>
      <p>Hora: {agendamento.hora}</p>
      <p>Data: {agendamento.data}</p>
      <p>Valor: {agendamento.valor}</p>
      <p>Forma de Pagamento: {agendamento.forma_pagamento}</p>
      <p>Status: {agendamento.status}</p>
      <button onClick={() => aceitarAgendamento(agendamento.idagendamentos)}>
        Aceitar
      </button>
      <button onClick={() => recusarAgendamento(agendamento.idagendamentos)}>
        Recusar
      </button>
    </QuadradoAgendamento>
  );
};

export default AgendamentoBarbeiro;
