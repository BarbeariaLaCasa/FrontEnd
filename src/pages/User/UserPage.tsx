import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import {
  AgendamentoBox,
  AgendamentoContainer,
  BotaoSalvarAgendamento,
  Botoes,
  CheckboxLabelServico,
  DivAgendamentos,
  DivBarbeiro,
  DivBotoes,
  DivDataHora,
  DivFooter,
  DivFormaPagamento,
  DivResumoAgendamento,
  DivResumoFinanceiro,
  DivServico,
  DivUser,
  H2Agendamentos,
  H2Barbeiros,
  H2DataHora,
  H2FormaPagamento,
  H2ResumoAgendamento,
  H2ResumoFinanceiro,
  H2ResumoFormaPagamento,
  H2Servico,
  LabelFormaPagamento,
  LiBarbeiros,
  LiResumoFormaPagamento,
  NomeBarbeiro,
  NomeUsuario,
  PAgendamentos,
  PResumoAgendamento,
  PResumoAgendamentoConteudo,
  PResumoFinanceiro,
  StyledDatePicker,
  TextAgendamentoConteudo,
  TextResumoFinanceiro,
  TextResumoFormaPagamento,
  UlBarbeiros,
  UlFormasPagamento,
} from "./UserPageStyle";
import { Agendamento } from "../../types/types";
import Header from "../../containers/Header/Header";
import Footer from "../../containers/Footer/Footer";

