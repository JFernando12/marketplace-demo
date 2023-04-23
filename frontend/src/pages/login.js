import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSigninApiMutation } from '../state/api';
import { saveToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import Navbar from '../components/Navbar';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const [signin, { isLoading }] = useSigninApiMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    const { data, error } = await signin({ email, password });
    if (error) {
      setErrors(error.data);
      return;
    }
    if (!data.token) return;

    saveToken(data.token);
    navigate('/');
  };

  return (
    <Box flexGrow={1}>
      <Navbar></Navbar>
      <div className="login">
        <div className="container-login-form">
          <h2 className="title-login">Ingresar</h2>
          <form className="form-login" onSubmit={onSubmit}>
            <input
              className="input-login"
              type="text"
              name="email"
              onChange={onChange}
              placeholder="Email"
            ></input>
            <input
              className="input-login"
              type="text"
              name="password"
              onChange={onChange}
              placeholder="Password"
            ></input>
            <button type="submit" className="button-login">
              {isLoading ? 'Loading...' : 'Send'}
            </button>
          </form>
          <ul className="container-errors">
            {errors.map((err) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </Box>
  );
};

export default Login;
