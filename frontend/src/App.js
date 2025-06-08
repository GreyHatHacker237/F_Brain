import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CurrencyConverter from './components/CurrencyConverter';
import ConversionHistory from './components/ConversionHistory';
import AuthForm from './components/AuthForm';
import Navbar from './components/Navbar';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<AuthForm />} />
          
          {/* Routes protégées */}
          <Route 
            path="/" 
            element={isAuthenticated ? <CurrencyConverter /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/history" 
            element={isAuthenticated ? <ConversionHistory /> : <Navigate to="/login" />} 
          />
          
          {/* Redirection pour les routes inconnues */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;