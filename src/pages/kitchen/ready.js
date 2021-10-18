import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import { useHistory } from 'react-router-dom';
import '../../../src/style.css';

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
          itens.status.includes('ready')
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

  return (
    <div className="container kitchenContainer">
      <section className="menu">
        <h1>Pedidos</h1>

        <section className="" >
          <Button text="Início" className='button' onClick={kitchen} />
          <Button text="Despachados" className='button' onClick={ready} />
          <Button text="Sair" className='button' onClick={handleSignOut} />
        </section>

        <section>

          {orders.map((order) => {
            return (
              <div className="" key={order.id}>
                <div className="card kitchenCard">
                  <h1>{order.status.replace('ready', 'Despachado')}</h1>
                  <p>{order.id}</p>
                  <p>Cliente: {order.client_name}</p>
                  <p>Mesa: {order.table}</p>
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

    </div>
  );
}

export default Ready;