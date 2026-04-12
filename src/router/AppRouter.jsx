import { Routes, Route, Navigate } from 'react-router-dom';


import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Home from "../pages/Home";
import Gestion from "../pages/Gestion"

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/management" element={<Gestion/>} />
      <Route path="/" element={<Home />} />
      
      {/* Por si se cambia la ruta por cualquier cosa random*/}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};