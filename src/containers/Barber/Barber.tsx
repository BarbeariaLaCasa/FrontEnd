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
  PhotoModal,
  BarberNameModal,
  SobreModal,
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
    infinite: true,
    speed: 230,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
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

    document.body.style.overflow = "hidden";
  };

  const fecharModal = () => {
    setSelectedBarbeiro(null);
    setModalOpen(false);

    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && modalOpen) {
        fecharModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

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
            <PhotoModal
              src={selectedBarbeiro.fotoperfil}
              alt={`Foto de ${selectedBarbeiro.nome}`}
            />
            <ModalCloseButton onClick={fecharModal}>X</ModalCloseButton>
            <BarberNameModal>{selectedBarbeiro.nome}</BarberNameModal>
            <SobreModal>{selectedBarbeiro.sobre}</SobreModal>

            <Slider {...settings}>
              {selectedBarbeiro.fotos_trabalhos.map((foto, index) => (
                <PhotoCarrousselDiv key={index}>
                  <PhotoCarroussel src={foto} alt={`Trabalho ${index + 1}`} />
                </PhotoCarrousselDiv>
              ))}
            </Slider>
          </ModalContent>
        </Modal>
      )}
    </BarbersRoot>
  );
};

export default Barbers;
