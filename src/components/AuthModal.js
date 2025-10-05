import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import './Auth.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'

  if (!isOpen) return null;

  const handleSwitchToSignup = () => setMode('signup');
  const handleSwitchToLogin = () => setMode('login');

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="auth-modal" onClick={handleOverlayClick}>
      <div className="auth-modal-content">
        <button className="auth-close" onClick={onClose}>
          ×
        </button>
        
        {mode === 'login' ? (
          <Login 
            onSwitchToSignup={handleSwitchToSignup}
            onClose={onClose}
          />
        ) : (
          <Signup 
            onSwitchToLogin={handleSwitchToLogin}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;