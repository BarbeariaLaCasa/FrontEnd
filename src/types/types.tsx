export type Barbeiro = {
  id: string;
  nome: string;
  fotoperfil: string;
};

export type Agendamento = {
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
