import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../containers/Header/Header";
import {
  BotaoAdicionarBarbeiroAdministrador,
  BotaoAdicionarFotoBarbeiro,
  BotaoAdicionarNovoBarbeiro,
  BotaoCancelarDescricao,
  BotaoCancelarEdicao,
  BotaoCancelarNovoServico,
  BotaoCancelarTitulo,
  BotaoEditarDescricao,
  BotaoEditarServico,
  BotaoEditarTitulo,
  BotaoExcluirBarbeiroAdministrador,
  BotaoExcluirServico,
  BotaoNovoServico,
  BotaoSalvarDescricao,
  BotaoSalvarEdicao,
  BotaoSalvarNovoServico,
  BotaoSalvarTitulo,
  Botoes,
  DivAdministrador,
  DivBotaoEdicao,
  DivBotaoNovoServico,
  DivBotaoServico,
  DivBotoes,
  DivEdicao,
  DivEquipeAdministrador,
  DivFooterAdministrador,
  DivFormulario,
  DivNovoServico,
  DivPaginaInicial,
  DivResumoFinanceiroAdministrador,
  DivServicos,
  DivServicosExibicao,
  DivTextosPaginaInicial,
  FormNovoServico,
  H2BarbeirosAdministrador,
  H2ResumoFinanceiroAdministrador,
  H2Servicos,
  ImgBarbeiroAdministrador,
  InputAdicaoBarbeiro,
  InputEdicao,
  InputNovoServico,
  LabelAdicaoBarbeiro,
  LabelNovoServico,
  LiBarbeirosAdministrador,
  LiServicos,
  NomeAdministrador,
  NomeBarbeiroAdministrador,
  THeadResumoAdministrador,
  TabelaResumoAdministrador,
  TdResumoAdministrador,
  TextAreaAdicaoBarbeiro,
  TextAreaEdicao,
  TextAreaNovoServico,
  TextConteudoServico,
  TextServicoNome,
  TexteEdicao,
  ThResumoAdministrador,
  TrResumoAdministrador,
  UlBarbeirosAdministrador,
  UlServicos,
} from "./AdministradorPageStyle";
import Footer from "../../containers/Footer/Footer";
import { BotaoSalvarAgendamento } from "../User/UserPageStyle";

