import React from 'react';
import logo from '../../img/logo.png'
import Button from '../../components/button/button.js';
import Input from '../../components/input/input';
import './index.css';
import validation from '../../validation'
import useForm from './testeForm';

const Signup = () => {
  const { handleChange, handleSubmit, errors } = useForm(validation);
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
              <p>{errors.name}</p>

              <Input name='email' type='email' placeholder='E-mail:' className='field'
                onChange={handleChange} />
              <p>{errors.email}</p>


              <Input name='password' type='password' placeholder='Senha: ' className='field'
                onChange={handleChange} />
              <p>{errors.password}</p>


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
