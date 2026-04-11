import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <>
      {/*aca puedo poner una navbar para todas las pages*/}
      <nav>
        <h1>Caseron Antiguo</h1>
      </nav>

      <AppRouter />
      
      <footer>
        <p>PV Abril 2026</p>
      </footer>
    </>
  );
}

export default App;