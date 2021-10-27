import { React, useState, useEffect } from 'react'
import Input from '../../components/input/input.js';
import Button from '../../components/button/button.js';
import Menu from '../../components/menu/menu.js';
import '../../../src/style.css';
import Cart from '../../components/cart/cart.js';
import { postOrder } from '../../services/postAPI.js';
import Modal from "../../components/modal/modal.js";
import HallHeader from '../../components/headers/hall.js';

function Hall() {
  const token = localStorage.getItem('token');
  const [client, setClient] = useState('');
  const [products, setProducts] = useState([]);
  const [menu, setMenu] = useState('hamburguer');
  const [order, setOrder] = useState([]);
  const [table, setTable] = useState('');
  const [selectTable, setSelectTable] = useState('');
  const [error, setError] = useState({
    client: '',
    table: '',
    order: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const selectedProducts = products.filter((prod) => prod.sub_type === menu)

  const handleAdd = (e, item) => {
    e.preventDefault();
    //find encontra o objeto clicado
    const element = order.find(res => res.id === item.id);

    if (element) {
      element.qtd += 1;
      setOrder([...order])
      //mapeia a quantidade e se o id selecionado for o mesmo do id do produto, adiciona 1
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

  const total = (items) => {
    const totalPrice = items.reduce((accumulator, array) => {
      const { qtd, price } = array;
      accumulator = Number(qtd * price + accumulator)
      return accumulator
    }, 0)
    return totalPrice;
  }

  const handleChange = (e) => {
    setTable(e.target.value)
    setSelectTable(e.target.value)
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
    if (!table || table > 5) {
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
      setIsModalVisible(true);
    }
  }

  return (
    <>
      <HallHeader />
      <div className="hallArea">
        <div className="container">
          <section>
            <section className="center" >
              <Button text="Hambúrgueres" className='button' onClick={() => { setMenu('hamburguer'); }} />
              <Button text="Acompanhamentos" className='button' onClick={() => { setMenu('side'); }} />
              <Button text="Bebidas" className='button' onClick={() => { setMenu('drinks'); }} />
              <Button text="Café da manhã" className='button' onClick={() => { setMenu('breakfast'); }} />
            </section>

            <section className="hallScroll">
              {/* verificação */}
              {selectedProducts && selectedProducts.map((item, index) => (
                <div className="card" key={index}>
                  <div>
                    <Menu
                      name={item.name}
                      img={item.image}
                      price={item.price}
                      flavor={item.flavor}
                      complement={item.complement === 'null' ? 'banana' : item.complement}
                      onClick={(e) => handleAdd(e, item)} />
                  </div>
                </div>
              ))}
            </section>
          </section>

        </div>
        <div className="container">
          <div className="cart center">
            <h2>Carrinho</h2>

            <Input
              className="cartInput field"
              placeholder="Nome do cliente: "
              name="client"
              value={client}
              onChange={(e) => setClient(e.target.value)} />

            <select onChange={handleChange} value={selectTable} name="Mesa: " className="cartInput field select-table">
              <option defaultValue>Mesa: </option>
              <option value="1">Mesa 1</option>
              <option value="2">Mesa 2</option>
              <option value="3">Mesa 3</option>
              <option value="4">Mesa 4</option>
              <option value="5">Mesa 5</option>
            </select>

            <div>{error.order && <p className="error-msg">{error.order}</p>} </div>
            <div>{error.table && <p className="error-msg">{error.table}</p>} </div>
            <div>{error.client && <p className="error-msg">{error.client}</p>} </div>

            <section className="hallScroll scrollCart">
              {order.map((item, index) =>
                <div key={index}>
                  <Cart
                    name={item.name}
                    price={item.price}
                    qtd={item.qtd}
                    flavor={item.flavor}
                    complement={item.complement}

                    onClick={(e) => handleRemove(e, item, index)} />
                </div>

              )}
            </section>
            <p className="total">Total: R$ {total(order)},00</p>

            <Button className="button" text="Despachar" onClick={(e) => handleSubmit(e)} />

            {isModalVisible ? (
              <Modal onClose={() => setIsModalVisible(false)}>
                <h3>Despachado</h3>
              </Modal>) : null}
          </div>

        </div>
      </div></>
  );
}

export default Hall;