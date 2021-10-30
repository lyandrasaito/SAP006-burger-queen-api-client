import React, { useEffect, useState } from 'react';
import '../../../src/style.css';
import HallHeader from '../../components/headers/hall.js';

function Delivered() {
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
          itens.status.includes('delivered')
        );
        setOrderStatus(status);
      })
      .catch((error) => {
        console.log(error)
      })
  });

  return (
    <>
      <HallHeader />
      <div className="container">
        <section className="center">
          <h1>Pedidos Entregues</h1>

          <section>
            {orderStatus.map((order) => {
              return (
                <section className="card kitchenCard" key={order.id}>
                  <div>
                    <h1> {order.status.replace('delivered', 'Entregue')} </h1>
                    <p>ID: {order.id} </p>
                    <p>Cliente: {order.client_name} </p>
                    <p>Mesa: {order.table} </p>
                    <time>
                      {`${new Date(order.createdAt).toLocaleDateString('pt-br')} - ${new Date(order.createdAt).toLocaleTimeString('pt-br', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}h`}
                    </time>

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

export default Delivered;
