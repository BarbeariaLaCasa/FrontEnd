import React, { FunctionComponent, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  BarberName,
  BarbersRoot,
  EquipeLaCasa,
  Photo,
  PhotoWrapper,
  PhotosContainer,
  Modal,
  ModalContent,
  ModalCloseButton,
  PhotoCarroussel,
  PhotoCarrousselDiv,
} from "./BarberStyle";

interface BarbeiroData {
  fotoperfil: string;
  id: string;
  nome: string;
  sobre: string;
  fotos_trabalhos: string[];
}

const Barbers: FunctionComponent = () => {
  const [barbeiros, setBarbeiros] = useState<BarbeiroData[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState<BarbeiroData | null>(
    null
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    fetch("http://localhost:3001/barbeiros")
      .then((response) => response.json())
      .then((data) => {
        setBarbeiros(data);
      })
      .catch((error) =>
        console.error("Erro ao buscar fotos de perfil dos barbeiros:", error)
      );
  }, []);

  const abrirModal = (barbeiro: BarbeiroData) => {
    setSelectedBarbeiro(barbeiro);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setSelectedBarbeiro(null);
    setModalOpen(false);
  };

  return (
    <BarbersRoot>
      <EquipeLaCasa>Equipe La Casa Barbearia</EquipeLaCasa>
      <PhotosContainer>
        {barbeiros.map((barbeiro, index) => (
          <PhotoWrapper key={barbeiro.id}>
            <Photo
              src={barbeiro.fotoperfil}
              alt={`Foto de Barbeiro ${barbeiro.nome}`}
              onClick={() => abrirModal(barbeiro)}
            />
            <BarberName>{barbeiro.nome}</BarberName>
          </PhotoWrapper>
        ))}
      </PhotosContainer>

      {modalOpen && selectedBarbeiro && (
        <Modal open={modalOpen}>
          <ModalContent>
            <Photo
              src={selectedBarbeiro.fotoperfil}
              alt={`Foto de ${selectedBarbeiro.nome}`}
            />
            <BarberName>{selectedBarbeiro.nome}</BarberName>
            <p>{selectedBarbeiro.sobre}</p>

            <Slider {...settings}>
              {selectedBarbeiro.fotos_trabalhos.map((foto, index) => (
                <PhotoCarrousselDiv key={index}>
                  <PhotoCarroussel src={foto} alt={`Trabalho ${index + 1}`} />
                </PhotoCarrousselDiv>
              ))}
            </Slider>

            <ModalCloseButton onClick={fecharModal}>Fechar</ModalCloseButton>
          </ModalContent>
        </Modal>
      )}
    </BarbersRoot>
  );
};

export default Barbers;
