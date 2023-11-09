import styled from "styled-components";
import { colorsVariables } from "../../style/VariablesStyle";
import Slider from "react-slick";

export const BarbersRoot = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 18px;
  background-color: ${colorsVariables.lightGrey};
`;

export const EquipeLaCasa = styled.h1`
  margin-top: 20px;
  color: ${colorsVariables.gold};
`;

export const PhotosContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 60px;
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
  font-size: 25px;
`;

export const Modal = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 10%;
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalCloseButton = styled.button`
  color: ${colorsVariables.goldDark};
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 130px;
  right: 120px;
  font-size: 16px;
  background-color: ${colorsVariables.white};
  z-index: 2;
`;

export const ModalContent = styled.div`
  background-color: ${colorsVariables.white};
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px ${colorsVariables.boxShadow};
  text-align: center;
  max-width: 80%;
  margin: 0 auto;
  border: 5px solid ${colorsVariables.goldDark};
`;

export const PhotoModal = styled.img`
  margin-top: -70px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid ${colorsVariables.goldDark};
`;

export const BarberNameModal = styled.p`
  color: ${colorsVariables.gold};
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 15px;
`;

export const SobreModal = styled.p`
  color: ${colorsVariables.goldDark};
  font-size: 22px;
  text-align: center;
`;

export const PhotoCarrousselDiv = styled.div`
  margin: 15px;
`;

export const PhotoCarroussel = styled.img`
  margin-top: 20px;
  width: 250px;
  height: 150px;
  display: inline !important;
`;

export const CustomSlider = styled(Slider)`
  .slick-slide img {
    display: inline;
  }
`;
