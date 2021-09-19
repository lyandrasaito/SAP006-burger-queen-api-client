import React from "react";
import { STORAGE_KEY } from '../../utils/auth.js';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const handleSignIn = () => {
    localStorage.setItem(STORAGE_KEY, 'abc_123')
    history.push('/hall')
  }
  return (
    <>
      <h1>Login</h1>
      <button onClick={handleSignIn}>Login</button>
    </>
  )
}

export default Login;
