import React from "react";
import { STORAGE_KEY } from '../../utils/authStorage.js';
import { useHistory } from 'react-router-dom';
import './index.css';
import logo from '../../img/logo.png'
import Button from "../../components/button/button.js";
import Input from "../../components/input/input.js";

const Login = () => {
  const history = useHistory();
  const handleSignIn = () => {
    localStorage.setItem(STORAGE_KEY, 'abc_123')
    history.push('/hall')
  }
  const handleSignup = () => {
    history.push('/signup')
  }
  return (
    <>
      <div className='content flexBox'>
        <div className='area flexBox'>
          <img src={logo} alt='logo' />
          <h1>Login</h1>

          <form>
            <div className="flexBox">
              <Input className="field" type='email' placeholder='E-mail:' />
              <Input className="field" type='password' placeholder='Senha: ' />
            </div>
            <div className="flexBox">
              <Button className='button' type='submit' onClick={handleSignIn} text='Login' />
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
