import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";

export const LoginPageWrapper = styled.div`
  background-color: ${colorsVariables.whiteBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 10px ${colorsVariables.boxShadow};
`;

export const LoginTitle = styled.h2`
  margin-bottom: 30px;
  margin-left: 20%;
`;

export const LoginImage = styled.img`
  width: 150px;
  margin-right: 20px;
  margin-bottom: 70px;
  border-radius: 50%;
`;

export const LoginInput = styled.input`
  margin: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${colorsVariables.goldDark};
  border-radius: 3px;
`;

export const LoginButton = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: ${colorsVariables.goldMedium};
  color: ${colorsVariables.white};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;

export const SignUpLink = styled.p`
  margin-top: 10px;
`;

export const linkStyle = styled.link`
  color: ${colorsVariables.goldMedium};
`;
