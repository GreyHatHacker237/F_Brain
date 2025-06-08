import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <Link to="/">Convertisseur</Link>
          <Link to="/history">Historique</Link>
          <button onClick={() => {
            localStorage.removeItem('token');
            window.location = '/login';
          }}>Déconnexion</button>
        </>
      ) : (
        <Link to="/login">Connexion</Link>
      )}
    </nav>
  );
}

export default Navbar;
