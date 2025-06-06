export const convertCurrency = async (from, to, amount) => {
  const response = await fetch('http://localhost:8000/api/convert/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCSRFToken(), // Fonction à implémenter
    },
    body: JSON.stringify({
      from_currency: from,
      to_currency: to,
      amount: amount
    }),
    credentials: 'include' // Pour les cookies de session
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  
  return response.json();
};

// Fonction helper pour le CSRF
function getCSRFToken() {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return cookieValue;
}
