import React, { useState } from 'react';
import { convertCurrency } from '../services/api';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('XOF');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const currencies = ['EUR', 'XOF', 'GBP', 'CNY'];

  const handleConvert = async () => {
    if (!amount || amount <= 0) {
      setError("Veuillez entrer un montant valide");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const data = await convertCurrency(fromCurrency, toCurrency, amount);
      setResult(data.converted_amount);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="converter-container">
      <h2>Convertisseur de Devise</h2>
      
      <div className="converter-form">
        <div className="input-group">
          <label>Montant :</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
          />
        </div>

        <div className="currency-selectors">
          <div className="selector">
            <label>De :</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={`from-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>

          <div className="selector">
            <label>À :</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {currencies.map(currency => (
                <option key={`to-${currency}`} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button 
          onClick={handleConvert}
          disabled={isLoading}
        >
          {isLoading ? 'Conversion en cours...' : 'Convertir'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {result && (
        <div className="result-display">
          <h3>Résultat :</h3>
          <p>
            {amount} {fromCurrency} = {result} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
