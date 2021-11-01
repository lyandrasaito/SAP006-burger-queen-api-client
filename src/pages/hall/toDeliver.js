import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import '../../../src/style.css';
import HallHeader from '../../components/headers/hall.js';

function ToDeliver() {
  const token = localStorage.getItem('token');
  const [orderStatus, setOrderStatus] = useState([]);
  const url = 'https://lab-api-bq.herokuapp.com/orders/';

  useEffect(() => {
    fetch(url, {
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
        setOrderStatus(status);
      })
      .catch((error) => {
        console.log(error)
      })
  });

  const setStatus = (id, newStatus) => {
    const status = { status: newStatus };
    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(status),
    })
      .then((response) => {
        response.json().then(() => {
          const order = orderStatus;
          return order;
        });
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <>
      <HallHeader />
      <div className="container">
        <section className="center">
          <h1>Pedidos para entregar</h1>

          <section>
            {orderStatus.map((order) => {
              return (
                <section key={order.id} className="card kitchenCard">
                  <div>
                    <h1> {order.status.replace('ready', 'Para servir')} </h1>
                    <p>ID: {order.id} </p>
                    <p>Cliente: {order.client_name} </p>
                    <p>Mesa: {order.table} </p>
                    <time>
                      {`${new Date(order.createdAt).toLocaleDateString('pt-br')} - ${new Date(order.createdAt).toLocaleTimeString('pt-br', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}h`}
                    </time>
                    <hr />
                    <section className="hallScroll scrollReady">
                      {order.Products.map((items, index) => (
                        <div key={index}>
                          <p> {items.qtd} {items.name}</p>
                          <p>{items.flavor}</p>
                          <p>{items.complement}</p>
                          <hr />
                        </div>
                      ))}
                    </section>
                    <Button text="Servir" className='button' onClick={() => setStatus(order.id, 'delivered')} />

                  </div>
                </section>
              );
            })}
          </section>
        </section>

      </div>
    </>
  );
};

export default ToDeliver;
