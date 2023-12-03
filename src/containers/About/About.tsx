import { FunctionComponent, useState, useEffect } from "react";
import { AboutSection, TextAbout } from "./AboutStyle";

const About: FunctionComponent = () => {
  const [tituloInicial, setTituloInicial] = useState<string>("");
  const [descricaoInicial, setDescricaoInicial] = useState<string>("");

  useEffect(() => {
    const fetchTituloInicial = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/buscar-titulo-inicial"
        );

        if (!response.ok) {
          throw new Error(
            `Erro ao buscar o título inicial: ${response.status}`
          );
        }

        const data = await response.json();
        const fetchedTituloInicial = data.tituloInicial || "";
        setTituloInicial(fetchedTituloInicial);
      } catch (error) {
        console.error("Erro ao buscar o título inicial:", error);
      }
    };

    const fetchDescricaoInicial = async () => {
      try {
        const responseDescricao = await fetch(
          "http://localhost:3001/buscar-descricao-inicial"
        );

        if (!responseDescricao.ok) {
          throw new Error(
            `Erro ao buscar a descrição inicial: ${responseDescricao.status}`
          );
        }

        const dataDescricao = await responseDescricao.json();
        const fetchedDescricaoInicial = dataDescricao.descricao || "";
        setDescricaoInicial(fetchedDescricaoInicial);
      } catch (error) {
        console.error("Erro ao buscar a descrição inicial:", error);
      }
    };

    fetchTituloInicial();
    fetchDescricaoInicial();
  }, []);

  return (
    <AboutSection>
      <TextAbout>
        <div>
          <p>
            <h1>{tituloInicial}</h1>
            <h4>{descricaoInicial}</h4>
          </p>
        </div>
      </TextAbout>
    </AboutSection>
  );
};

export default About;