const AdministradorPage = () => {
  const [nomeAdministrador, setNomeAdministrador] = useState("");
  const [barbeirosData, setBarbeirosData] = useState<any[]>([]);
  const [barbeiroIdSelecionado, setBarbeiroIdSelecionado] = useState<
    number | null
  >(null);
  const [tituloInicial, setTituloInicial] = useState<string>("");
  const [descricaoInicial, setDescricaoInicial] = useState<string>("");
  const [modoEdicaoTitulo, setModoEdicaoTitulo] = useState(false);
  const [modoEdicaoDescricao, setModoEdicaoDescricao] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(tituloInicial);
  const [novaDescricao, setNovaDescricao] = useState(descricaoInicial);

  const [servicoEmEdicao, setServicoEmEdicao] = useState<number | null>(null);
  const [novoValor, setNovoValor] = useState<string>("");
  const [novaDuracao, setNovaDuracao] = useState<string>("");
  const [novaDescricaoServico, setNovaDescricaoServico] = useState<string>("");

  const [exibirFormulario, setExibirFormulario] = useState(false);
  const [novoBarbeiro, setNovoBarbeiro] = useState({
    nome: "",
    fotoperfil: "",
    email: "",
    telefone: "",
    senha: "",
    sobre: "",
    fotos_trabalhos: [""],
  });
  const [servicosData, setServicosData] = useState<any[]>([]);
  const [exibirFormularioServico, setExibirFormularioServico] = useState(false);
  const [novoNomeServico, setNovoNomeServico] = useState("");
  const [novoValorServico, setNovoValorServico] = useState("");
  const [novaDuracaoServico, setNovaDuracaoServico] = useState("");
  const [novaDescricaoAdicaoServico, setNovaDescricaoAdicaoServico] =
    useState("");

  const [resumoFinanceiro, setResumoFinanceiro] = useState<any[]>([]);
  const [barbeiroNomes, setBarbeiroNomes] = useState({});
  const [secaoAtiva, setSecaoAtiva] = useState("equipe");

  useEffect(() => {
    const administradorId = localStorage.getItem("administradorId");

    if (administradorId) {
      axios
        .get(`http://localhost:3001/administradores/${administradorId}`)
        .then((response) => {
          const nomeDoAdministrador = response.data.nome;
          const nomeCapitalizado =
            nomeDoAdministrador.charAt(0).toUpperCase() +
            nomeDoAdministrador.slice(1);
          setNomeAdministrador(nomeCapitalizado);
        })
        .catch((error) => {
          console.error("Erro ao buscar o nome do administrador:", error);
        });
    }
  }, []);

  const handleEquipeClick = () => {
    axios
      .get("http://localhost:3001/barbeiros")
      .then((response) => {
        const barbeiros = response.data.map((barbeiro: any) => ({
          ...barbeiro,
          selecionado: true,
        }));
        setBarbeirosData(barbeiros);
        setSecaoAtiva("equipe");
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados dos barbeiros:", error);
      });
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
      } else {
        setBarbeiroIdSelecionado(null);
      }
    }
  };

  const exibirFormularioAdicao = () => {
    setExibirFormulario(true);
  };

  const adicionarCampoFotosTrabalhos = () => {
    const novasFotosTrabalhos = [...novoBarbeiro.fotos_trabalhos];
    novasFotosTrabalhos.push("");
    setNovoBarbeiro({ ...novoBarbeiro, fotos_trabalhos: novasFotosTrabalhos });
  };

  const handleFotosTrabalhosChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const novasFotosTrabalhos = [...novoBarbeiro.fotos_trabalhos];
    novasFotosTrabalhos[index] = event.target.value;
    setNovoBarbeiro({ ...novoBarbeiro, fotos_trabalhos: novasFotosTrabalhos });
  };

  const enviarFormulario = () => {
    axios
      .post("http://localhost:3001/adicionar-barbeiro", novoBarbeiro)
      .then((response) => {
        toast.success("Barbeiro adicionado com sucesso!");
        setNovoBarbeiro({
          nome: "",
          fotoperfil: "",
          email: "",
          telefone: "",
          senha: "",
          sobre: "",
          fotos_trabalhos: [""],
        });
      })
      .catch((error) => {
        console.error("Erro ao adicionar barbeiro:", error);
        toast.error("Erro ao adicionar barbeiro.");
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    enviarFormulario();
  };

  const handleExcluirBarbeiro = (barbeiroId: number) => {
    if (window.confirm("Tem certeza de que deseja excluir este barbeiro?")) {
      axios
        .delete(`http://localhost:3001/barbeiros/${barbeiroId}`)
        .then((response) => {
          toast.success("Barbeiro excluído com sucesso!");
          // Atualize a lista de barbeiros após a exclusão
          const barbeirosAtualizados = barbeirosData.filter(
            (barbeiro) => barbeiro.idbarbeiro !== barbeiroId
          );
          setBarbeirosData(barbeirosAtualizados);
          setBarbeiroIdSelecionado(null);
        })
        .catch((error) => {
          console.error("Erro ao excluir barbeiro:", error);
          toast.error("Erro ao excluir barbeiro.");
        });
    }
  };

  const handleServicosClick = () => {
    axios
      .get("http://localhost:3001/servicos")
      .then((response) => {
        setServicosData(response.data);
        setSecaoAtiva("servicos");
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados dos serviços:", error);
      });
  };

  const converterParaMinutos = (duracao: {
    split: (arg0: string) => [any, any, any];
  }) => {
    const [horas, minutos, segundos] = duracao.split(":");
    return parseInt(horas, 10) * 60 + parseInt(minutos, 10);
  };

  const handleEditarServico = (servicoId: number) => {
    setServicoEmEdicao(servicoId);
    const servicoSelecionado = servicosData.find(
      (servico) => servico.idserviço === servicoId
    );
    if (servicoSelecionado) {
      setNovoValor(servicoSelecionado.valor);
      setNovaDuracao(
        (servicoSelecionado.duração &&
          servicoSelecionado.duração.minutes.toString()) ||
          ""
      );
      setNovaDescricaoServico(servicoSelecionado.descricaoservico);
    }
  };

  const handleCancelarEdicao = () => {
    setServicoEmEdicao(null);
    setNovoValor("");
    setNovaDuracao("");
    setNovaDescricaoServico("");
  };

  const handleSalvarEdicao = () => {
    if (servicoEmEdicao) {
      axios
        .put(`http://localhost:3001/servicos/${servicoEmEdicao}`, {
          valor: novoValor,
          duração: novaDuracao,
          descricaoservico: novaDescricaoServico,
        })
        .then((response) => {
          toast.success("Serviço atualizado com sucesso!");

          handleServicosClick();
        })
        .catch((error) => {
          console.error("Erro ao atualizar serviço:", error);
          toast.error("Erro ao atualizar serviço.");
        });
    }
    setServicoEmEdicao(null);
    setNovoValor("");
    setNovaDuracao("");
    setNovaDescricaoServico("");
  };

  const handleResumoClick = () => {
    axios
      .get("http://localhost:3001/resumo-financeiro")
      .then((response) => {
        setResumoFinanceiro(response.data);
        setSecaoAtiva("resumo");
      })
      .catch((error) => {
        console.error("Erro ao buscar o resumo financeiro:", error);
      });
  };

  const handlePaginaInicialClick = () => {
    axios
      .get("http://localhost:3001/buscar-titulo-inicial")
      .then((responseTitulo) => {
        const fetchedTituloInicial = responseTitulo.data.tituloInicial || "";
        setTituloInicial(fetchedTituloInicial);
      })
      .catch((errorTitulo) => {
        console.error("Erro ao buscar o título inicial:", errorTitulo);
      });

    axios
      .get("http://localhost:3001/buscar-descricao-inicial")
      .then((responseDescricao) => {
        const fetchedDescricaoInicial = responseDescricao.data.descricao || "";
        setDescricaoInicial(fetchedDescricaoInicial);
      })
      .catch((errorDescricao) => {
        console.error("Erro ao buscar a descrição inicial:", errorDescricao);
      });

    setSecaoAtiva("pagina-inicial");
  };

  const handleEditarTitulo = () => {
    setModoEdicaoTitulo(true);
  };

  const handleCancelarEdicaoTitulo = () => {
    setModoEdicaoTitulo(false);
    setNovoTitulo(tituloInicial);
  };

  const handleSalvarEdicaoTitulo = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/editar-titulo-inicial",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ novoTitulo }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao editar título inicial: ${response.status}`);
      }

      setModoEdicaoTitulo(false);
      setTituloInicial(novoTitulo);
      toast.success("Título inicial editado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar edição de título inicial:", error);
      toast.error("Erro ao salvar edição de título inicial.");
    }
  };

  const handleEditarDescricao = () => {
    setModoEdicaoDescricao(true);
  };

  const handleCancelarEdicaoDescricao = () => {
    setModoEdicaoDescricao(false);
    setNovaDescricao(descricaoInicial);
  };

  const handleSalvarEdicaoDescricao = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/editar-descricao-inicial",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ novaDescricao }),
        }
      );

      if (!response.ok) {
        throw new Error(`Erro ao editar descrição inicial: ${response.status}`);
      }

      setModoEdicaoDescricao(false);
      setDescricaoInicial(novaDescricao);
      toast.success("Descrição inicial editada com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar edição de descrição inicial:", error);
      toast.error("Erro ao salvar edição de descrição inicial.");
    }
  };

  const handleNovoServicoClick = () => {
    setExibirFormularioServico(true);
    setServicoEmEdicao(null);
    setNovoValor("");
    setNovaDuracao("");
    setNovaDescricaoServico("");
  };

  const handleAdicionarServico = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/adicionar-servico", {
        nome: novoNomeServico,
        valor: novoValorServico,
        duracao: novaDuracaoServico,
        descricaoServico: novaDescricaoAdicaoServico,
      })
      .then((response) => {
        setExibirFormularioServico(false);
        handleServicosClick();
      })
      .catch((error) => {
        console.error("Erro ao adicionar serviço:", error);
      });
  };

  const handleExcluirServico = async (servicoId: number) => {
    if (window.confirm("Tem certeza de que deseja excluir este serviço?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/excluir-servico/${servicoId}`
        );
        if (response.status === 200) {
          toast.success("Serviço excluído com sucesso!");
          handleServicosClick();
        } else {
          toast.error("Erro ao excluir serviço.");
        }
      } catch (error) {
        console.error("Erro ao excluir serviço:", error);
        toast.error("Erro ao excluir serviço.");
      }
    }
  };

  return (
    <DivAdministrador>
      <Header></Header>
      <NomeAdministrador>Olá, {nomeAdministrador}</NomeAdministrador>
      <DivBotoes>
        <Botoes onClick={handleEquipeClick}>Equipe</Botoes>
        <Botoes onClick={handleServicosClick}>Serviços</Botoes>
        <Botoes onClick={handlePaginaInicialClick}>Página Inicial</Botoes>
        <Botoes onClick={handleResumoClick}>Resumo financeiro</Botoes>
      </DivBotoes>
      {secaoAtiva === "servicos" && servicosData.length > 0 && (
        <DivServicos>
          <H2Servicos>Serviços</H2Servicos>
          <UlServicos>
            {servicosData.map((servico) => (
              <LiServicos key={servico.idserviço}>
                {servicoEmEdicao === servico.idserviço ? (
                  <DivEdicao>
                    <TexteEdicao>Novo Valor:</TexteEdicao>
                    <InputEdicao
                      type="text"
                      value={novoValor}
                      onChange={(e) => setNovoValor(e.target.value)}
                    />
                    <TexteEdicao>Nova Duração:</TexteEdicao>
                    <InputEdicao
                      type="text"
                      value={novaDuracao}
                      onChange={(e) => setNovaDuracao(e.target.value)}
                    />
                    <TexteEdicao>Nova Descrição:</TexteEdicao>
                    <InputEdicao
                      type="text"
                      value={novaDescricaoServico}
                      onChange={(e) => setNovaDescricaoServico(e.target.value)}
                    />
                    <DivBotaoEdicao>
                      <BotaoCancelarEdicao onClick={handleCancelarEdicao}>
                        Cancelar
                      </BotaoCancelarEdicao>
                      <BotaoSalvarEdicao onClick={handleSalvarEdicao}>
                        Salvar
                      </BotaoSalvarEdicao>
                    </DivBotaoEdicao>
                  </DivEdicao>
                ) : (
                  <DivServicosExibicao>
                    <TextServicoNome>{servico.nome}</TextServicoNome>{" "}
                    <TextConteudoServico>
                      <p>
                        <strong>Valor</strong>: R$ {servico.valor}
                      </p>
                      <p>
                        <strong>Duração:</strong>:{" "}
                        {servico.duração
                          ? `${converterParaMinutos(servico.duração)} min`
                          : "Não especificada"}
                      </p>
                      <p>
                        <strong>Descrição</strong>: {servico.descricaoservico}
                      </p>
                    </TextConteudoServico>
                    <DivBotaoServico>
                      <BotaoEditarServico
                        onClick={() => handleEditarServico(servico.idserviço)}
                      >
                        Editar
                      </BotaoEditarServico>
                      <BotaoExcluirServico
                        onClick={() => handleExcluirServico(servico.idserviço)}
                      >
                        Excluir
                      </BotaoExcluirServico>
                    </DivBotaoServico>
                  </DivServicosExibicao>
                )}
              </LiServicos>
            ))}
          </UlServicos>
          <BotaoNovoServico onClick={handleNovoServicoClick}>
            Novo Serviço
          </BotaoNovoServico>
          {exibirFormularioServico && (
            <DivNovoServico>
              <FormNovoServico onSubmit={handleAdicionarServico}>
                <LabelNovoServico>Nome do Serviço:</LabelNovoServico>
                <InputNovoServico
                  type="text"
                  value={novoNomeServico}
                  onChange={(e) => setNovoNomeServico(e.target.value)}
                />

                <LabelNovoServico>Valor:</LabelNovoServico>
                <InputNovoServico
                  type="text"
                  value={novoValorServico}
                  onChange={(e) => setNovoValorServico(e.target.value)}
                />

                <LabelNovoServico>Duração:</LabelNovoServico>
                <InputNovoServico
                  type="text"
                  value={novaDuracaoServico}
                  onChange={(e) => setNovaDuracaoServico(e.target.value)}
                />

                <LabelNovoServico>Descrição do Serviço:</LabelNovoServico>
                <TextAreaNovoServico
                  value={novaDescricaoAdicaoServico}
                  onChange={(e) =>
                    setNovaDescricaoAdicaoServico(e.target.value)
                  }
                />
                <DivBotaoNovoServico>
                  <BotaoSalvarNovoServico type="submit">
                    Salvar
                  </BotaoSalvarNovoServico>
                  <BotaoCancelarNovoServico
                    type="button"
                    onClick={() => setExibirFormularioServico(false)}
                  >
                    Cancelar
                  </BotaoCancelarNovoServico>
                </DivBotaoNovoServico>
              </FormNovoServico>
            </DivNovoServico>
          )}
        </DivServicos>
      )}

      {secaoAtiva === "equipe" && barbeirosData.length > 0 && (
        <DivEquipeAdministrador>
          <H2BarbeirosAdministrador>Barbeiros</H2BarbeirosAdministrador>
          <UlBarbeirosAdministrador>
            {barbeirosData.map((barbeiro) => (
              <LiBarbeirosAdministrador key={barbeiro.idbarbeiro}>
                <div
                  className="barbeiro-foto"
                  style={{
                    border:
                      barbeiroIdSelecionado === barbeiro.idbarbeiro
                        ? "3px solid #A66F0A"
                        : "3px solid #A66F0A",
                    width: "100px",
                    margin: "5px",
                    height: "100px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                  onClick={() =>
                    handleSelecionarBarbeiro(barbeiro.idbarbeiro, barbeiro.nome)
                  }
                >
                  <ImgBarbeiroAdministrador
                    src={barbeiro.fotoperfil}
                    alt={`Foto de ${barbeiro.nome}`}
                  />
                </div>
                <NomeBarbeiroAdministrador>
                  {barbeiro.nome}
                </NomeBarbeiroAdministrador>
                <BotaoExcluirBarbeiroAdministrador
                  onClick={() => handleExcluirBarbeiro(barbeiro.idbarbeiro)}
                >
                  Excluir
                </BotaoExcluirBarbeiroAdministrador>
              </LiBarbeirosAdministrador>
            ))}
          </UlBarbeirosAdministrador>
          <BotaoAdicionarBarbeiroAdministrador onClick={exibirFormularioAdicao}>
            Novo Barbeiro
          </BotaoAdicionarBarbeiroAdministrador>
          {exibirFormulario && (
            <DivFormulario>
              <form onSubmit={handleSubmit}>
                <LabelAdicaoBarbeiro>Nome:</LabelAdicaoBarbeiro>
                <InputAdicaoBarbeiro
                  type="text"
                  value={novoBarbeiro.nome}
                  onChange={(e) =>
                    setNovoBarbeiro({ ...novoBarbeiro, nome: e.target.value })
                  }
                />
                <br />
                <LabelAdicaoBarbeiro>Foto de Perfil (URL):</LabelAdicaoBarbeiro>
                <InputAdicaoBarbeiro
                  type="text"
                  value={novoBarbeiro.fotoperfil}
                  onChange={(e) =>
                    setNovoBarbeiro({
                      ...novoBarbeiro,
                      fotoperfil: e.target.value,
                    })
                  }
                />
                <br />
                <LabelAdicaoBarbeiro>Email:</LabelAdicaoBarbeiro>
                <InputAdicaoBarbeiro
                  type="text"
                  value={novoBarbeiro.email}
                  onChange={(e) =>
                    setNovoBarbeiro({ ...novoBarbeiro, email: e.target.value })
                  }
                />
                <br />
                <LabelAdicaoBarbeiro>Telefone:</LabelAdicaoBarbeiro>
                <InputAdicaoBarbeiro
                  type="text"
                  value={novoBarbeiro.telefone}
                  onChange={(e) =>
                    setNovoBarbeiro({
                      ...novoBarbeiro,
                      telefone: e.target.value,
                    })
                  }
                />
                <br />
                <LabelAdicaoBarbeiro>Senha:</LabelAdicaoBarbeiro>
                <InputAdicaoBarbeiro
                  type="password"
                  value={novoBarbeiro.senha}
                  onChange={(e) =>
                    setNovoBarbeiro({ ...novoBarbeiro, senha: e.target.value })
                  }
                />
                <br />
                <LabelAdicaoBarbeiro>Sobre:</LabelAdicaoBarbeiro>
                <TextAreaAdicaoBarbeiro
                  value={novoBarbeiro.sobre}
                  onChange={(e) =>
                    setNovoBarbeiro({ ...novoBarbeiro, sobre: e.target.value })
                  }
                />
                <br />
                <LabelAdicaoBarbeiro>
                  Fotos de Trabalhos (URL):
                </LabelAdicaoBarbeiro>
                {novoBarbeiro.fotos_trabalhos.map((foto, index) => (
                  <div key={index}>
                    <InputAdicaoBarbeiro
                      type="text"
                      value={foto}
                      onChange={(e) => handleFotosTrabalhosChange(index, e)}
                    />
                  </div>
                ))}
                <BotaoAdicionarFotoBarbeiro
                  type="button"
                  onClick={adicionarCampoFotosTrabalhos}
                >
                  Mais fotos
                </BotaoAdicionarFotoBarbeiro>
                <br />
                <BotaoAdicionarNovoBarbeiro type="submit">
                  Adicionar
                </BotaoAdicionarNovoBarbeiro>
              </form>
            </DivFormulario>
          )}
        </DivEquipeAdministrador>
      )}

      {secaoAtiva === "resumo" && resumoFinanceiro.length > 0 && (
        <DivResumoFinanceiroAdministrador>
          <H2ResumoFinanceiroAdministrador>
            Resumo Financeiro
          </H2ResumoFinanceiroAdministrador>
          <TabelaResumoAdministrador>
            <THeadResumoAdministrador>
              <TrResumoAdministrador>
                <ThResumoAdministrador>Barbeiro</ThResumoAdministrador>
                <ThResumoAdministrador>
                  Total de Agendamentos
                </ThResumoAdministrador>
                <ThResumoAdministrador>Total Pix</ThResumoAdministrador>
                <ThResumoAdministrador>Total Cartão</ThResumoAdministrador>
                <ThResumoAdministrador>Total Dinheiro</ThResumoAdministrador>
                <ThResumoAdministrador>Média de Receita</ThResumoAdministrador>
                <ThResumoAdministrador>Valor Total</ThResumoAdministrador>
              </TrResumoAdministrador>
            </THeadResumoAdministrador>
            <tbody>
              {resumoFinanceiro.map((item) => (
                <tr key={item.barbeiro_id}>
                  <TdResumoAdministrador>
                    {item.nomebarbeiro}
                  </TdResumoAdministrador>
                  <TdResumoAdministrador>
                    {item.totalagendamentos}
                  </TdResumoAdministrador>
                  <TdResumoAdministrador>{item.totalpix}</TdResumoAdministrador>
                  <TdResumoAdministrador>
                    {item.totalcartao}
                  </TdResumoAdministrador>
                  <TdResumoAdministrador>
                    {item.totaldinheiro}
                  </TdResumoAdministrador>
                  <TdResumoAdministrador>
                    R$ {parseFloat(item.mediareceita).toFixed(2)}
                  </TdResumoAdministrador>
                  <TdResumoAdministrador>
                    R$ {parseFloat(item.valortotal).toFixed(2)}
                  </TdResumoAdministrador>
                </tr>
              ))}
            </tbody>
          </TabelaResumoAdministrador>
        </DivResumoFinanceiroAdministrador>
      )}
      {secaoAtiva === "pagina-inicial" && (
        <DivPaginaInicial>
          <DivTextosPaginaInicial>
            {modoEdicaoTitulo ? (
              <>
                <TextAreaEdicao
                  value={novoTitulo}
                  onChange={(e) => setNovoTitulo(e.target.value)}
                />
                <BotaoCancelarTitulo onClick={handleCancelarEdicaoTitulo}>
                  Cancelar
                </BotaoCancelarTitulo>
                <BotaoSalvarTitulo onClick={handleSalvarEdicaoTitulo}>
                  Salvar
                </BotaoSalvarTitulo>
              </>
            ) : (
              <>
                <h2>{tituloInicial}</h2>
                <BotaoEditarTitulo onClick={handleEditarTitulo}>
                  Editar
                </BotaoEditarTitulo>
              </>
            )}
          </DivTextosPaginaInicial>
          <DivTextosPaginaInicial>
            {modoEdicaoDescricao ? (
              <>
                <TextAreaEdicao
                  value={novaDescricao}
                  onChange={(e) => setNovaDescricao(e.target.value)}
                />
                <BotaoCancelarDescricao onClick={handleCancelarEdicaoDescricao}>
                  Cancelar
                </BotaoCancelarDescricao>
                <BotaoSalvarDescricao onClick={handleSalvarEdicaoDescricao}>
                  Salvar
                </BotaoSalvarDescricao>
              </>
            ) : (
              <>
                <p>{descricaoInicial}</p>
                <BotaoEditarDescricao onClick={handleEditarDescricao}>
                  Editar
                </BotaoEditarDescricao>
              </>
            )}
          </DivTextosPaginaInicial>
        </DivPaginaInicial>
      )}

      <DivFooterAdministrador>
        <Footer></Footer>
      </DivFooterAdministrador>
    </DivAdministrador>
  );
};

export default AdministradorPage;