const UserPage = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [barbeirosData, setBarbeirosData] = useState<any[]>([]);
  const [barbeiroIdSelecionado, setBarbeiroIdSelecionado] = useState<
    number | null
  >(null);
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>(
    []
  );
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
  const [servicos, setServicos] = useState<any[]>([]);
  const [formaPagamento, setFormaPagamento] = useState<string | null>(null);
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] = useState<
    string | null
  >(null);

  const [horarioInicio, setHorarioInicio] = useState<Date | null>(null);
  const [horarioFinal, setHorarioFinal] = useState<Date | null>(null);
  const [nomeBarbeiroSelecionado, setNomeBarbeiroSelecionado] =
    useState<string>("");
  const [valorTotal, setValorTotal] = useState<number>(0);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [mostrarAgendamentos, setMostrarAgendamentos] = useState(false);
  const [resumoFinanceiro, setResumoFinanceiro] = useState({
    quantidadeCortes: 0,
    valorTotal: 0,
    mediaPorCorte: 0,
    formasPagamento: {} as { [forma: string]: number },
  });
  const [formasPagamento, setFormasPagamento] = useState<{
    [forma: string]: number;
  }>({});
  const [botaoAtivo, setBotaoAtivo] = useState<string | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`http://localhost:3001/usuarios/${userId}`)
        .then((response) => {
          const nomeDoUsuario = response.data.nome;
          const nomeCapitalizado =
            nomeDoUsuario.charAt(0).toUpperCase() + nomeDoUsuario.slice(1);
          setNomeUsuario(nomeCapitalizado);
        })
        .catch((error) => {
          console.error("Erro ao buscar o nome do usuário:", error);
        });
    }
  }, []);

  const handleSolicitarAgendamento = () => {
    axios
      .get("http://localhost:3001/barbeiros")
      .then((response) => {
        const barbeiros = response.data.map((barbeiro: any) => ({
          ...barbeiro,
          selecionado: true,
        }));
        setBarbeirosData(barbeiros);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados dos barbeiros:", error);
      });
    setBotaoAtivo("solicitarAgendamento");
  };

  const handleSelecionarBarbeiro = (barbeiroId: number, nome: string) => {
    const novosBarbeirosData = [...barbeirosData];

    const barbeiroClicado = novosBarbeirosData.find(
      (barbeiro) => barbeiro.idbarbeiro === barbeiroId
    );

    if (barbeiroClicado) {
      barbeiroClicado.selecionado = !barbeiroClicado.selecionado;

      setBarbeirosData(novosBarbeirosData);

      if (barbeiroClicado.selecionado) {
        setBarbeiroIdSelecionado(barbeiroId);
        setNomeBarbeiroSelecionado(nome);
      } else {
        setBarbeiroIdSelecionado(null);
        setNomeBarbeiroSelecionado("");
      }
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/servicos")
      .then((response) => {
        setServicos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar os serviços:", error);
      });
  }, []);

  const handleServicoSelecionado = (servico: string) => {
    if (servicosSelecionados.includes(servico)) {
      setServicosSelecionados(
        servicosSelecionados.filter((s) => s !== servico)
      );
      setDataSelecionada(null);
    } else {
      setServicosSelecionados([...servicosSelecionados, servico]);
    }
  };

  useEffect(() => {
    const duracaoTotal = servicosSelecionados.reduce((total, servico) => {
      const servicoSelecionado = servicos.find(
        (s) => s.nome.toLowerCase() === servico.toLowerCase()
      );
      const duracaoServico = servicoSelecionado?.duração || "00:00:00";
      const [hours, minutes, seconds] = duracaoServico.split(":").map(Number);
      const duracaoEmMinutos = hours * 60 + minutes + seconds / 60;
      return total + duracaoEmMinutos;
    }, 0);

    if (
      barbeiroIdSelecionado !== null &&
      servicosSelecionados.length > 0 &&
      dataSelecionada instanceof Date
    ) {
      const novaDataInicio = new Date(dataSelecionada.getTime());

      novaDataInicio.setUTCMinutes(
        novaDataInicio.getUTCMinutes() + duracaoTotal
      );

      console.log("Nova Data Início:", novaDataInicio);

      setHorarioInicio(dataSelecionada);
      setHorarioFinal(novaDataInicio);
    }
  }, [servicosSelecionados, barbeiroIdSelecionado, dataSelecionada, servicos]);

  const handleFormaPagamentoSelecionada = (forma: string) => {
    setFormaPagamentoSelecionada(forma);
    setFormaPagamento(forma);

    const precosServicos: { [key: string]: number } = {
      barba: 10,
      corte: 30,
      sobrancelha: 5,
    };

    const total = servicosSelecionados.reduce(
      (total, servico) => total + precosServicos[servico],
      0
    );

    setValorTotal(total);
  };

  const handleSalvarAgendamento = () => {
    if (
      barbeiroIdSelecionado === null ||
      servicosSelecionados.length === 0 ||
      dataSelecionada === null ||
      formaPagamentoSelecionada === null ||
      horarioInicio === null
    ) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const agendamento = {
      cliente_id: localStorage.getItem("userId"),
      barbeiro_id: barbeiroIdSelecionado,
      hora: horarioInicio.toLocaleTimeString(),
      data: dataSelecionada.toISOString(),
      valor: valorTotal,
      forma_pagamento: formaPagamentoSelecionada,
      status: "aguardando",
    };

    console.log("Dados do Agendamento:", agendamento);

    axios
      .post("http://localhost:3001/agendamentos", agendamento)
      .then((response) => {
        alert("Agendamento salvo com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao salvar agendamento:", error);
      });
  };

  const handleMostrarAgendamentos = () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      axios
        .get(`http://localhost:3001/agendamentos/usuario/${userId}`)
        .then((response) => {
          setAgendamentos(response.data);
          setMostrarAgendamentos(true);
        })
        .catch((error) => {
          console.error("Erro ao buscar os agendamentos:", error);
        });
    } else {
      console.error("ID do usuário não encontrado no localStorage.");
    }
    console.log("Clicou em Solicitar Agendamento");
    setBotaoAtivo("mostrarAgendamentos");
  };

  const calcularResumoFinanceiro = (userId: string) => {
    axios
      .get(`http://localhost:3001/agendamentos/usuario/${userId}`)
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
    const userId = localStorage.getItem("userId");
    if (userId) {
      calcularResumoFinanceiro(userId);
    } else {
      console.error("ID do usuário não encontrado no localStorage.");
    }
    setBotaoAtivo("mostrarResumoFinanceiro");
  };

  return (
    <DivUser>
      <Header />
      <NomeUsuario>Olá, {nomeUsuario}</NomeUsuario>
      <DivBotoes>
        <Botoes onClick={handleSolicitarAgendamento}>
          Solicitar Agendamento
        </Botoes>
        <Botoes onClick={handleMostrarAgendamentos}>Agendamentos</Botoes>
        <Botoes onClick={handleMostrarResumoFinanceiro}>
          Resumo Financeiro
        </Botoes>
      </DivBotoes>
      {botaoAtivo === "mostrarAgendamentos" && (
        <DivAgendamentos>
          <H2Agendamentos>Agendamentos</H2Agendamentos>
          <AgendamentoContainer>
            {agendamentos.map((agendamento) => (
              <AgendamentoBox key={agendamento.id}>
                <PAgendamentos>
                  Barbeiro:{" "}
                  <TextAgendamentoConteudo>
                    {agendamento.barbeiro}
                  </TextAgendamentoConteudo>
                </PAgendamentos>
                <PAgendamentos>
                  Data/Hora:{" "}
                  <TextAgendamentoConteudo>
                    {agendamento.data}
                  </TextAgendamentoConteudo>
                </PAgendamentos>
                <PAgendamentos>
                  Valor Total:
                  <TextAgendamentoConteudo>
                    R$ {agendamento.valor}
                  </TextAgendamentoConteudo>
                </PAgendamentos>
                <PAgendamentos>
                  Status:{" "}
                  <TextAgendamentoConteudo>
                    {agendamento.status}
                  </TextAgendamentoConteudo>
                </PAgendamentos>
              </AgendamentoBox>
            ))}
          </AgendamentoContainer>
        </DivAgendamentos>
      )}
      {botaoAtivo === "solicitarAgendamento" && (
        <DivBarbeiro>
          <H2Barbeiros>Barbeiros</H2Barbeiros>
          <UlBarbeiros>
            {barbeirosData.map((barbeiro) => (
              <LiBarbeiros key={barbeiro.idbarbeiro}>
                <div
                  className="barbeiro-foto"
                  style={{
                    border:
                      barbeiroIdSelecionado === barbeiro.idbarbeiro
                        ? "3px solid #A66F0A"
                        : "3px solid black",
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                  onClick={() =>
                    handleSelecionarBarbeiro(barbeiro.idbarbeiro, barbeiro.nome)
                  }
                >
                  <img
                    src={barbeiro.fotoperfil}
                    alt={`Foto de ${barbeiro.nome}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <NomeBarbeiro>{barbeiro.nome}</NomeBarbeiro>
              </LiBarbeiros>
            ))}
          </UlBarbeiros>
        </DivBarbeiro>
      )}
      {barbeiroIdSelecionado !== null && (
        <DivServico>
          <H2Servico>Serviços</H2Servico>
          {servicos.map((servico) => (
            <CheckboxLabelServico key={servico.idserviço}>
              <input
                type="checkbox"
                value={servico.nome}
                checked={servicosSelecionados.includes(servico.nome)}
                onChange={() => handleServicoSelecionado(servico.nome)}
              />
              {servico.nome}
            </CheckboxLabelServico>
          ))}
        </DivServico>
      )}
      {servicosSelecionados.length > 0 && (
        <DivDataHora>
          <H2DataHora>Selecione a Data e Hora</H2DataHora>
          <StyledDatePicker
            selected={dataSelecionada}
            onChange={(date) => setDataSelecionada(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecione a data e hora"
          />
        </DivDataHora>
      )}
      {dataSelecionada !== null && (
        <DivFormaPagamento>
          <H2FormaPagamento>Forma de Pagamento</H2FormaPagamento>
          <LabelFormaPagamento>
            <input
              type="radio"
              value="cartao"
              checked={formaPagamento === "cartao"}
              onChange={() => handleFormaPagamentoSelecionada("Cartão")}
            />
            Cartão de Crédito/Débito
          </LabelFormaPagamento>
          <LabelFormaPagamento>
            <input
              type="radio"
              value="pix"
              checked={formaPagamento === "pix"}
              onChange={() => handleFormaPagamentoSelecionada("Pix")}
            />
            PIX
          </LabelFormaPagamento>
          <LabelFormaPagamento>
            <input
              type="radio"
              value="dinheiro"
              checked={formaPagamento === "dinheiro"}
              onChange={() => handleFormaPagamentoSelecionada("Dinheiro")}
            />
            Dinheiro
          </LabelFormaPagamento>
        </DivFormaPagamento>
      )}
      {formaPagamentoSelecionada && (
        <DivResumoAgendamento>
          <H2ResumoAgendamento>Resumo do Agendamento</H2ResumoAgendamento>
          <PResumoAgendamento>
            Cliente:{" "}
            <PResumoAgendamentoConteudo>
              {nomeUsuario}
            </PResumoAgendamentoConteudo>
          </PResumoAgendamento>
          <PResumoAgendamento>
            Barbeiro:{" "}
            <PResumoAgendamentoConteudo>
              {nomeBarbeiroSelecionado}
            </PResumoAgendamentoConteudo>
          </PResumoAgendamento>
          <PResumoAgendamento>
            Serviços:{" "}
            <PResumoAgendamentoConteudo>
              {servicosSelecionados.join(", ")}
            </PResumoAgendamentoConteudo>
          </PResumoAgendamento>
          <PResumoAgendamento>
            Data/Hora Início:{" "}
            <PResumoAgendamentoConteudo>
              {horarioInicio?.toLocaleString()}
            </PResumoAgendamentoConteudo>
          </PResumoAgendamento>
          <PResumoAgendamento>
            Data/Hora Término:{" "}
            <PResumoAgendamentoConteudo>
              {horarioFinal?.toLocaleString()}
            </PResumoAgendamentoConteudo>
          </PResumoAgendamento>
          <PResumoAgendamento>
            Forma de Pagamento:{" "}
            <PResumoAgendamentoConteudo>
              {formaPagamentoSelecionada}
            </PResumoAgendamentoConteudo>
          </PResumoAgendamento>
          <PResumoAgendamento>
            Valor Total:
            <PResumoAgendamentoConteudo>
              R$ {valorTotal.toFixed(2)}
            </PResumoAgendamentoConteudo>
          </PResumoAgendamento>
          <BotaoSalvarAgendamento onClick={handleSalvarAgendamento}>
            Salvar Agendamento
          </BotaoSalvarAgendamento>
        </DivResumoAgendamento>
      )}
      {botaoAtivo === "mostrarResumoFinanceiro" && (
        <DivResumoFinanceiro>
          <H2ResumoFinanceiro>Resumo Financeiro</H2ResumoFinanceiro>
          <PResumoFinanceiro>
            Quantidade de Cortes:{" "}
            <TextResumoFinanceiro>
              {resumoFinanceiro.quantidadeCortes}
            </TextResumoFinanceiro>
          </PResumoFinanceiro>
          <PResumoFinanceiro>
            Valor Total:{" "}
            <TextResumoFinanceiro>
              R$ {resumoFinanceiro.valorTotal.toFixed(2)}
            </TextResumoFinanceiro>{" "}
          </PResumoFinanceiro>
          <PResumoFinanceiro>
            Média por Corte:{" "}
            <TextResumoFinanceiro>
              R$ {resumoFinanceiro.mediaPorCorte.toFixed(2)}
            </TextResumoFinanceiro>
          </PResumoFinanceiro>
          <H2ResumoFormaPagamento>Formas de Pagamento</H2ResumoFormaPagamento>
          <UlFormasPagamento>
            {Object.keys(resumoFinanceiro.formasPagamento).map((forma) => (
              <LiResumoFormaPagamento key={forma}>
                {forma}:{" "}
                <TextResumoFormaPagamento>
                  {resumoFinanceiro.formasPagamento[forma]}
                </TextResumoFormaPagamento>
              </LiResumoFormaPagamento>
            ))}
          </UlFormasPagamento>
        </DivResumoFinanceiro>
      )}
      <DivFooter>
        <Footer />
      </DivFooter>
    </DivUser>
  );
};

export default UserPage;
