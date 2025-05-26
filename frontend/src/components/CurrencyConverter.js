import React, { useState } from 'react';
import { convertCurrency } from '../services/api';

function CurrencyConverter() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('XOF');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const currencies = ['EUR', 'XOF', 'GBP', 'CNY'];

  const handleConvert = async () => {
    if (!amount || amount <= 0) {
      setError("Veuillez entrer un montant valide");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const conversion = await convertCurrency(fromCurrency, toCurrency, amount);
      setResult(conversion.converted_amount);
    } catch (error) {
      console.error("Erreur de conversion:", error);
      setError("Erreur lors de la conversion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
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
            min="0"
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

          <button
            className="swap-btn"
            onClick={handleSwapCurrencies}
            aria-label="Inverser les devises"
          >
            ⇄
          </button>

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
          className="convert-btn"
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
            {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
          </p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;
