import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import './Auth.css';

const Login = ({ onSwitchToSignup, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose(); // Close the auth modal after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      onClose(); // Close the auth modal after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Welcome Back!</h2>
        <p>Sign in to your account</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button 
          type="submit" 
          className="auth-button primary"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="divider">
        <span>OR</span>
      </div>

      <button 
        onClick={handleGoogleLogin}
        className="auth-button google"
        disabled={loading}
      >
        <span className="google-icon">🔍</span>
        Continue with Google
      </button>

      <div className="auth-switch">
        <p>
          Don't have an account? 
          <button 
            type="button"
            onClick={onSwitchToSignup}
            className="switch-button"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;