import { FunctionComponent } from "react";
import { AboutSection, TextAbout } from "./AboutStyle";

const About: FunctionComponent = () => {
  return (
    <AboutSection>
      <TextAbout>
        <p>
          <h1>
            A La Casa, a barbearia que é mais do que um lugar para cuidar da sua
            aparência
          </h1>
          A La Casa é uma barbearia que nasceu em 2021, em Porto Alegre, Rio
          Grande do Sul. O nome foi inspirado no conceito de casa, um lugar onde
          as pessoas se sentem à vontade e podem relaxar. A barbearia é
          comandada por quatro barbeiros: Juan, Henrique, Tigrinho e Rafa. Todos
          eles são apaixonados pelo que fazem e estão sempre buscando novidades
          para oferecer aos clientes. Além de cortes de cabelo, a La Casa também
          oferece serviços de sobrancelha e barba. O objetivo é atender às
          necessidades de todos os homens e mulheres, independente do estilo. A
          La Casa é um lugar descontraído e informal, onde os clientes podem
          relaxar e conversar com os barbeiros, os barbeiros da La Casa são
          conhecidos pelo bom humor e pela simpatia. Eles sempre estão dispostos
          a dar um bom papo e fazer os clientes se sentirem em casa. A La Casa é
          mais do que um lugar para cortar o cabelo. É um lugar onde os homens e
          mulheres podem relaxar, se divertir e fazer amizades. Se você está
          procurando uma barbearia que seja mais do que um lugar para cortar o
          cabelo, a La Casa é a escolha certa para você.
        </p>
      </TextAbout>
    </AboutSection>
  );
};

export default About;
