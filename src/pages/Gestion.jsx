import { useState } from "react";
import { HABITACIONES } from "../data/Habitaciones"; 

function Gestion() {
  const [listaHabitaciones, setListaHabitaciones] = useState(HABITACIONES);

  const obtenerColor = (estado) => {
    if (estado === "Libre") {
      return "green";
    }
    return "red";
  };

  const seleccionarHabitacion = (hab) => {
    alert("Código seleccionado: " + hab.codigo);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Habitaciones</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Tipo</th>
            <th>Costo</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {listaHabitaciones.map((hab) => (
            <tr key={hab.codigo}>
              <td>{hab.codigo}</td>
              <td>{hab.tipo}</td>
              <td>${hab.costo}</td>
              <td style={{ color: obtenerColor(hab.estado), fontWeight: "bold" }}>
                {hab.estado}
              </td>
              <td>{hab.descripcion}</td>
              <td>
                <button onClick={() => seleccionarHabitacion(hab)}>
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Gestion;