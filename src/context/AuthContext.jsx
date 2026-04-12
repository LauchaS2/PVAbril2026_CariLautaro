import { createContext, useState } from "react";


//crea el contexto, en si, no hace nada, pero define el medio por el cual 
//vamos a transmitir la info del usuario.
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  //  login
  const iniciarSesion = (email, password) => {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

    if (
      usuarioGuardado &&
      usuarioGuardado.email === email &&
      usuarioGuardado.password === password
    ) {
      setUsuario(usuarioGuardado);
      return true;
    }

    return false;
  };

  //  registro
  const registrarUsuario = (nuevoUsuario) => {
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
  };

  //  deslogearse
  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        iniciarSesion,
        registrarUsuario,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};