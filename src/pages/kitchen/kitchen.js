import React from "react";
import { useState, useEffect } from 'react';
import '../../../src/style.css';
import Button from "../../components/button/button";
import KitchenHeader from "../../components/headers/kitchen";

function Kitchen() {
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
          itens.status.includes('preparing') ||
          itens.status.includes('pending')
        );
        setOrderStatus(status);
      });
  })

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
      });
  };

  return (
    <>
      <KitchenHeader />
      <div className="kitchenArea">
        <div className="kitchenContainer">
          <section className="center">
            <h1>Pedidos Pendentes</h1>
            <section>

              {orderStatus.map((order) => {
                return (
                  <section className="card card-kitchen" key={order.id}>
                    <div>
                      <h1> {order.status.replace('pending', 'Pendente').replace('preparing', 'Em andamento')} </h1>
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
                      <div className="kitchenScroll">
                        {order.Products.map((items, index) => (
                          <div key={index}>
                            <p> {items.qtd} {items.name}</p>
                            <p>{items.flavor}</p>
                            <p>{items.complement}</p>
                            <hr />
                          </div>
                        ))}
                      </div>
                      <div className='center'>
                        <Button text="Preparar" className='button' onClick={() => setStatus(order.id, 'preparing')} />
                        <Button text="Despachar" className='button' onClick={() => setStatus(order.id, 'ready')} />
                      </div>
                    </div>
                  </section>
                );
              })}

            </section>
          </section>

        </div>
      </div></>
  );
}


export default Kitchen;