import { FunctionComponent, useEffect, useState } from "react";
import {
  DescricaoServico,
  ServiceColumn,
  ServicesColumns,
  ServicesContainer,
  ServicesTitle,
  TituloServico,
} from "./ServicesStyle";
import { Service } from "../../types/types";

const Services: FunctionComponent = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:3001/servicos");
        const data = await response.json();

        if (!response.ok) {
          console.error(`Erro ${response.status} ao buscar os serviços`);
          return;
        }

        setServices(data);
      } catch (error) {
        console.error("Erro ao buscar os serviços", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <ServicesContainer>
      <ServicesTitle>Serviços</ServicesTitle>
      <ServicesColumns>
        {services.map((service) => (
          <ServiceColumn key={service.idserviço}>
            <TituloServico>{service.nome}</TituloServico>
            <DescricaoServico>{service.descricaoservico}</DescricaoServico>
          </ServiceColumn>
        ))}
      </ServicesColumns>
    </ServicesContainer>
  );
};

export default Services;
