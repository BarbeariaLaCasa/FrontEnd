import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import CadastroPage from "./pages/Cadastro/CadastroPage";
import UserPage from "./pages/User/UserPage";
import BarbeiroPage from "./pages/Barbeiros/BarbeiroPage";
import AdministradorPage from "./pages/Administrador/AdministradorPage";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/barbeiro" element={<BarbeiroPage />} />
        <Route path="/administrador" element={<AdministradorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
