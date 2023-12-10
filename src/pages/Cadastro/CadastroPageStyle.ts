import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";

export const RegistrationPageWrapper = styled.div`
  background-color: ${colorsVariables.whiteBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const RegistrationForm = styled.form`
  display: flex;
  align-items: center;
  text-align: center;
  box-shadow: 0 0 10px ${colorsVariables.boxShadow};
`;

export const RegistrationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

export const RegistrationTitle = styled.h2`
  margin-bottom: 30px;
  margin-left: 50px;
`;

export const RegistrationImage = styled.img`
  width: 150px;
  margin-right: 60px;
  margin-bottom: 70px;
  border-radius: 50%;
`;

export const RegistrationInput = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${colorsVariables.goldDark};
  border-radius: 3px;
`;

export const RegistrationButton = styled.button`
  margin: 20px 0;
  margin-left: 50px;
  padding: 10px;
  background-color: ${colorsVariables.goldMedium};
  color: ${colorsVariables.white};
  border: none;
  border-radius: 3px;
  cursor: pointer;
`;
