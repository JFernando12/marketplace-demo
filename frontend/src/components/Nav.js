import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuth } from '../utils/auth';
import '../styles/nav.css';

const Nav = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const signup = () => {
    navigate('/signup');
  };

  return (
    <div className="nav">
      {isAuth() && (
        <button className="button-nav" onClick={logout}>
          Logout
        </button>
      )}
      {!isAuth() && (
        <button className="button-nav" onClick={signup}>
          Signup
        </button>
      )}
    </div>
  );
};

export default Nav;
