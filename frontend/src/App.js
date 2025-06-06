import React from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Convertisseur de Devises</h1>
      <CurrencyConverter />
    </div>
  );
}

export default App;
