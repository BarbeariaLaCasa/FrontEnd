import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logoBarbearia.jpg";
import { CabecalhoChild, CabecalhoRoot, Login, Logo } from "./HeaderStyle";

const Header: FunctionComponent = () => {
  const linkStyle = {
    color: "inherit",
  };

  return (
    <CabecalhoRoot>
      <CabecalhoChild />
      <Logo alt="Logo da Barbearia" src={logo} />
      <Login>
        <motion.li whileTap={{ scale: 1.1 }}>
          <Link to="/login" style={linkStyle}>
            Entrar
          </Link>
        </motion.li>
      </Login>
    </CabecalhoRoot>
  );
};

export default Header;
