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
  BotaoCancelarEdicao,
  BotaoEditarServico,
  BotaoExcluirBarbeiroAdministrador,
  BotaoSalvarEdicao,
  Botoes,
  DivAdministrador,
  DivBotaoEdicao,
  DivBotaoServico,
  DivBotoes,
  DivEdicao,
  DivEquipeAdministrador,
  DivFooterAdministrador,
  DivFormulario,
  DivResumoFinanceiroAdministrador,
  DivServicos,
  DivServicosExibicao,
  H2BarbeirosAdministrador,
  H2ResumoFinanceiroAdministrador,
  H2Servicos,
  ImgBarbeiroAdministrador,
  InputAdicaoBarbeiro,
  InputEdicao,
  LabelAdicaoBarbeiro,
  LiBarbeirosAdministrador,
  LiServicos,
  NomeAdministrador,
  NomeBarbeiroAdministrador,
  THeadResumoAdministrador,
  TabelaResumoAdministrador,
  TdResumoAdministrador,
  TextAreaAdicaoBarbeiro,
  TextConteudoServico,
  TextServicoNome,
  TexteEdicao,
  ThResumoAdministrador,
  TrResumoAdministrador,
  UlBarbeirosAdministrador,
  UlServicos,
} from "./AdministradorPageStyle";
import Footer from "../../containers/Footer/Footer";

const AdministradorPage = () => {
  const [nomeAdministrador, setNomeAdministrador] = useState("");
  const [barbeirosData, setBarbeirosData] = useState<any[]>([]);
  const [barbeiroIdSelecionado, setBarbeiroIdSelecionado] = useState<
    number | null
  >(null);
  const [servicoEmEdicao, setServicoEmEdicao] = useState<number | null>(null);
  const [novoValor, setNovoValor] = useState<string>("");
  const [novaDuracao, setNovaDuracao] = useState<string>("");

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
  const [resumoFinanceiro, setResumoFinanceiro] = useState<any[]>([]);
  const [barbeiroNomes, setBarbeiroNomes] = useState({});

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
      .get("http://localhost:3001/servicos") // Rota para buscar serviços
      .then((response) => {
        setServicosData(response.data); // Define os serviços no estado
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados dos serviços:", error);
      });
  };

  const handleEditarServico = (servicoId: number) => {
    setServicoEmEdicao(servicoId);
    // Preencha os estados de valor e duração com os valores existentes
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
    }
  };

  const handleCancelarEdicao = () => {
    setServicoEmEdicao(null);
    setNovoValor("");
    setNovaDuracao("");
  };

  const handleSalvarEdicao = () => {
    if (servicoEmEdicao) {
      axios
        .put(`http://localhost:3001/servicos/${servicoEmEdicao}`, {
          valor: novoValor,
          duração: novaDuracao,
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
  };

  const handleResumoClick = () => {
    axios
      .get("http://localhost:3001/resumo-financeiro")
      .then((response) => {
        setResumoFinanceiro(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar o resumo financeiro:", error);
      });
  };

  return (
    <DivAdministrador>
      <Header></Header>
      <NomeAdministrador>Olá, {nomeAdministrador}</NomeAdministrador>
      <DivBotoes>
        <Botoes onClick={handleEquipeClick}>Equipe</Botoes>
        <Botoes onClick={handleServicosClick}>Serviços</Botoes>
        <Botoes onClick={handleResumoClick}>Resumo financeiro</Botoes>
      </DivBotoes>
      {servicosData.length > 0 && (
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
                    <TextServicoNome>{servico.nome} - </TextServicoNome>{" "}
                    <TextConteudoServico>
                      Valor: R$ {servico.valor}, Duração:{" "}
                      {servico.duração && servico.duração
                        ? servico.duração + " min"
                        : "Não especificada"}
                    </TextConteudoServico>
                    <DivBotaoServico>
                      <BotaoEditarServico
                        onClick={() => handleEditarServico(servico.idserviço)}
                      >
                        Editar
                      </BotaoEditarServico>
                    </DivBotaoServico>
                  </DivServicosExibicao>
                )}
              </LiServicos>
            ))}
          </UlServicos>
        </DivServicos>
      )}

      {barbeirosData.length > 0 && (
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
        </DivEquipeAdministrador>
      )}
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
                setNovoBarbeiro({ ...novoBarbeiro, fotoperfil: e.target.value })
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
                setNovoBarbeiro({ ...novoBarbeiro, telefone: e.target.value })
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
            <LabelAdicaoBarbeiro>Fotos de Trabalhos (URL):</LabelAdicaoBarbeiro>
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
      {resumoFinanceiro.length > 0 && (
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
      <DivFooterAdministrador>
        <Footer></Footer>
      </DivFooterAdministrador>
    </DivAdministrador>
  );
};

export default AdministradorPage;
