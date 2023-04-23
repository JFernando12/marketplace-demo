import React, { useState } from 'react';
import { useSigninApiMutation } from '../state/api';
import { saveToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { setToken } from '../state';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    console.log('dataaaaaaa', data);
    if (!data.token) return;

    saveToken(data.token);
    dispatch(setToken(data.token));

    navigate('/productos');
  };

  return (
    <div className="login">
      <div className="container-login-form">
        <h2>Ingresar</h2>
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
  );
};

export default Login;
