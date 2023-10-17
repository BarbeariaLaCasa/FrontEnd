import { FunctionComponent } from "react";
import {
  ServiceColumn,
  ServicesColumns,
  ServicesContainer,
  ServicesTitle,
} from "./ServicesStyle";

const Services: FunctionComponent = () => {
  return (
    <ServicesContainer>
      <ServicesTitle>Serviços</ServicesTitle>
      <ServicesColumns>
        <ServiceColumn>
          <h2>Cortes</h2>
          <p>
            Cortar o cabelo é como dar um upgrade no estilo e na autoestima! Dos
            clássicos atemporais aos degradês descolados, tanto homens quanto
            mulheres sabem: é no corte que a personalidade ganha vida. Então,
            escolha o seu, arrase e mostre ao mundo a sua melhor versão, de
            ponta a ponta!
          </p>
        </ServiceColumn>
        <ServiceColumn>
          <h2>Barba</h2>
          <p>
            Do estilo clássico barbudo ao visual moderno com contornos precisos,
            os homens sabem que cada pelo conta uma história. Deixe crescer,
            apare os detalhes e exiba com confiança a sua melhor versão, com uma
            barba que é puro estilo e personalidade!
          </p>
        </ServiceColumn>
        <ServiceColumn>
          <h2>Sobrancelha</h2>
          <p>
            As sobrancelhas, ah, essas molduras naturais para os olhos, têm o
            poder de transformar o seu rosto. Seja no formato arqueado que
            remete ao clássico ou no estilo mais natural e despojado, elas
            expressam sua essência. Cuide, modele e mostre ao mundo o olhar
            único que revela a sua melhor versão, com sobrancelhas que são o
            toque final de autenticidade e charme!
          </p>
        </ServiceColumn>
      </ServicesColumns>
    </ServicesContainer>
  );
};

export default Services;
