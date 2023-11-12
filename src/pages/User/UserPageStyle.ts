import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DivUser = styled.div`
  background-color: ${colorsVariables.grey};
  width: 100%;
  height: 100%;
`;

export const NomeUsuario = styled.h1`
  color: ${colorsVariables.goldDark};
  margin-top: 70px;
  margin-left: 44%;
`;

export const DivBotoes = styled.div`
  margin-top: 30px;
  margin-left: 32%;
`;

export const Botoes = styled.button`
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const DivAgendamentos = styled.div`
  margin: 10px;
`;

export const H2Agendamentos = styled.h2`
  margin-left: 43%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const AgendamentoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-left: 40px;
`;

export const AgendamentoBox = styled.div`
  border: 3px solid ${colorsVariables.goldDark};
  padding: 10px;
  margin: 5px;
  width: 200px;
`;

export const PAgendamentos = styled.p`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
`;

export const TextAgendamentoConteudo = styled.text`
  color: ${colorsVariables.goldDark};
  font-weight: normal;
  margin-left: 3px;
`;
export const DivBarbeiro = styled.div`
  margin-left: 33%;
  margin-top: 30px;
`;

export const H2Barbeiros = styled.h2`
  margin-left: 18%;
  margin-bottom: 40px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const UlBarbeiros = styled.ul`
  liststyle: none;
  display: flex;
  margin-left: -70px;
`;

export const LiBarbeiros = styled.li`
  margin-right: 50px;
  cursor: pointer;
`;

export const NomeBarbeiro = styled.p`
  color: ${colorsVariables.goldDark};
  font-size: 22px;
  font-weight: bold;
  margin-top: 8px;
  display: flex;
  justify-content: space-evenly;
`;

export const DivServico = styled.div`
  margin-top: 50px;
  margin-left: 40%;
`;

export const H2Servico = styled.h2`
  margin-left: 9%;
  margin-bottom: 15px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const CheckboxLabelServico = styled.label`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  color: ${colorsVariables.goldDark};
  margin-right: 20px;
  margin-left: 60px;

  input {
    margin-right: 8px;
  }
  input:checked {
    color: ${colorsVariables.goldDark};
  }
`;

export const DivDataHora = styled.div`
  margin-top: 30px;
  margin-left: 38%;
`;

export const H2DataHora = styled.h2`
  margin-bottom: 15px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const StyledDatePicker = styled(DatePicker)`
  font-size: 16px;
  padding: 8px;
  border: 2px solid ${colorsVariables.goldDark};
  border-radius: 10px;
  margin-left: 50px;

  .react-datepicker-wrapper {
    display: inline-block;
    margin-right: 10px;
  }

  .react-datepicker__input-container {
    display: inline-block;
  }
`;

export const DivFormaPagamento = styled.div`
  margin: 40px;
`;

export const H2FormaPagamento = styled.h2`
  margin-left: 38.2%;
  margin-bottom: 15px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const LabelFormaPagamento = styled.label`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  color: ${colorsVariables.goldDark};
  margin-right: 20px;
  margin-left: 560px;

  input {
    margin-right: 8px;
  }
`;

export const DivResumoAgendamento = styled.div`
  margin: 40px;
`;

export const H2ResumoAgendamento = styled.h2`
  margin-left: 36%;
  margin-bottom: 15px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const PResumoAgendamento = styled.p`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
  margin-left: 44%;
  padding: 3px;
`;

export const PResumoAgendamentoConteudo = styled.text`
  color: ${colorsVariables.goldDark};
  font-weight: normal;
  margin-left: 3px;
`;

export const DivBotoesAgendamento = styled.div`
  margin-left: 28%;
  margin-top: 10px;
`;

export const BotaoSalvarAgendamento = styled.button`
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
  margin-left: 44%;
  margin-top: 20px;
`;

export const DivResumoFinanceiro = styled.div`
  margin: 40px;
  margin-left: 44%;
`;

export const H2ResumoFinanceiro = styled.h2`
  margin-left: -5%;
  margin-bottom: 15px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const PResumoFinanceiro = styled.p`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
  padding: 3px;
`;

export const TextResumoFinanceiro = styled.text`
  color: ${colorsVariables.goldDark};
  font-weight: normal;
  margin-left: 3px;
`;

export const H2ResumoFormaPagamento = styled.h2`
  margin-left: -7%;
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const UlFormasPagamento = styled.ul`
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 8px;
    font-size: 16px;
  }
`;

export const LiResumoFormaPagamento = styled.li`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
  margin-left: 7%;
`;

export const TextResumoFormaPagamento = styled.text`
  font-weight: normal;
`;

export const DivFooter = styled.div`
  margin-top: 100px;
`;
