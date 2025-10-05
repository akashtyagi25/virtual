import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './Auth.css';

const UserProfile = ({ user, onShowAuth }) => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getDisplayName = (user) => {
    return user.displayName || user.email?.split('@')[0] || 'User';
  };

  if (user) {
    return (
      <div className="user-profile">
        <div className="user-info">
          <div className="user-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt="User" style={{width: '100%', height: '100%', borderRadius: '50%'}} />
            ) : (
              getInitials(getDisplayName(user))
            )}
          </div>
          <span className="user-name">{getDisplayName(user)}</span>
          <button className="auth-trigger-btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <div className="auth-buttons">
        <button 
          className="auth-trigger-btn" 
          onClick={() => onShowAuth('login')}
        >
          Login
        </button>
        <button 
          className="auth-trigger-btn" 
          onClick={() => onShowAuth('signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default UserProfile;