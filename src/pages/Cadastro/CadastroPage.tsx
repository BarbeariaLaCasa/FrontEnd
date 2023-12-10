import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logoBarbearia.jpg";
import {
  RegistrationButton,
  RegistrationContent,
  RegistrationForm,
  RegistrationImage,
  RegistrationInput,
  RegistrationPageWrapper,
  RegistrationTitle,
} from "./CadastroPageStyle";

const RegisterPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [senhaErro, setSenhaErro] = useState("");
  const [registroSucesso, setRegistroSucesso] = useState(false);
  const navigate = useNavigate();

  const isEmailValid = (email: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password: string) => {
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setSenhaErro("");

    if (!isEmailValid(email)) {
      window.alert("Por favor, insira um endereço de e-mail válido.");
      return;
    }

    if (!isPasswordValid(senha)) {
      setSenhaErro(
        "A senha deve conter pelo menos 8 caracteres, letras maiúsculas, minúsculas e números."
      );
      return;
    }

    if (senha !== senhaConfirmacao) {
      setSenhaErro("A senha e a confirmação de senha não coincidem.");
      return;
    }

    const userData = {
      nome,
      email,
      telefone,
      senha,
      tipo_acesso: "cliente",
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/usuarios",
        userData
      );

      if (response.status === 201) {
        setRegistroSucesso(true);
        navigate("/login", { replace: true });
      } else {
        console.error("Erro ao cadastrar o usuário.");
        window.alert(
          "Erro ao cadastrar o usuário. Por favor, tente novamente."
        );
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
      window.alert("Erro ao cadastrar o usuário. Por favor, tente novamente.");
    }
  };

  return (
    <RegistrationPageWrapper>
      <RegistrationForm>
        <Link to="/">
          <RegistrationImage src={logo} alt="Imagem de Cadastro" />
        </Link>
        <RegistrationContent>
          <RegistrationTitle>Cadastro</RegistrationTitle>
          {registroSucesso ? (
            <p style={{ color: "green" }}>Registro bem-sucedido!</p>
          ) : (
            <>
              <RegistrationInput
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <RegistrationInput
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <RegistrationInput
                type="tel"
                placeholder="Telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <RegistrationInput
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <RegistrationInput
                type="password"
                placeholder="Confirmar Senha"
                value={senhaConfirmacao}
                onChange={(e) => setSenhaConfirmacao(e.target.value)}
              />
              {senhaErro && <p style={{ color: "red" }}>{senhaErro}</p>}
              <RegistrationButton onClick={handleSubmit}>
                Registrar
              </RegistrationButton>
            </>
          )}
        </RegistrationContent>
      </RegistrationForm>
    </RegistrationPageWrapper>
  );
};

export default RegisterPage;
