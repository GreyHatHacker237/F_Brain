// frontend/src/components/CurrencyConverter.js
import React, { useState } from 'react';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('XOF');
  const [result, setResult] = useState(null);

  const currencies = ['EUR', 'XOF', 'GBP', 'CNY'];

  const handleConvert = () => {
    // Temporaire - nous connecterons à l'API plus tard
    const mockRate = 655.96; // 1 EUR = 655.96 XOF
    setResult(amount * mockRate);
  };

  return (
    <div className="converter">
      <h2>Convertisseur</h2>
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <span> vers </span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button onClick={handleConvert}>Convertir</button>
      </div>
      {result && (
        <div className="result">
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
