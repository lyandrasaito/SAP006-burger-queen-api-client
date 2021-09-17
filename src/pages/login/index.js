import React from "react";
import { STORAGE_KEY } from '../../utils/auth.js';
import { history } from "../../history";

const Login = () => {
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