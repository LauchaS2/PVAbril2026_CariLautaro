import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../css/MisReservas.css"; 
import { Navigate } from 'react-router-dom';

function MisReservas() {
  const { usuario } = useContext(AuthContext);

  if (!usuario) return <Navigate to="/login" />;


  const [listaMisReservas] = useState(() => {
    const guardado = localStorage.getItem("reservas_hotel");
    if (guardado) {
      const todasLasReservas = JSON.parse(guardado);
      
      return todasLasReservas.filter((res) => 
        String(res.pasajero.dni) === String(usuario.dni)
      );
    }
    return [];
  });

  return (
    <div className="reservas-container">
      <h2 className="reservas-titulo">Mis Reservas</h2>
      <div className="usuario-info-bar">
        <span><strong>Pasajero:</strong> {usuario.nombre} {usuario.apellido}</span>
        <span><strong>DNI:</strong> {usuario.dni}</span>
      </div>

 
      {listaMisReservas.length === 0 && (
        <div className="no-reservas">
          <p>Todavía no tenés reservas realizadas en El Caserón.</p>
        </div>
      )}


      {listaMisReservas.length > 0 && (
        <div className="lista-reservas">
          {listaMisReservas.map((res) => (
            <div className="reserva-card" key={res.codigoReserva}>
              <div className="reserva-info">
                <h4>Reserva #{res.codigoReserva}</h4>
                <p className="reserva-fecha">Fecha: {res.fecha}</p>
                <p>Habitación: <strong>{res.habitacion.codigo}</strong> ({res.habitacion.tipo})</p>
                <p>Estadía: {res.dias} días</p>
              </div>
              <div className="reserva-pago">
                <span className="reserva-total">${res.total}</span>
                <span className="estado-pago">Pagado</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MisReservas;