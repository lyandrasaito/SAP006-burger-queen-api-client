import React from "react";
import { useState } from "react";
import { signIn } from "../../services/authAPI";
import { useHistory } from 'react-router-dom';
import '../../../src/style.css';
import logo from '../../img/logo.png'
import Button from "../../components/button/button.js";
import Input from "../../components/input/input.js";
import validation from "./loginValidation.js";
import Modal from "../../components/modal/modal.js";
import Footer from "../../components/footer/footer";

const Login = () => {
  localStorage.clear();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const history = useHistory();

  const handleSignup = () => {
    history.push('/signup')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    (setErrors(validation(values)));

    signIn(values.email, values.password).then((response) => {
      if (response.code === 400) {
        setIsModalVisible(true);
      } else {
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.id);

        if (response.role === "hall") {
          history.push('/hall')
        }
        else if (response.role === "kitchen") {
          history.push('/kitchen')
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  };

  return (
    <>
      <div className='content flexBox'>
        <div className='area flexBox'>
          <img src={logo} alt='logo' className='auth-logo' />
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className='flexBox'>
              <Input name='email' type='email' placeholder='E-mail:'
                className='field' onChange={handleChange} />
              <p className="error-msg">{errors.email}</p>

              <Input name='password' type='password' placeholder='Senha: '
                className='field' onChange={handleChange} />
              <p className="error-msg">{errors.password}</p>
            </div>
            <div className='flexBox'>
              <Button className='button' type='submit' text='Login' />
            </div>
          </form>

          {isModalVisible ? (
            <Modal onClose={() => setIsModalVisible(false)}>
              <h3>E-mail e/ou senha inválidos</h3>
            </Modal>) : null}

          <h3>Não possui uma conta?</h3>
          <Button className='button' onClick={handleSignup} text='Cadastre-se' />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Login;
