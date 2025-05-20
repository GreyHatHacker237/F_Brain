// frontend/src/App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CurrencyConverter from './components/CurrencyConverter';
import ConversionHistory from './components/ConversionHistory';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Convertisseur de Devise</h1>
        <nav>
          <Link to="/">Convertisseur</Link> |
          <Link to="/history">Historique</Link>
        </nav>
        <Routes>
          <Route path="/" element={<CurrencyConverter />} />
          <Route path="/history" element={<ConversionHistory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
