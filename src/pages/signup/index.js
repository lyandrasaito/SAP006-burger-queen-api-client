import React, { useState } from "react";

const Signup = () => {
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [hall, setHall] = useState('');
  // const [kitchen , setKitchen] = useState('');
  
  return (
    <div className='form'>
      <h2>Cadastro</h2>
    <form>
      <input
        placeholder = 'Nome'
        type = 'text'
        id = 'name'
        label = 'Nome'
        // value = {name}
      />
      <input
        type ='email'
        placeholder = 'Email'
        id = 'email'
        label = 'email'
        // value = {email}
      />
      <input
        type = 'password'
        placeholder = 'Password'
        id = 'password'
        label = 'Senha'
        // value = {password}
      />
      <div className='check'>
        <input
          type = 'radio'
          value = 'hall'
          name = 'Salão'
          label = 'Salão'>
        </input>

        <input 
          type = 'radio'
          value = 'kitchen'
          name = 'Cozinha' 
          label = 'Cozinha'>
        </input>
      </div>
      <button className='btn-singup'>
        Cadastrar
      </button>
    </form>
    
    </div>
    
  )
}

export default Signup;