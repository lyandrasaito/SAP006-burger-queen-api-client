import React from "react";
import logo from '../../img/logo.png'
import Button from "../../components/button/button.js";
import Input from "../../components/input/input.js";
import './index.css';

const Signup = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [hall, setHall] = useState('');
  // const [kitchen , setKitchen] = useState('');

  return (

    <>
      <div className='content flexBox'>
        <div className='area flexBox'>
          <img src={logo} alt='logo' />
          <h1>Cadastro</h1>

          <form>
            <div className='flexBox'>
              <Input className='field' type='text' placeholder='Nome:' />
              <Input className='field' type='email' placeholder='E-mail:' />
              <Input className='field' type='password' placeholder='Senha: ' />
              <select className='field' name="role" id="role">
                <option value="" selected disabled>Área: </option>
                <option value="hall">Salão</option>
                <option value="kitchen">Cozinha</option>
              </select>

            </div>
            <div className="flexBox">
              <Button className='button' type='submit' text='Cadastrar' />
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default Signup;
