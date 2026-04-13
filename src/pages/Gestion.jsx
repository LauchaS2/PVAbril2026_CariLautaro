import { useState, useContext } from "react";
import { HABITACIONES } from "../data/Habitaciones";
import { AuthContext } from "../context/AuthContext";
import "../css/Gestion.css";
import { Navigate } from 'react-router-dom';

function Gestion() {
  const { usuario } = useContext(AuthContext);  //le pide al context la info del usuario actuak

  if (!usuario) return <Navigate to="/login" />;  //si no hay usuario logeado, lo manda al home

  const [listaHabitaciones, setListaHabitaciones] = useState(() => { //si es la primera vez que
    const guardado = localStorage.getItem("habitaciones_hotel");//la pagina se abre, ejecuta esto
    if (guardado) { // buscando si ya hay un array creado, si lo hay, lo muestra
      return JSON.parse(guardado);
    } else {// si no hay, significa que es la primera vez que se usa la pagina, entonces
      localStorage.setItem("habitaciones_hotel", JSON.stringify(HABITACIONES));// crea un objeto nuevo
      return HABITACIONES; //con la info de Habitaciones.jsx para que la apgina no arranque vacia
    }
  });

  const [reservas, setReservas] = useState(() => { // misma logica que arriba
    const guardado = localStorage.getItem("reservas_hotel");//solo que si es la primera vez
    if (guardado) {//crea un array vacio
      return JSON.parse(guardado);
    } else {
      return [];
    }
  });

  const [seleccionada, setSeleccionada] = useState(null); //habitacion que queres reservar
  const [cantidadDias, setCantidadDias] = useState(1); //dias de la reserva
  const [reservaFinalizada, setReservaFinalizada] = useState(null);//para saber el estado de la reserva


  //sirven para saber que se esta escribiendo e informarle a react los cambios de estado
  const [nuevoCodigo, setNuevoCodigo] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("Simple");
  const [nuevoCosto, setNuevoCosto] = useState("");
  const [nuevaDesc, setNuevaDesc] = useState("");

  const agregarHabitacion = (e) => {
    e.preventDefault(); //evita que la pagina se reinicie al mandar el form
    const nuevaHab = { //construye el objeto
      codigo: Number(nuevoCodigo),
      tipo: nuevoTipo,
      costo: Number(nuevoCosto),
      descripcion: nuevaDesc,
      estado: "Libre"
    };
    const listaActualizada = [...listaHabitaciones, nuevaHab]; //se crea una lista nueva
    setListaHabitaciones(listaActualizada);  //con la informacion de la vieja, pero 
    localStorage.setItem("habitaciones_hotel", JSON.stringify(listaActualizada)); //añade la nueva habitacion al final de la lista
    setNuevoCodigo("");//tambien le avisa al react que cambio la lista, y se guarda en la memoria
    setNuevoCosto("");//al ultimo se limpia el form
    setNuevaDesc("");
  };

  const eliminarHabitacion = (codigo) => {
    const listaActualizada = listaHabitaciones.filter((h) => h.codigo !== codigo);
    setListaHabitaciones(listaActualizada);//aca se usa filter. Busca en la lista de habitaciones
    localStorage.setItem("habitaciones_hotel", JSON.stringify(listaActualizada));//y deja
  };//las que no coinciden con el codigo, y borra la habitacion que si, creando una nueva lista
  //sin esa habitacion, se actualiza la lsita de habitaciones y se actualiza la memoria


  //Sirve para saber que estado tiene la habitacion
  const obtenerClaseEstado = (estado) => {
  if (estado === "Libre") {
    return "estado-libre";
  } else {
    return "estado-ocupado";
  }
};

  const seleccionar = (hab) => { //verifica si la habitacion seleccioanda esta libre
    if (hab.estado === "Libre") { //y si se puede seguir con el proceso de reserva
      setSeleccionada(hab);//carga los datos d ela habitacion seleccionada
      setReservaFinalizada(null);//resetea el estado, por si hubo una reservafinalizada antes con exito
    } else {
      alert("La habitación ya está ocupada.");
    }
  };

  const confirmarReserva = () => {

    //se crea un objeto, con los datos necesarios de la reserva
    //se crea un un codigo de reserva que simula un id unico
    //se guarda la fecha del momento en el que se hace la reserva
    //se hace un presupuesto con los dias seleccionados * el costo de la habitacion seleccionada
    //y se vincula la reserva al usuario
    const nuevaReserva = {
      codigoReserva: Math.floor(Math.random() * 10000),
      fecha: new Date().toLocaleDateString(),
      dias: cantidadDias,
      total: cantidadDias * seleccionada.costo,
      pasajero: usuario,
      habitacion: seleccionada
    };

    //recorre las habitaciones, comparando su codigo, con el de la habitacion que se 
    //selecicona para alquilar, si coincide, se cambia el estado a ocupada
    //a las demas las deja igual.
    const nuevasHabitaciones = listaHabitaciones.map((h) => {
      if (h.codigo === seleccionada.codigo) {
        return { ...h, estado: "Ocupada" };
      }
      return h;
    });


    //se crea una nueva lsita de reservas
    //copiando la anterior y poniendo la nueva
    //y se actualizan los datos, para que la pagina se renderice actualziada
    //ahora la habitacion aparece en rojo (ocupada)
    //se añada la nueva reserva a la lista
    //se actualiza la reservafinalizada para que se muestre el cartel de reserva exitosa
    //se actualiza Seleccioanda para que el menu de reserva se cierre
    const listaReservasActualizada = [...reservas, nuevaReserva];
    setListaHabitaciones(nuevasHabitaciones);
    setReservas(listaReservasActualizada);
    setReservaFinalizada(nuevaReserva);
    setSeleccionada(null);


    //y se guarda en la memoria la reserva y la habitacion ocupada
    localStorage.setItem("habitaciones_hotel", JSON.stringify(nuevasHabitaciones));
    localStorage.setItem("reservas_hotel", JSON.stringify(listaReservasActualizada));
  };


  //esto decide que se muestra segun el tipo de usuario logeado
  //si es un Administrador, muestra el boton eliminar
  //si no, muestra el boton de reserva
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
                <span className={obtenerClaseEstado(hab.estado)}>
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