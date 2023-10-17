import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";

export const CabecalhoChild = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  background: ${colorsVariables.degrade};
  width: 100%;
  height: 4.5em;
`;

export const Logo = styled.img`
  position: inherit;
  width: 5%;
  border-radius: 50%;
`;
export const Login = styled.b`
  position: absolute;
  top: 100%;
  right: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 14px;
  font-size: 1em;
  color: ${colorsVariables.goldMedium};
`;
export const CabecalhoRoot = styled.div`
  position: relative;
  width: 100%;
  height: 29px;
  text-align: center;
`;
