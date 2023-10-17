import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";

export const ServicesContainer = styled.div`
  background-color: ${colorsVariables.whiteBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ServicesTitle = styled.h1`
  margin-top: 50px;
  margin-bottom: 30px;
  font-size: 30px;
`;

export const ServicesColumns = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ServiceColumn = styled.div`
  flex: 1;
  margin-top: 30px;

  h2 {
    font-size: 25px;
  }

  p {
    font-size: 20px;
    padding: 30px;
  }
`;
