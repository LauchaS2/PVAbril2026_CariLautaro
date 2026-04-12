import { useState, useContext } from "react";
import { HABITACIONES } from "../data/Habitaciones";
import { AuthContext } from "../context/AuthContext";

function Gestion() {
  const { usuario } = useContext(AuthContext);

 //cargamos habitaciones
  const [listaHabitaciones, setListaHabitaciones] = useState(() => {
    const guardado = localStorage.getItem("habitaciones_hotel");
    if (guardado) {
      return JSON.parse(guardado);
    } else {
      // Si es la primera vez de la pagina, carga Habiraciones.jsx y crea el localstorage 
      // apartir de eso
      localStorage.setItem("habitaciones_hotel", JSON.stringify(HABITACIONES));
      return HABITACIONES;
    }
  });

  // se carga el localstorage de reservas
  const [reservas, setReservas] = useState(() => {
    const guardado = localStorage.getItem("reservas_hotel");
    if (guardado) {
      return JSON.parse(guardado);
    } else {
      return [];
    }
  });

  const [seleccionada, setSeleccionada] = useState(null);
  const [cantidadDias, setCantidadDias] = useState(1);
  const [reservaFinalizada, setReservaFinalizada] = useState(null);

  const seleccionar = (hab) => {
    if (hab.estado === "Libre") {
      setSeleccionada(hab);
      setReservaFinalizada(null);
    } else {
      alert("La habitación ya está ocupada.");
    }
  };

  const confirmarReserva = () => {
    // objeto reserva
    const nuevaReserva = {
      codigoReserva: Math.floor(Math.random() * 10000),
      fecha: new Date().toLocaleDateString(),
      dias: cantidadDias,
      total: cantidadDias * seleccionada.costo,
      pasajero: usuario,
      habitacion: seleccionada
    };

    // se marca como ocupada
    const nuevasHabitaciones = listaHabitaciones.map((h) => {
      if (h.codigo === seleccionada.codigo) {
        return { ...h, estado: "Ocupada" };
      }
      return h;
    });

    
    const listaReservasActualizada = [...reservas, nuevaReserva];
    setListaHabitaciones(nuevasHabitaciones);
    setReservas(listaReservasActualizada);
    setReservaFinalizada(nuevaReserva);
    setSeleccionada(null);

    // guardamos en localstorage
    localStorage.setItem("habitaciones_hotel", JSON.stringify(nuevasHabitaciones));
    localStorage.setItem("reservas_hotel", JSON.stringify(listaReservasActualizada));
  };

  const obtenerColor = (estado) => {
    if (estado === "Libre") {
      return "green";
    }
    return "red";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Sistema de Reservas</h2>

      <table border="1" style={{ width: "100%", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Costo</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {listaHabitaciones.map((hab) => (
            <tr key={hab.codigo}>
              <td>{hab.codigo}</td>
              <td>{hab.tipo}</td>
              <td>${hab.costo}</td>
              <td style={{ color: obtenerColor(hab.estado) }}>{hab.estado}</td>
              <td>
                <button onClick={() => seleccionar(hab)}>Seleccionar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {seleccionada && (
        <div style={{ border: "2px solid blue", padding: "10px" }}>
          <h3>Reservando: {seleccionada.tipo} (Código: {seleccionada.codigo})</h3>
          <label>Días: </label>
          <input 
            type="number" 
            value={cantidadDias} 
            min="1" 
            onChange={(e) => setCantidadDias(e.target.value)} 
          />
          <button onClick={confirmarReserva}>Confirmar</button>
        </div>
      )}

      {reservaFinalizada && (
        <div style={{ marginTop: "20px", border: "2px solid green", padding: "15px" }}>
          <h3>Resumen de la Operación</h3>
          <p>DNI: {reservaFinalizada.pasajero.dni}</p>
          <p>Habitación: {reservaFinalizada.habitacion.codigo} ({reservaFinalizada.habitacion.tipo})</p>
          <p>Costo Total: ${reservaFinalizada.total}</p>
        </div>
      )}
    </div>
  );
}

export default Gestion;