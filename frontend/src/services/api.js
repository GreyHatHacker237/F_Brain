// frontend/src/services/api.js
const API_BASE_URL = 'http://localhost:8000'; // Nous changerons cela plus tard

export const convertCurrency = async (from, to, amount) => {
  // Simulation en attendant le backend
  const mockRates = {
    'EUR-XOF': 655.96,
    'XOF-EUR': 0.0015,
    'EUR-GBP': 0.86,
    'GBP-EUR': 1.16,
    // Ajoute d'autres taux mockés si nécessaire
  };
  
  const rate = mockRates[`${from}-${to}`] || 1;
  return {
    original_amount: amount,
    from_currency: from,
    to_currency: to,
    converted_amount: amount * rate,
    rate: rate
  };
};

export const getConversionHistory = async () => {
  // Simulation
  return [
    {
      id: 1,
      amount: 10,
      from_currency: 'EUR',
      to_currency: 'XOF',
      converted_amount: 6559.6,
      date: '2023-05-20'
    }
  ];
};
