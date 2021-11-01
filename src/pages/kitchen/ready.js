import React, { useEffect, useState } from 'react';
import '../../../src/style.css';
import KitchenHeader from "../../components/headers/kitchen";
import Button from '../../components/button/button';

export const Ready = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
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
          itens.status.includes('ready') || itens.status.includes('delivered')
        );
        setOrders(status);
      })
      .catch((error) => {
        console.log(error)
      })
  });

  const duration = (updatedAt, createdAt) => {
    const difference = Math.abs(new Date(updatedAt) - new Date(createdAt));
    return Math.floor(difference / 1000 / 60);
  }

  const deleteOrder = (id) => {
    const status = { status: 'ready' };
    fetch(url + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      body: JSON.stringify(status),
    })
      .then((response) => {
        response.json()
          .then(() => {
            const order = orders;
            return order;
          });
      })
      .catch((error) => {
        console.log(error)
      })
  };

  return (
    <>
      <KitchenHeader />
      <div className="kitchenArea">
        <div className="kitchenContainer">
          <section className="center">
            <h1>Pedidos finalizados</h1>
            <section>
              {orders.map((order) => {
                return (
                  <div className="card card-kitchen ready" key={order.id}>
                    <div className="">
                      <h1>{order.status.replace('ready', 'Despachado').replace('delivered', 'Servido')}</h1>
                      <p>{order.id}</p>
                      <p>Cliente: {order.client_name}</p>
                      <p>Mesa: {order.table}</p>
                      {order.status === "pending" || order.status === "ready" ? (<p>Tempo:{' '}{duration(order.updatedAt, order.createdAt)} min</p>) : ""}
                      <hr />
                      <div className="kitchenScroll">
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
                      <Button text="Apagar" className='button' onClick={() => deleteOrder(order.id)} />
                    </div>
                  </div>
                );
              })}
            </section>
          </section>
        </div>
      </div></>
  );
}

export default Ready;
