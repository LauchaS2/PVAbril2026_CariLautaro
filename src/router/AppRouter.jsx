import { Routes, Route, Navigate } from 'react-router-dom';

// Componentes de prueba
const Login = () => <h2>Pantalla de Login</h2>;
const Register = () => <h2>Pantalla de Registro</h2>;
const Home = () => <h2>Bienvenido al Hotel (Home)</h2>;

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      
      {/* Por si se cambia la ruta por cualquier cosa random*/}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};