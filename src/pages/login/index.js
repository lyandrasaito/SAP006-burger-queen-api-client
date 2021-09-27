import React from "react";
import { STORAGE_KEY } from '../../utils/authStorage.js';
import { useHistory } from 'react-router-dom';
import './index.css';
import logo from '../../img/logo.png'
import Button from "../../components/button/button.js";
import Input from "../../components/input/input.js";
import validation from "../../validation.js";
import useForm from '../login/useForm.js';

const Login = () => {
  const { handleChange, values, handleSubmit, errors } = useForm(validation);

  const history = useHistory();
  /*
  const routerHall = () => {
    history.push('/hall')
  }
  const routerKitchen = () => {
    history.push('/kitchen')
  }*/
  const handleSignup = () => {
    history.push('/signup')
  }

  return (
    <>
      <div className='content flexBox'>
        <div className='area flexBox'>
          <img src={logo} alt='logo' />
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className='flexBox'>
              <Input name='email' value={values.email} type='email' placeholder='E-mail:' className='field' onChange={handleChange} />
              <p>{errors.email}a</p>
              <Input name='password' value={values.password} type='password' placeholder='Senha: ' className='field' onChange={handleChange} />
              <p>{errors.password}</p>
            </div>
            <div className='flexBox'>
              <Button className='button' type='submit' text='Login' />
            </div>
          </form>

          <h3>Não possui uma conta?</h3>
          <Button className='button' onClick={handleSignup} text='Cadastre-se' />
        </div>
      </div>
    </>
  );
};

export default Login;
