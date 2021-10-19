import React from "react";
import { useState, useEffect } from 'react';
import '../../../src/style.css';
import Button from "../../components/button/button";
import { useHistory } from 'react-router-dom';
import logo from '../../img/logo.png'

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
          itens.status.includes('pending') ||
          itens.status.includes('done')
        );
        setOrderStatus(status);
      });
  })

  const history = useHistory();
  const handleSignOut = (e) => {
    e.preventDefault();
    history.push('/login')
    localStorage.clear();
  }

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

  const ready = () => {
    history.push('/ready')
  }

  const kitchen = () => {
    history.push('/kitchen')
  }

  return (
    <><img src={logo} alt='logo' className="logo" />
      <div className="kitchenContainer">
        <section className="menu">
          <h1>Pedidos</h1>

          <section className="products-btn">
            <Button text="Início" className='button' onClick={kitchen} />
            <Button text="Despachados" className='button' onClick={ready} />
            <Button text="Sair" className='button' onClick={handleSignOut} />
          </section>

          <section>
            {orderStatus.map((order) => {
              return (
                <section className="products" key={order.id}>
                  <div className="card">
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
                    {order.Products.map((items, index) => (
                      <div key={index}>
                        <p> {items.qtd} {items.name}</p>
                        <p>{items.flavor}</p>
                        <p>{items.complement}</p>
                        <hr />
                      </div>
                    ))}

                    <Button text="Preparar" className='button' onClick={() => setStatus(order.id, 'preparing')} />
                    <Button text="Despachar" className='button' onClick={() => setStatus(order.id, 'ready')} />

                  </div>
                </section>
              );
            })}
          </section>
        </section>

      </div></>
  );
}


export default Kitchen;