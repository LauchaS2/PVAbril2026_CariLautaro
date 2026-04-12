import { Navbar } from './components/Navbar';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <>
      <Navbar />
      
      <main>
        <AppRouter />
      </main>

      <footer>
        <p>PV Abril 2026</p>
      </footer>
    </>
  );
}

export default App;