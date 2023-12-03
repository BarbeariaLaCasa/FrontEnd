import { colorsVariables } from "./../../style/VariablesStyle";
import styled from "styled-components";

export const DivAdministrador = styled.div`
  background-color: ${colorsVariables.grey};
  width: 100%;
  height: 100%;
`;

export const NomeAdministrador = styled.h1`
  color: ${colorsVariables.goldDark};
  margin-top: 70px;
  margin-left: 44%;
`;

export const DivBotoes = styled.div`
  margin-top: 30px;
  margin-left: 39%;
`;

export const Botoes = styled.button`
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const DivServicos = styled.div`
  margin-left: 40%;
  margin-top: 15px;
`;

export const H2Servicos = styled.h2`
  margin-left: 8%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const DivServicosExibicao = styled.div`
  display: "flex";
  alignitems: "center";
  margin-left: -3%;
`;

export const TextServicoNome = styled.text`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
  font-size: 20px;
`;

export const TextConteudoServico = styled.text`
  color: ${colorsVariables.goldDark};
  font-weight: normal;
  font-size: 18px;
`;

export const DivBotaoServico = styled.div`
  margin: 10px;
  margin-left: 33%;
`;

export const BotaoEditarServico = styled.button`
  margin: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const UlServicos = styled.ul`
  liststyle: none;
  display: flex;
  margin-left: -50%;
`;

export const LiServicos = styled.li`
  margin-right: 50px;
  cursor: pointer;
`;

export const DivEdicao = styled.div`
  display: flex;
  margin-right: 50px;
  flex-wrap: nowrap;
  align-items: center;
  flex-direction: column;
`;

export const TexteEdicao = styled.text`
  margin: 5px 0px;
  font-weight: bold;
  color: ${colorsVariables.goldDark};
`;

export const InputEdicao = styled.input`
  padding: 5px;
  margin: 2px;
  font-size: 14px;
  border: 2px solid ${colorsVariables.goldDark};
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: ${colorsVariables.goldMedium};
  }
`;

export const DivBotaoEdicao = styled.div`
  display: flex;
  alignitems: center;
  margin: 10px 50px 0px 30px;
`;

export const BotaoSalvarEdicao = styled.button`
  margin: 5px;
  border-radius: 10px;
  padding: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const BotaoCancelarEdicao = styled.button`
  margin: 5px;
  border-radius: 10px;
  padding: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const DivEquipeAdministrador = styled.div`
  margin: 10px;
  margin-left: 33%;
`;

export const H2BarbeirosAdministrador = styled.h2`
  margin-left: 17%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const UlBarbeirosAdministrador = styled.ul`
  liststyle: none;
  display: flex;
`;

export const LiBarbeirosAdministrador = styled.li`
  margin-right: 20px;
  cursor: pointer;
`;

export const ImgBarbeiroAdministrador = styled.img`
  width: 100%;
  height: 100%;
  objectfit: cover;
`;

export const NomeBarbeiroAdministrador = styled.p`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
  font-size: 22px;
  margin-top: 5px;
  margin-left: 20%;
`;

export const BotaoExcluirBarbeiroAdministrador = styled.button`
  margin: 5px;
  margin-left: 20%;
  border-radius: 10px;
  padding: 4px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const BotaoAdicionarBarbeiroAdministrador = styled.button`
  margin-top: 50px;
  margin-left: 20%;
  border-radius: 10px;
  padding: 4px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const DivFormulario = styled.div`
  margin: 30px;
  margin-left: 33%;
`;

export const LabelAdicaoBarbeiro = styled.label`
  display: flex;
  font-size: 20px;
  font-weight: bold;
  color: ${colorsVariables.goldDark};
  margin-right: 20px;
  margin-left: 10%;
`;

export const InputAdicaoBarbeiro = styled.input`
  padding: 3px;
  margin: 5px;
  margin-left: 10%;
  font-size: 16px;
  border: 1px solid ${colorsVariables.goldDark};
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: ${colorsVariables.goldMedium};
  }
`;

export const TextAreaAdicaoBarbeiro = styled.textarea`
  padding: 3px;
  margin: 5px;
  margin-left: 10%;
  font-size: 16px;
  border: 1px solid ${colorsVariables.goldDark};
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: ${colorsVariables.goldMedium};
  }
`;

export const BotaoAdicionarFotoBarbeiro = styled.button`
  margin-left: 10%;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const BotaoAdicionarNovoBarbeiro = styled.button`
  margin-left: 20%;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 10px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const DivResumoFinanceiroAdministrador = styled.div`
  margin-top: 30px;
  margin-left: 39%;
`;

export const H2ResumoFinanceiroAdministrador = styled.h2`
  margin-left: 2%;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
  color: ${colorsVariables.goldDark};
`;

export const TabelaResumoAdministrador = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: -31%;
`;

export const THeadResumoAdministrador = styled.thead`
  border: 2px solid ${colorsVariables.goldDark};
`;

export const TrResumoAdministrador = styled.tr`
  border: 2px solid ${colorsVariables.goldDark};
  text-align: center;
`;

export const ThResumoAdministrador = styled.th`
  background-color: ${colorsVariables.lightGrey};
  border: 2px solid ${colorsVariables.goldDark};
  padding: 10px;
  text-align: center;
`;

export const TdResumoAdministrador = styled.td`
  padding: 10px;
  border: 2px solid ${colorsVariables.goldDark};
  text-align: center;
`;

export const AgendamentoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const AgendamentoBox = styled.div`
  border: 1px solid ${colorsVariables.black};
  padding: 10px;
  margin: 10px;
  width: 200px; /* Ajuste a largura conforme necessário */
`;

export const DivFooterAdministrador = styled.div`
  margin-top: 100px;
`;

export const DivPaginaInicial = styled.div`
  margin-top: 20px;
`;

export const DivTextosPaginaInicial = styled.div`
  border: 2px solid ${colorsVariables.goldMedium};
  padding: 10px;
  margin: 45px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-content: stretch;
  justify-content: flex-end;
  align-items: center;
`;

export const BotaoEditarTitulo = styled.button`
  margin-top: 20px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const TextAreaEdicao = styled.textarea`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  border: 2px solid ${colorsVariables.goldMedium};
  padding: 10px;
  margin: 45px;
`;

export const BotaoCancelarTitulo = styled.button`
  margin-top: 20px;
  margin-left: 80px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const BotaoSalvarTitulo = styled.button`
  position: absolute;
  margin-top: 50px;
  margin-left: -60px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const BotaoEditarDescricao = styled.button`
  margin-top: 20px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const BotaoCancelarDescricao = styled.button`
  margin-top: 20px;
  margin-left: 80px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;

export const BotaoSalvarDescricao = styled.button`
  position: absolute;
  margin-top: -2px;
  margin-left: -60px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid ${colorsVariables.goldDark};
  background-color: ${colorsVariables.lightGrey};
  color: ${colorsVariables.goldDark};
`;
