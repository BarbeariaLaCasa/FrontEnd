import { FunctionComponent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logoBarbearia.jpg";
import { CabecalhoChild, CabecalhoRoot, Login, Logo } from "./HeaderStyle";

const Header: FunctionComponent = () => {
  const linkStyle = {
    color: "inherit",
  };

  const location = useLocation();

  useEffect(() => {
    console.log("Localização atual:", location.pathname);
  }, [location]);

  return (
    <CabecalhoRoot>
      <CabecalhoChild />
      <Link to="/">
        <Logo alt="Logo da Barbearia" src={logo} />
      </Link>
      <Login>
        <motion.li whileTap={{ scale: 1.1 }}>
          {location.pathname.startsWith("/user") ||
          location.pathname.startsWith("/administrador") ||
          location.pathname.startsWith("/barbeiro") ? (
            <Link
              to="/"
              style={linkStyle}
              onClick={() => {
                localStorage.removeItem("idDoUsuario");
              }}
            >
              Sair
            </Link>
          ) : (
            <Link to="/login" style={linkStyle}>
              Entrar
            </Link>
          )}
        </motion.li>
      </Login>
    </CabecalhoRoot>
  );
};

export default Header;
