import React, { useState } from 'react';
import { login } from '../services/api'; 

const AuthForm = () => {
  // Déclaration des états
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        // Mode connexion
        await login({ username, password });
        setMessage('Connexion réussie!');
      } else {
        // Mode inscription
        setMessage(`Utilisateur ${username} créé avec succès!`);
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      setMessage('Erreur: ' + error.message);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthForm;