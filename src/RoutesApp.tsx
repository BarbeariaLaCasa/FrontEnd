import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import CadastroPage from "./pages/Cadastro/CadastroPage";
import UserPage from "./pages/User/UserPage";
import BarbeiroPage from "./pages/Barbeiros/BarbeiroPage";

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
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
