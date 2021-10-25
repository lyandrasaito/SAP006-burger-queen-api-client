import React, { useEffect, useState } from 'react';
import Button from '../../components/button/button';
import { useHistory } from 'react-router-dom';
import '../../../src/style.css';
import logo from '../../img/logo.png'

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

  const toDeliver = () => {
    history.push('/todeliver')
  }

  const delivered = () => {
    history.push('/delivered')
  }

  const history = useHistory();
  const handleSignOut = (e) => {
    e.preventDefault();
    history.push('/login')
    localStorage.clear();
  }

  const home = () => {
    history.push('/hall')
  }

  return (
    <><img src={logo} alt='logo' className="logo" />
      <section className="nav-btn">
        <Button text="Início" className='button' onClick={home} />
        <Button text="Prontos para servir" className='button' onClick={toDeliver} />
        <Button text="Pedidos entregues" className='button' onClick={delivered} />
        <Button text="Sair" className='button' onClick={handleSignOut} />
      </section>
      <div className="container kitchenContainer">
        <section className="menu">
          <h1>Pedidos para entregar</h1>

          <section>
            {orderStatus.map((order) => {
              return (
                <section className="menu" key={order.id}>
                  <div className="card kitchenCard">
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
                    {order.Products.map((items, index) => (
                      <div key={index}>
                        <p> {items.qtd} {items.name}</p>
                        <p>{items.flavor}</p>
                        <p>{items.complement}</p>
                        <hr />
                      </div>
                    ))}

                    <Button text="Servir" className='button' onClick={() => setStatus(order.id, 'delivered')} />

                  </div>
                </section>
              );
            })}
          </section>
        </section>

      </div></>
  );
}

export default ToDeliver;