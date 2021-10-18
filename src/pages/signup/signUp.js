import React from 'react';
import logo from '../../img/logo.png'
import Button from '../../components/button/button.js';
import Input from '../../components/input/input.js';
import '../../../src/style.css'
import validation from './signUpValidation.js';
import useForm from './useForm.js';

const SignUp = () => {
  const { handleChange, handleSubmit, handleLogin, errors } = useForm(validation);
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

        </div>
      </div>
    </>
  )
}

export default SignUp;
