import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../services/auth';
import { useSignupApiMutation } from '../state/api';
import '../styles/signup.css';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validatePassword, setValidatePassword] = useState('');

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const onChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'validatePassword') setValidatePassword(value);
  };

  const [signup, { isLoading }] = useSignupApiMutation();

  const onSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await signup({ email, password, validatePassword });

    console.log('error', error);
    console.log('data', data);

    if (error) {
      setErrors(error.data);
      return;
    }

    saveToken(data.token);
    navigate('/');
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="signup">
        <div className="container-signup-form">
          <h2 className="title-signup">Crear una cuenta</h2>
          <form className="form-signup" onSubmit={onSubmit}>
            <input
              className="input-signup"
              type="text"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Correo electrónico"
            ></input>
            <input
              className="input-signup"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Contraseña"
            ></input>
            <input
              className="input-signup"
              type="password"
              name="validatePassword"
              value={validatePassword}
              onChange={onChange}
              placeholder="Validar contraseña"
            ></input>
            <button
              type="submit"
              className="button-signup"
              disabled={isLoading}
            >
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
    </>
  );
};

export default Signup;
