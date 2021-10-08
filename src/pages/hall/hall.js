import { React, useState, useEffect } from 'react'
import Input from '../../components/input/input.js';
import Button from '../../components/button/button.js';
import Menu from '../../components/menu/menu.js';
import '../../../src/style.css';
import Cart from '../../components/cart/cart.js';
import { useHistory } from 'react-router-dom';

function Hall() {
  const token = localStorage.getItem('token');

  const [client, setClient] = useState('');
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState('all-day');
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch('https://lab-api-bq.herokuapp.com/products', {
      headers: {
        Authorization: `${token}`,
        accept: "application/json",
      }
    }).then((response) =>
      response.json()
    ).then((json) => {
      setProducts(json)
    })
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChangeClient = (e) => {
    const name = e.target.value;
    setClient(name);
  };

  const history = useHistory();
  const handleSignOut = (e) => {
    e.preventDefault();
    history.push('/login')
    localStorage.clear();
    alert("xau");
  }

  const selectedProducts = products.filter((prod) => prod.type === menu)

  const handleAdd = (e, item) => {
    e.preventDefault();
    //find encontra o objeto clicado
    const element = order.find(res => res.id === item.id);

    if (element) {
      element.qtd += 1;
      //mapeia a quantidade e se o id selecionado for o mesmo do id do produto, adiciona 1
      // setOrder(quant => quant.map(resp => resp.id === element.id ? element : resp))
    } else {
      //não tendo ainda o item, cria 1
      item.qtd = 1;
      //abre o array de orders e adc o item
      setOrder([...order, item])

    }
  }

  const handleRemove = (e, item, index) => {
    e.preventDefault();
    const element = order.find(res => res.id === item.id);

    if (element.qtd !== 0) {
      element.qtd -= 1;
    }
    if (element.qtd === 0) {
      // alert("banana")
      const listOrder = order;
      // remove 1 item do array
      listOrder.splice(index, 1);
      setOrder([...listOrder])
    }
  }

  return (
    <><div className="hall">
      <section className="menu">
        <h1>Cardápio</h1>

        <section className="">
          <Button text="All Day" className='button' onClick={() => { setMenu('all-day'); }} />
          <Button text="Café da manhã" className='button' onClick={() => { setMenu('breakfast'); }} />
          <Button text="Sair" className='button' onClick={handleSignOut} />
        </section>

        <section>
          {/* verificação */}
          {selectedProducts && selectedProducts.map((item, index) => (
            <div className="banana">
              <div key={index}>
                <Menu
                  className="card"
                  name={item.name}
                  img={item.image}
                  price={item.price}
                  flavor={item.flavor}
                  complement={item.complement}
                  onClick={(e) => handleAdd(e, item)} />
              </div>
            </div>
          ))}
        </section>
      </section>

    </div>
      <div className="hall">
        <section className="">
          <h1>Carrinho</h1>
          <select name="Mesa: ">
            <option valeu="table1">Mesa 1</option>
            <option valeu="table2">Mesa 2</option>
            <option valeu="table3">Mesa 3</option>
            <option valeu="table4">Mesa 4</option>
            <option valeu="table5">Mesa 5</option>
          </select>

          <Input
            className=""
            placeholder="Nome do cliente: "
            name="client"
            value={client}
            onChange={onChangeClient} />
          {order.map((item, index) =>
            <div key={index}>
              <Cart
                name={item.name}
                img={item.image}
                price={item.price}
                qtd={item.qtd}
                flavor={item.flavor}
                complement={item.complement}
                onClick={(e) => handleRemove(e, item, index)} />
            </div>

          )}

          <Button className="button" text="Despachar para a cozinha" onClick={(e) => handleSubmit(e)} />

        </section>

      </div></>
  );
}

export default Hall;