import React from 'react';
import logo from '../../img/logo.png'
import Button from '../../components/button/button.js';
import Input from '../../components/input/input.js';
import P from '../../components/p/p';
import './index.css';
import useForm from './useForm';
import validatate from '../../validation';

const Signup = () => {
  const { handleChange, values, handleSubmit, errors } = useForm(validatate);
  return (
    <>
      <div className='content flexBox'>
        <div className='area flexBox'>
          <img src={logo} alt='logo' />
          <h1>Cadastro</h1>

          <form className='form' onSubmit={handleSubmit}>
            <div className='flexBox'>
              <Input name='username' type='text' placeholder='Nome:' className='field' value={values.username} onChange={handleChange} />
              <P>{errors.username}</P>
              <Input name='email' type='email' placeholder='E-mail:' className='field' value={values.email} onChange={handleChange} />
              <P>{errors.email}</P>
              <Input name='password' type='password' placeholder='Senha: ' className='field' value={values.password} onChange={handleChange} />
              <P>{errors.password}</P>
              <select className='field' name="role" id="role">
                <option value="" selected disabled>Área: </option>
                <option value="hall">Salão</option>
                <option value="kitchen">Cozinha</option>
              </select>

            </div>
            <div className='flexBox'>
              <Button className='button' type='submit' text='Cadastrar' />
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default Signup;
