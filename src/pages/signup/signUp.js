import React from 'react';
import logo from '../../img/logo.png'
import Button from '../../components/button/button.js';
import Input from '../../components/input/input.js';
import '../../../src/style.css'
import validation from './signUpValidation.js';
import { signUp } from "../../services/authAPI.js";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import Modal from "../../components/modal/modal.js";

const SignUp = () => {
  localStorage.clear();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const history = useHistory();
  const handleLogin = () => history.push('/login')

  const handleSubmit = (e) => {
    e.preventDefault();

    (setErrors(validation(values)));

    signUp(values.name, values.email, values.password, values.role)
      .then((response) => {
        if (response.code === 403) {
          setIsModalVisible(true);
        } else {
          console.log(response.token);

          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);

          if (response.role === "hall") {
            history.push('/hall')
          }
          else if (response.role === "kitchen") {
            history.push('/kitchen')
          }
        }
      })
      .catch((errors) => {
        console.log(errors)
      });
  }
  return (
    <>
      <div className='content flexBox'>
        <div className='area flexBox'>
          <img src={logo} alt='logo' />
          <h1>Cadastro</h1>

          <form onSubmit={handleSubmit}>
            <div className='flexBox'>
              <Input name='name' type='text' placeholder='Nome:' className='field'
                onChange={handleChange} />
              <p className="error-msg">{errors.name}</p>

              <Input name='email' type='email' placeholder='E-mail:' className='field'
                onChange={handleChange} />
              <p className="error-msg">{errors.email}</p>

              <Input name='password' type='password' placeholder='Senha: ' className='field'
                onChange={handleChange} />
              <p className="error-msg">{errors.password}</p>

              <div>
                <label htmlFor="hall">Salão</label>
                <input type="radio" name="role" id="hall" text="Salão" value="hall" onChange={handleChange} />
                <label htmlFor="kitchen">Cozinha</label>
                <input type="radio" name="role" id="kitchen" text="Cozinha" value="kitchen" onChange={handleChange} />
                <p className="error-msg">{errors.role}</p>
              </div>

            </div>
            <div className='flexBox'>
              <Button className='button' type='submit' text='Cadastrar' />
            </div>
          </form>

          <Button className='button' onClick={handleLogin} text='Voltar' />

          {isModalVisible ? (
            <Modal onClose={() => setIsModalVisible(false)}>
              <h3>E-mail já cadastrado</h3>
            </Modal>) : null}

        </div>
      </div>
    </>
  )
}

export default SignUp;
