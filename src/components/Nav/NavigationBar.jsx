import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextManager/authContextManager';
import { doSignOut } from '../../Firebase/Auth';
import './HeaderStyles.css';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  const handleLogout = () => {
    doSignOut().then(() => {
      navigate('/login');
    });
  };

  return (
    <nav className="navbar">
      {loggedIn ? (
        <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
      ) : (
        <>
          <Link className="nav-link" to="/login">Login</Link>
          <Link className="nav-link" to="/register">Register New Account</Link>
        </>
      )}
    </nav>
  );
};


export default NavigationBar;
