import { Link } from 'react-router-dom';
import "../css/Home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Bienvenidos a El Caserón Antiguo</h1>
        <p className="home-subtitle">
          "Tradición y confort en el corazón de Jujuy"
        </p>
      </header>

      <section className="home-hero">
        <h3>Nuestra Historia</h3>
        <p>
          Ubicado en una casona colonial restaurada del siglo XIX, 
          <strong> El Caserón Antiguo</strong> ofrece una experiencia única donde 
          la historia se encuentra con la comodidad moderna. 
          Disfrute de nuestras habitaciones con vistas a los cerros y un servicio 
          personalizado que lo hará sentir como en casa.
        </p>
      </section>

      <div className="services-grid">
        <div className="service-card">
          <h4>Servicios</h4>
          <ul>
            <li>☕ Desayuno Regional</li>
            <li>📶 WiFi de alta velocidad</li>
            <li>🚗 Estacionamiento propio</li>
            <li>🔥 Calefacción central</li>
          </ul>
        </div>
        
        <div className="service-card">
          <h4>Ubicación</h4>
          <p>📍 San Salvador de Jujuy, Argentina</p>
          <p>Cerca de los principales puntos turísticos y gastronómicos de la ciudad.</p>
        </div>
      </div>

      <section className="home-cta">
        <h3>¿Listo para tu estadía?</h3>
        <p>Explorá nuestras habitaciones disponibles y reservá ahora mismo.</p>
        <Link to="/gestion">
          <button className="btn-reserva-home">
            Ver Habitaciones
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Home;