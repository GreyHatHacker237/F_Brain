// frontend/src/components/ConversionHistory.js
import React, { useEffect, useState } from 'react';
import { getConversionHistory } from '../services/api';

function ConversionHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getConversionHistory();
      setHistory(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="history">
      <h2>Historique des Conversions</h2>
      <ul>
        {history.map(item => (
          <li key={item.id}>
            {item.amount} {item.from_currency} → {item.converted_amount.toFixed(2)} {item.to_currency} ({item.date})
          </li>
        ))}
      </ul>
    </div>
  );
}
