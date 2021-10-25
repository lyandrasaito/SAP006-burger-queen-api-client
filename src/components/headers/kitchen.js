import React from 'react';
import Button from "../button/button";
import logo from '../../img/logo.png'
import { useHistory } from 'react-router-dom';

const KitchenHeader = () => {

  const history = useHistory();

  const handleSignOut = (e) => {
    e.preventDefault();
    history.push('/login')
    localStorage.clear();
  }

  const ready = () => {
    history.push('/ready')
  }

  const kitchen = () => {
    history.push('/kitchen')
  }

  return (
    <><img src={logo} alt='logo' className="logo" />
      <section className="nav-btn">
        <Button text="Pendentes" className='button' onClick={kitchen} />
        <Button text="Despachados" className='button' onClick={ready} />
        <Button text="Sair" className='button' onClick={handleSignOut} />
      </section>
    </>
  )
}

export default KitchenHeader;