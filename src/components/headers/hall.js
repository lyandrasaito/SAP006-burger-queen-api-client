import React from 'react';
import Button from "../button/button";
import logo from '../../img/logo.png'
import { useHistory } from 'react-router-dom';

const HallHeader = () => {

  const history = useHistory();

  const home = () => {
    history.push('/hall')
  }

  const toDeliver = () => {
    history.push('/todeliver')
  }

  const delivered = () => {
    history.push('/delivered')
  }

  const handleSignOut = (e) => {
    e.preventDefault();
    history.push('/login')
    localStorage.clear();
  }

  return (
    <><img src={logo} alt='logo' className="logo" /><section className="nav-btn">
      <Button text="Início" className='button' onClick={home} />
      <Button text="Prontos para servir" className='button' onClick={toDeliver} />
      <Button text="Pedidos entregues" className='button' onClick={delivered} />
      <Button text="Sair" className='button' onClick={handleSignOut} />
    </section></>
  )
}

export default HallHeader;