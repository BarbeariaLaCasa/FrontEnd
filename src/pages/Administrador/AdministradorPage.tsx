import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AgendamentoBox, AgendamentoContainer } from "./AdministradorPageStyle";
import { Agendamento } from "../../types/types";

const AdministradorPage = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [barbeirosData, setBarbeirosData] = useState<any[]>([]);
  const [barbeiroIdSelecionado, setBarbeiroIdSelecionado] = useState<
    number | null
  >(null);
  const [servicosSelecionados, setServicosSelecionados] = useState<string[]>(
    []
  );
  const [dataSelecionada, setDataSelecionada] = useState<Date | null>(null);
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
    formasPagamento: 0,
  });
  const [formasPagamento, setFormasPagamento] = useState<{
    [forma: string]: number;
  }>({});

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
          selecionado: true, // Defina todos os barbeiros como selecionados inicialmente
        }));
        setBarbeirosData(barbeiros);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados dos barbeiros:", error);
      });
  };

  const handleSelecionarBarbeiro = (barbeiroId: number, nome: string) => {
    // Crie uma cópia do estado de barbeirosData para evitar mutações diretas
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

  const handleServicoSelecionado = (servico: string) => {
    if (servicosSelecionados.includes(servico)) {
      // Se o serviço já estiver na lista de serviços selecionados, remova-o
      setServicosSelecionados(
        servicosSelecionados.filter((s) => s !== servico)
      );
      // Também limpe a data selecionada quando o serviço é desselecionado
      setDataSelecionada(null);
    } else {
      // Caso contrário, adicione-o à lista de serviços selecionados
      setServicosSelecionados([...servicosSelecionados, servico]);
    }
  };

  useEffect(() => {
    // Mapear os tempos estimados para cada serviço
    const temposEstimados: { [key: string]: number } = {
      barba: 30,
      cabelo: 30,
      sobrancelha: 15,
    };

    const duracaoTotal = servicosSelecionados.reduce(
      (total, servico) => total + temposEstimados[servico],
      0
    );

    if (
      barbeiroIdSelecionado !== null &&
      servicosSelecionados.length > 0 &&
      dataSelecionada instanceof Date
    ) {
      const novaDataInicio = new Date(dataSelecionada.getTime());
      const novaDataFinal = new Date(
        dataSelecionada.getTime() + duracaoTotal * 60000
      );
      setHorarioInicio(novaDataInicio);
      setHorarioFinal(novaDataFinal);
    }
  }, [servicosSelecionados, barbeiroIdSelecionado, dataSelecionada]);

  const handleFormaPagamentoSelecionada = (forma: string) => {
    setFormaPagamentoSelecionada(forma);

    // Mapeie os preços dos serviços selecionados
    const precosServicos: { [key: string]: number } = {
      barba: 10,
      cabelo: 30,
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
  };

  const calcularResumoFinanceiro = (userId: string) => {
    axios
      .get(`http://localhost:3001/agendamentos/usuario/${userId}`)
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
    const userId = localStorage.getItem("userId");
    if (userId) {
      calcularResumoFinanceiro(userId);
    } else {
      console.error("ID do usuário não encontrado no localStorage.");
    }
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>Olá, {nomeUsuario}</h1>
      <button onClick={handleSolicitarAgendamento}>Solicitar aaaaaaaaaa</button>
      <button onClick={handleMostrarAgendamentos}>Agendamentos</button>
      <button onClick={handleMostrarResumoFinanceiro}>Resumo Financeiro</button>
      {mostrarAgendamentos && (
        <div>
          <h2>Agendamentos</h2>
          <AgendamentoContainer>
            {agendamentos.map((agendamento) => (
              <AgendamentoBox key={agendamento.id}>
                <p>Barbeiro: {agendamento.barbeiro}</p>
                <p>Data/Hora: {agendamento.data}</p>
                <p>Valor Total: R$ {agendamento.valor}</p>
                <p>Status: {agendamento.status}</p>
              </AgendamentoBox>
            ))}
          </AgendamentoContainer>
        </div>
      )}
      {barbeirosData.length > 0 && (
        <div>
          <h2>Barbeiros</h2>
          <ul style={{ listStyle: "none", display: "flex" }}>
            {barbeirosData.map((barbeiro) => (
              <li
                key={barbeiro.idbarbeiro}
                style={{ marginRight: "20px", cursor: "pointer" }}
              >
                <div
                  className="barbeiro-foto"
                  style={{
                    border:
                      barbeiroIdSelecionado === barbeiro.idbarbeiro
                        ? "2px solid gold"
                        : "2px solid black",
                    width: "100px",
                    height: "100px",
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
                <p>{barbeiro.nome}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {barbeiroIdSelecionado !== null && (
        <div>
          <h2>Serviços</h2>
          <label>
            <input
              type="checkbox"
              value="barba"
              checked={servicosSelecionados.includes("barba")}
              onChange={() => handleServicoSelecionado("barba")}
            />
            Barba
          </label>
          <label>
            <input
              type="checkbox"
              value="cabelo"
              checked={servicosSelecionados.includes("cabelo")}
              onChange={() => handleServicoSelecionado("cabelo")}
            />
            Cabelo
          </label>
          <label>
            <input
              type="checkbox"
              value="sobrancelha"
              checked={servicosSelecionados.includes("sobrancelha")}
              onChange={() => handleServicoSelecionado("sobrancelha")}
            />
            Sobrancelha
          </label>
        </div>
      )}
      {servicosSelecionados.length > 0 && (
        <div>
          <h2>Selecione a Data e Hora</h2>
          <DatePicker
            selected={dataSelecionada}
            onChange={(date) => setDataSelecionada(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Hora"
            dateFormat="dd/MM/yyyy HH:mm"
            placeholderText="Selecione a data e hora"
          />
        </div>
      )}
      {dataSelecionada !== null && (
        <div>
          <h2>Forma de Pagamento</h2>
          <label>
            <input
              type="radio"
              value="cartao"
              checked={formaPagamento === "cartao"}
              onChange={() => handleFormaPagamentoSelecionada("cartao")}
            />
            Cartão de Crédito/Débito
          </label>
          <label>
            <input
              type="radio"
              value="pix"
              checked={formaPagamento === "pix"}
              onChange={() => handleFormaPagamentoSelecionada("pix")}
            />
            PIX
          </label>
          <label>
            <input
              type="radio"
              value="dinheiro"
              checked={formaPagamento === "dinheiro"}
              onChange={() => handleFormaPagamentoSelecionada("dinheiro")}
            />
            Dinheiro
          </label>
        </div>
      )}
      {formaPagamentoSelecionada && (
        <div>
          <h2>Resumo do Agendamento</h2>
          <p>Cliente: {nomeUsuario}</p>
          <p>Barbeiro: {nomeBarbeiroSelecionado}</p>
          <p>Serviços: {servicosSelecionados.join(", ")}</p>
          <p>Data/Hora Início: {horarioInicio?.toLocaleString()}</p>
          <p>Data/Hora Término: {horarioFinal?.toLocaleString()}</p>
          <p>Forma de Pagamento: {formaPagamentoSelecionada}</p>
          <p>Valor Total: R$ {valorTotal.toFixed(2)}</p>
          <button onClick={handleSalvarAgendamento}>Salvar Agendamento</button>
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

export default AdministradorPage;
