import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdministradorPage = () => {
  const [nomeAdministrador, setNomeAdministrador] = useState("");
  const [barbeirosData, setBarbeirosData] = useState<any[]>([]);
  const [barbeiroIdSelecionado, setBarbeiroIdSelecionado] = useState<
    number | null
  >(null);
  const [nomeBarbeiroSelecionado, setNomeBarbeiroSelecionado] =
    useState<string>("");
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
        setNomeBarbeiroSelecionado(nome);
      } else {
        setBarbeiroIdSelecionado(null);
        setNomeBarbeiroSelecionado("");
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
          setNomeBarbeiroSelecionado("");
        })
        .catch((error) => {
          console.error("Erro ao excluir barbeiro:", error);
          toast.error("Erro ao excluir barbeiro.");
        });
    }
  };

  return (
    <div>
      <h1 style={{ color: "black" }}>Olá, {nomeAdministrador}</h1>
      <button onClick={handleEquipeClick}>Equipe</button>
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
                <button
                  onClick={() => handleExcluirBarbeiro(barbeiro.idbarbeiro)}
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={exibirFormularioAdicao}>Adicionar Barbeiro</button>
      {exibirFormulario && (
        <div>
          <h2>Adicionar Barbeiro</h2>
          <form onSubmit={handleSubmit}>
            <label>Nome:</label>
            <input
              type="text"
              value={novoBarbeiro.nome}
              onChange={(e) =>
                setNovoBarbeiro({ ...novoBarbeiro, nome: e.target.value })
              }
            />
            <br />
            <label>Foto de Perfil (URL):</label>
            <input
              type="text"
              value={novoBarbeiro.fotoperfil}
              onChange={(e) =>
                setNovoBarbeiro({ ...novoBarbeiro, fotoperfil: e.target.value })
              }
            />
            <br />
            <label>Email:</label>
            <input
              type="text"
              value={novoBarbeiro.email}
              onChange={(e) =>
                setNovoBarbeiro({ ...novoBarbeiro, email: e.target.value })
              }
            />
            <br />
            <label>Telefone:</label>
            <input
              type="text"
              value={novoBarbeiro.telefone}
              onChange={(e) =>
                setNovoBarbeiro({ ...novoBarbeiro, telefone: e.target.value })
              }
            />
            <br />
            <label>Senha:</label>
            <input
              type="password"
              value={novoBarbeiro.senha}
              onChange={(e) =>
                setNovoBarbeiro({ ...novoBarbeiro, senha: e.target.value })
              }
            />
            <br />
            <label>Sobre:</label>
            <textarea
              value={novoBarbeiro.sobre}
              onChange={(e) =>
                setNovoBarbeiro({ ...novoBarbeiro, sobre: e.target.value })
              }
            />
            <br />
            <label>Fotos de Trabalhos (URL):</label>
            {novoBarbeiro.fotos_trabalhos.map((foto, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={foto}
                  onChange={(e) => handleFotosTrabalhosChange(index, e)}
                />
              </div>
            ))}
            <button type="button" onClick={adicionarCampoFotosTrabalhos}>
              +
            </button>
            <br />
            <button type="submit">Adicionar Barbeiro</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdministradorPage;
