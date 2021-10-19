import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import { useHistory } from 'react-router-dom';
import '../../../src/style.css';
import logo from '../../img/logo.png'

export const Ready = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((response) => response.json())
      .then((orders) => {
        const status = orders.filter((itens) =>
          itens.status.includes('ready') || itens.status.includes('delivered')
        );
        setOrders(status);
      });
  });

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

  const duration = (updatedAt, createdAt) => {
    // valor absoluto
    const difference = Math.abs(new Date(updatedAt) - new Date(createdAt));
    // arredondar
    return Math.floor(difference / 1000 / 60);
  }

  return (
    <><img src={logo} alt='logo' className="logo" />
      <div className="container kitchenContainer">
        <section className="menu">
          <h1>Pedidos</h1>

          <section className="">
            <Button text="Início" className='button' onClick={kitchen} />
            <Button text="Despachados" className='button' onClick={ready} />
            <Button text="Sair" className='button' onClick={handleSignOut} />
          </section>

          <section>

            {orders.map((order) => {
              return (
                <div className="" key={order.id}>
                  <div className="card kitchenCard">
                    <h1>{order.status.replace('ready', 'Despachado').replace('delivered', 'Entregue')}</h1>
                    <p>{order.id}</p>
                    <p>Cliente: {order.client_name}</p>
                    <p>Mesa: {order.table}</p>
                    {order.status === "pending" || order.status === "ready" ? (<p>Tempo:{' '}{duration(order.updatedAt, order.createdAt)} min</p>) : ""}
                    <hr />
                    {order.Products.map((items, index) => (
                      <div key={index}>
                        <p>
                          {items.qtd} {items.name}
                        </p>
                        <p>{items.flavor}</p>
                        <p>{items.complement}</p>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              );

            })}
          </section>
        </section>

      </div></>
  );
}

export default Ready;