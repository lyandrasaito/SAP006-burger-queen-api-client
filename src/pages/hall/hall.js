import { React, useState, useEffect } from 'react'
import Input from '../../components/input/input.js';
import Button from '../../components/button/button.js';
import Menu from '../../components/menu/menu.js';
import '../../../src/style.css';
import Cart from '../../components/cart/cart.js';
import { useHistory } from 'react-router-dom';
import { postOrder } from '../../services/postAPI.js';

function Hall() {
  const token = localStorage.getItem('token');
  const [client, setClient] = useState('');
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState('all-day');
  const [order, setOrder] = useState([]);
  const [table, setTable] = useState('');
  const [selectTable, setSelectTable] = useState('');
  const [error, setError] = useState({
    client: '',
    table: '',
    order: '',
  });

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
  }, [token]);

  const history = useHistory();
  const handleSignOut = (e) => {
    e.preventDefault();
    history.push('/login')
    localStorage.clear();
  }

  const selectedProducts = products.filter((prod) => prod.type === menu)

  const handleAdd = (e, item) => {
    e.preventDefault();
    //find encontra o objeto clicado
    const element = order.find(res => res.id === item.id);

    if (element) {
      element.qtd += 1;
      setOrder([...order])
      //mapeia a quantidade e se o id selecionado for o mesmo do id do produto, adiciona 1
      // setOrder(quant => quant.map(resp => resp.id === element.id ? element : resp))
    } else {
      //não tendo ainda o item, cria 1
      item.qtd = 1;
      item.subtotal = item.price;
      //abre o array de orders e adc o item
      setOrder([...order, item])

    }
  }

  const handleRemove = (e, item, index) => {
    e.preventDefault();
    const element = order.find(res => res.id === item.id);

    if (element.qtd !== 0) {
      element.qtd -= 1;
      setOrder([...order])
    }
    if (element.qtd === 0) {
      const listOrder = order;
      // remove 1 item do array
      listOrder.splice(index, 1);
      setOrder([...listOrder])
    }
  }

  const handleChange = (e) => {
    setTable(e.target.value)
    setSelectTable(e.target.value)
  }

  const total = (items) => {
    const totalPrice = items.reduce((accumulator, array) => {
      const { qtd, price } = array;
      accumulator = Number(qtd * price + accumulator)
      return accumulator
    }, 0)
    return totalPrice;
  }

  const inputValidation = () => {
    let error = {};
    error.notNull = true;
    if (order.length === 0) {
      error.order = 'Insira itens no carrinho';
      error.notNull = false;
    }
    if (!client) {
      error.client = 'Informe o nome do cliente';
      error.notNull = false;
    }
    if (!table || table >= 5) {
      error.table = 'Escolha uma mesa de 1 a 5';
      error.notNull = false;
    }
    return error;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = inputValidation();
    setError(valid)
    if (valid.notNull) {
      const orderValues = ({
        "client": client,
        "table": table,
        "products":
          order.map((item) => (
            {
              id: Number(item.id),
              qtd: Number(item.qtd),
            }))
      })
      postOrder(orderValues);
      setOrder([]);
      setClient([]);
      setSelectTable('');
    } else {
      alert("deu ruim")
    }
  }

  return (
    <><div className="container">
      <section className="menu">
        <h1>Cardápio</h1>

        <section className="" >
          <Button text="All Day" className='button' onClick={() => { setMenu('all-day'); }} />
          <Button text="Café da manhã" className='button' onClick={() => { setMenu('breakfast'); }} />
          <Button text="Sair" className='button' onClick={handleSignOut} />
        </section>

        <section>
          {/* verificação */}
          {selectedProducts && selectedProducts.map((item, index) => (
            <div className="card" key={index}>
              <div>
                <Menu
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
      <div className="container">
        <section className="">
          <h1>Carrinho</h1>

          <Input
            className="cartInput"
            placeholder="Nome do cliente: "
            name="client"
            value={client}
            onChange={(e) => setClient(e.target.value)} />

          <select onChange={handleChange} value={selectTable} name="Mesa: " className="cartInput">
            <option defaultValue>Mesa: </option>
            <option value="1">Mesa 1</option>
            <option value="2">Mesa 2</option>
            <option value="3">Mesa 3</option>
            <option value="4">Mesa 4</option>
            <option value="5">Mesa 5</option>
          </select>

          <div>{error.order && <p>{error.order}</p>} </div>
          <div>{error.table && <p>{error.table}</p>} </div>
          <div>{error.client && <p>{error.client}</p>} </div>


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

          <p className="total">Total: R$ {total(order)},00</p>

          <Button className="button" text="Despachar" onClick={(e) => handleSubmit(e)} />

        </section>

      </div></>
  );
}

export default Hall;