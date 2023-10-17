import About from "../../containers/About/About";
import Barbers from "../../containers/Barber/Barber";
import Footer from "../../containers/Footer/Footer";
import Header from "../../containers/Header/Header";
import Services from "../../containers/Services/Services";
import { ContainerHomePage } from "./HomePageStyle";

const HomePage = () => {
  return (
    <ContainerHomePage>
      <Header />
      <About />
      <Barbers />
      <Services />
      <Footer />
    </ContainerHomePage>
  );
};

export default HomePage;
