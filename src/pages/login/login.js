import React from "react";
//import { STORAGE_KEY } from '../../utils/authStorage.js';
import '../../../src/style.css';
import logo from '../../img/logo.png'
import Button from "../../components/button/button.js";
import Input from "../../components/input/input.js";
import useForm from '../login/useForm.js';
import validation from "./loginValidation.js";

const Login = () => {
  const { handleChange, handleSubmit, handleSignup, errors } = useForm(validation);

  return (
    <>
      <div className='content flexBox'>
        <div className='area flexBox'>
          <img src={logo} alt='logo' />
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className='flexBox'>
              <Input name='email' type='email' placeholder='E-mail:'
                className='field' onChange={handleChange} />
              <p>{errors.email}</p>

              <Input name='password' type='password' placeholder='Senha: '
                className='field' onChange={handleChange} />
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
