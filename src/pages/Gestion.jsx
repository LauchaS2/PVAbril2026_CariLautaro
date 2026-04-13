import { useState, useContext } from "react";
import { HABITACIONES } from "../data/Habitaciones";
import { AuthContext } from "../context/AuthContext";
import "../css/Gestion.css";
import { Navigate } from 'react-router-dom';

function Gestion() {
  const { usuario } = useContext(AuthContext);

  if (!usuario) return <Navigate to="/login" />;

  const [listaHabitaciones, setListaHabitaciones] = useState(() => {
    const guardado = localStorage.getItem("habitaciones_hotel");
    if (guardado) {
      return JSON.parse(guardado);
    } else {
      localStorage.setItem("habitaciones_hotel", JSON.stringify(HABITACIONES));
      return HABITACIONES;
    }
  });

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

  const [nuevoCodigo, setNuevoCodigo] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("Simple");
  const [nuevoCosto, setNuevoCosto] = useState("");
  const [nuevaDesc, setNuevaDesc] = useState("");

  const agregarHabitacion = (e) => {
    e.preventDefault();
    const nuevaHab = {
      codigo: Number(nuevoCodigo),
      tipo: nuevoTipo,
      costo: Number(nuevoCosto),
      descripcion: nuevaDesc,
      estado: "Libre"
    };
    const listaActualizada = [...listaHabitaciones, nuevaHab];
    setListaHabitaciones(listaActualizada);
    localStorage.setItem("habitaciones_hotel", JSON.stringify(listaActualizada));
    setNuevoCodigo("");
    setNuevoCosto("");
    setNuevaDesc("");
  };

  const eliminarHabitacion = (codigo) => {
    const listaActualizada = listaHabitaciones.filter((h) => h.codigo !== codigo);
    setListaHabitaciones(listaActualizada);
    localStorage.setItem("habitaciones_hotel", JSON.stringify(listaActualizada));
  };

  const seleccionar = (hab) => {
    if (hab.estado === "Libre") {
      setSeleccionada(hab);
      setReservaFinalizada(null);
    } else {
      alert("La habitación ya está ocupada.");
    }
  };

  const confirmarReserva = () => {
    const nuevaReserva = {
      codigoReserva: Math.floor(Math.random() * 10000),
      fecha: new Date().toLocaleDateString(),
      dias: cantidadDias,
      total: cantidadDias * seleccionada.costo,
      pasajero: usuario,
      habitacion: seleccionada
    };

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

    localStorage.setItem("habitaciones_hotel", JSON.stringify(nuevasHabitaciones));
    localStorage.setItem("reservas_hotel", JSON.stringify(listaReservasActualizada));
  };

  const renderizarAccionHabitacion = (hab) => {
    if (usuario.tipo === "Administrador") {
      return (
        <button className="btn-eliminar" onClick={() => eliminarHabitacion(hab.codigo)}>
          Eliminar
        </button>
      );
    }
    return (
      <button className="btn-reserva" onClick={() => seleccionar(hab)}>
        Seleccionar
      </button>
    );
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-titulo">Panel de Gestión - {usuario.tipo}</h2>

      {usuario.tipo === "Administrador" && (
        <div className="admin-panel">
          <h3>Añadir Habitación</h3>
          <form className="admin-form" onSubmit={agregarHabitacion}>
            <input className="input-field" type="number" placeholder="Código" value={nuevoCodigo} onChange={(e) => setNuevoCodigo(e.target.value)} required />
            <select className="select-field" value={nuevoTipo} onChange={(e) => setNuevoTipo(e.target.value)}>
              <option value="Simple">Simple</option>
              <option value="Doble">Doble</option>
              <option value="Triple">Triple</option>
              <option value="Premium">Premium</option>
            </select>
            <input className="input-field" type="number" placeholder="Costo" value={nuevoCosto} onChange={(e) => setNuevoCosto(e.target.value)} required />
            <input className="input-field" type="text" placeholder="Descripción" value={nuevaDesc} onChange={(e) => setNuevaDesc(e.target.value)} />
            <button className="btn-admin-submit" type="submit">Guardar Nueva</button>
          </form>
        </div>
      )}

      <table className="tabla-habitaciones">
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
              <td>
                <span className={hab.estado === "Libre" ? "estado-libre" : "estado-ocupado"}>
                  {hab.estado}
                </span>
              </td>
              <td>{renderizarAccionHabitacion(hab)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {seleccionada && (
        <div className="reserva-modal">
          <h3>Reservando: {seleccionada.tipo} (Código: {seleccionada.codigo})</h3>
          <div className="reserva-inputs">
            <label>Días: </label>
            <input className="input-field" type="number" value={cantidadDias} min="1" onChange={(e) => setCantidadDias(e.target.value)} />
            <button className="btn-reserva-confirm" onClick={confirmarReserva}>Confirmar Reserva</button>
          </div>
        </div>
      )}

      {reservaFinalizada && (
        <div className="resumen-final">
          <h3>✔ Operación Exitosa</h3>
          <p><strong>DNI Pasajero:</strong> {reservaFinalizada.pasajero.dni}</p>
          <p><strong>Habitación:</strong> {reservaFinalizada.habitacion.codigo} ({reservaFinalizada.habitacion.tipo})</p>
          <p className="total-destacado">Total Pagado: ${reservaFinalizada.total}</p>
        </div>
      )}
    </div>
  );
}

export default Gestion;