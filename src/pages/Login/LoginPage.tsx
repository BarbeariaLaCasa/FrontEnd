import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logoBarbearia.jpg";
import {
  LoginButton,
  LoginForm,
  LoginImage,
  LoginInput,
  LoginPageWrapper,
  SignUpLink,
} from "./LoginPageStyle";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const linkStyle = {
    color: "inherit",
    fontWeight: "bold",
  };

  const setAdministrador = async () => {
    try {
      const administradorResponse = await axios.post(
        "http://localhost:3001/administradores/login",
        {
          email: email,
          senha: senha,
        }
      );

      if (administradorResponse.status === 200) {
        localStorage.setItem(
          "administradorId",
          administradorResponse.data.administradorId
        );
        navigate("/administrador");
      } else {
        loginUser();
      }
    } catch (error) {
      console.error("Erro ao fazer login como administrador:", error);
      loginUser();
    }
  };

  const loginUser = async () => {
    try {
      const usuarioResponse = await axios.post(
        "http://localhost:3001/usuarios/login",
        {
          email: email,
          senha: senha,
        }
      );

      if (usuarioResponse.status === 200) {
        localStorage.setItem("userId", usuarioResponse.data.userId);
        navigate("/user");
      }
    } catch (error) {
      console.error("Erro ao fazer login como usuário:", error);
      setBarbeiro();
    }
  };

  const setBarbeiro = async () => {
    try {
      const barbeiroResponse = await axios.post(
        "http://localhost:3001/barbeiros/login",
        {
          email: email,
          senha: senha,
        }
      );

      if (barbeiroResponse.status === 200) {
        localStorage.setItem("barbeiroId", barbeiroResponse.data.barbeiroId);
        navigate("/barbeiro");
      } else {
        setErro("Nenhum usuário encontrado com essas credenciais.");
      }
    } catch (error) {
      console.error("Erro ao fazer login como barbeiro:", error);
      setErro("Erro ao fazer login. Por favor, tente novamente.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdministrador();
  };

  return (
    <LoginPageWrapper>
      <Link to="/">
        <LoginImage src={logo} alt="Logo barbearia" />
      </Link>
      <LoginForm onSubmit={handleLogin}>
        {erro && <p className="erro">{erro}</p>}
        <LoginInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <LoginInput
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <LoginButton type="submit">Acessar</LoginButton>
        <SignUpLink>
          Não é cadastrado?{" "}
          <Link to="/cadastro" style={linkStyle}>
            Cadastre-se aqui
          </Link>
        </SignUpLink>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
