import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";

export const FooterRoot = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 18px;
  background-color: ${colorsVariables.lightGrey};
  padding: 20px;
`;

export const SocialLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  color: inherit;
`;

export const SocialLinkItem = styled.li`
  margin: 10px 0;

  a {
    color: ${colorsVariables.gold};
    font-weight: bold;
  }
`;

export const Iframe = styled.iframe`
  width: 280px;
  height: 230px;
  margin-left: 10px;
  border: 0;
  margin-top: 20px;
`;
