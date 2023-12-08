export type Barbeiro = {
  id: string;
  nome: string;
  fotoperfil: string;
};

export type Agendamento = {
  disabled: boolean;
  id: null | number;
  barbeiro: string;
  idagendamentos: number;
  cliente_id: number;
  barbeiro_id: number;
  hora: string;
  data: string;
  valor: number;
  forma_pagamento: string;
  status: string;
};

export interface Service {
  idserviço: number;
  nome: string;
  valor: string;
  duração: string;
  descricaoservico: string;
}
