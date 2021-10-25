import React, { useEffect, useState } from 'react';
import '../../../src/style.css';
import KitchenHeader from "../../components/headers/kitchen";

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

  const duration = (updatedAt, createdAt) => {
    // valor absoluto
    const difference = Math.abs(new Date(updatedAt) - new Date(createdAt));
    // arredondar
    return Math.floor(difference / 1000 / 60);
  }

  return (
    <>
      <KitchenHeader />
      <div className="kitchenContainer">
        <section className="menu">
          <h1>Pedidos finalizados</h1>
          <section>
            {orders.map((order) => {
              return (
                <div className="card card-kitchen" key={order.id}>
                  <div className="">
                    <h1>{order.status.replace('ready', 'Despachado').replace('delivered', 'Servido')}</h1>
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