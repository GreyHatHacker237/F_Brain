const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const fetchApi = async (endpoint, method = 'GET', data = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log('[fetchApi] Requête envoyée à :', url);

    const response = await fetch(url, config);

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Réponse non-JSON du backend :', text);
      throw new Error("Le serveur n'a pas renvoyé du JSON.");
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erreur API');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};

// ==================== AUTHENTIFICATION ====================

export const login = async (credentials) => {
  return fetchApi('/login/', 'POST', credentials);
};

export const register = async (userData) => {
  return fetchApi('/register/', 'POST', userData);
};

export const logout = async (token) => {
  return fetchApi('/logout/', 'POST', null, token);
};

// ==================== FONCTIONS MÉTIER ====================

export const convertCurrency = async (data, token) => {
  return fetchApi('/convert/', 'POST', data, token);
};

export const getConversionHistory = async (token) => {
  return fetchApi('/history/', 'GET', null, token);
};

// ==================== EXPORT GLOBAL ====================

export default {
  login,
  register,
  logout,
  convertCurrency,
  getConversionHistory
};
