import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";
import Slider from "react-slick";

export const BarbersRoot = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 18px;
  background-color: ${colorsVariables.black};
`;

export const EquipeLaCasa = styled.h1`
  margin-top: 20px;
  color: ${colorsVariables.gold};
`;

export const PhotosContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 70px;
  margin-top: 50px;
`;

export const PhotoWrapper = styled.div`
  text-align: center;
  margin: 0 -200px;
`;

export const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid ${colorsVariables.goldDark};
`;

export const BarberName = styled.p`
  color: ${colorsVariables.gold};
  font-weight: bold;
`;

// Estilização do modal em geral
export const Modal = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// Resto do código permanece o mesmo

// Estilização do conteúdo do modal
export const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 80%; /* Defina o tamanho máximo do modal */
  margin: 0 auto; /* Centralize o modal na tela */
  overflow: auto; /* Adicione uma barra de rolagem caso o conteúdo seja grande */
`;

export const PhotoCarrousselDiv = styled.div`
  margin: 15px;
`;

export const PhotoCarroussel = styled.img`
  width: 100px;
  height: 100px;
  display: inline !important;
`;

export const CustomSlider = styled(Slider)`
  .slick-slide img {
    display: inline;
  }
`;

// Estilização do botão de fechar do modal
export const ModalCloseButton = styled.button`
  background-color: #e53935;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;

  &:hover {
    background-color: #c62828;
  }
`;
