import { Routes, Route, Navigate } from 'react-router-dom';


import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Home from "../pages/Home";
import Gestion from "../pages/Gestion"
import Reservas from "../pages/MisReservas";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registro />} />
      <Route path="/gestion" element={<Gestion/>} />
      <Route path="/reservas" element={<Reservas/>}/>
      <Route path="/" element={<Home />} />
      
      {/* Por si se cambia la ruta por cualquier cosa random*/}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};