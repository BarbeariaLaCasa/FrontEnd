import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";
import logo from "../../assets/images/logoBarbearia.jpg";

export const AboutSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  background-color: ${colorsVariables.whiteBackground};
  justify-content: space-evenly;
  align-items: center;

  img {
    background-image: url(${logo});
    opacity: 0.5;
  }
`;

export const TextAbout = styled.div`
  height: 560px;
  margin-top: 54px;
  p {
    color: ${colorsVariables.black};
    text-align: center;
    font-size: 18px;
    font-weight: lighter;
    line-height: 1.5;
    letter-spacing: 2px;
    margin: 40px 10em;
  }
  h1 {
    font-size: 25px;
    font-weight: bold;
    margin: inherit;
    text-align: center;
  }
`;
