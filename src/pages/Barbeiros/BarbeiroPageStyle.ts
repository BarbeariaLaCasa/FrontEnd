import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";

export const DivBarbeiro = styled.div`
  background-color: ${colorsVariables.grey};
  width: 100%;
  height: 100%;
`;

export const NomeBarbeiro = styled.h1`
  color: ${colorsVariables.goldDark};
  margin-top: 70px;
  margin-left: 44%;
`;

export const DivBotoesBarbeiro = styled.div`
  margin-top: 30px;
  margin-left: 35%;
`;

export const BotoesBarbeiro = styled.button`
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const DivAgendamentosBarbeiro = styled.div`
  margin: 10px;
`;

export const H2AgendamentosBarbeiro = styled.h2`
  margin-left: 43%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const DivUlBarbeiros = styled.div`
  margin-left: 1%;
`;

export const UlBarbeiros = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

export const QuadradoAgendamento = styled.div`
  border: 3px solid ${colorsVariables.goldDark};
  padding: 10px;
  margin: 10px;
  flex: 0 0 calc(25% - 20px);
  box-sizing: border-box;
  box-shadow: 0 4px 8px ${colorsVariables.boxShadow};
`;

export const PQuadroAgendamento = styled.p`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
  padding: 3px;
`;

export const TextAgendamentoConteudo = styled.text`
  color: ${colorsVariables.goldDark};
  font-weight: normal;
  margin-left: 3px;
`;

export const DivBotoesAgendamento = styled.div`
  margin-top: 30px;
  margin-left: 50px;
`;

export const BotoesAgendamentoAceitar = styled.button`
  margin: 0px 10px 0px -20px;
  border-radius: 10px;
  font-weight: bold;
  padding: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const BotoesAgendamentoRecusar = styled.button`
  margin: 0px 10px 0px 10px;
  border-radius: 10px;
  font-weight: bold;
  padding: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const DivResumoFinanceiroBarbeiro = styled.div`
  margin: 40px;
  margin-left: 44%;
`;

export const H2ResumoFinanceiroBarbeiro = styled.h2`
  margin-left: -5%;
  margin-bottom: 15px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const PResumoFinanceiroBarbeiro = styled.p`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
  padding: 3px;
`;

export const TextResumoFinanceiroBarbeiro = styled.text`
  color: ${colorsVariables.goldDark};
  font-weight: normal;
  margin-left: 3px;
`;

export const H2ResumoFormaPagamentoBarbeiro = styled.h2`
  margin-left: -7%;
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const UlFormasPagamentoBarbeiro = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const LiResumoFormaPagamentoBarbeiro = styled.li`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
  margin-left: 7%;
`;

export const TextResumoFormaPagamentoBarbeiro = styled.text`
  font-weight: normal;
`;

export const DivFooterBarbeiro = styled.div`
  margin-top: 100px;
`;
