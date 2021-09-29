import React from 'react';
import logo from '../../img/logo.png'
import Button from '../../components/button/button.js';
import Input from '../../components/input/input';
import './index.css';
//import validation from '../../validation'
import useForm from '../signup/testeForm.js';

const Signup = () => {
  const { handleChange, handleSubmit } = useForm();
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

              <Input name='email' type='email' placeholder='E-mail:' className='field'
                onChange={handleChange} />


              <Input name='password' type='password' placeholder='Senha: ' className='field'
                onChange={handleChange} />

              <div>
                <label htmlFor="hall">Salão</label>
                <input type="radio" name="role" id="hall" text="Salão" value="hall" onChange={handleChange} />
              </div>

              <div>
                <label htmlFor="kitchen">Cozinha</label>
                <input type="radio" name="role" id="kitchen" text="Cozinha" value="kitchen" onChange={handleChange} />
              </div>

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
