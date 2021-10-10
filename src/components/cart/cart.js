import React from 'react';
import '../../style.css';
import Button from '../button/button';

export default function Cart({ className, key, id, name, price, flavor, complement, qtd, img, onClick }) {
  return (
    <>
      <div className={className} key={key} id={id} price={price} qtd={qtd}>
        <div>
          <h1 className="" > {id} {name}</h1>
          <img src={img} className="productsImage" alt="banana"></img>
        </div>
        <div className="">
          Valor unitário: R${price},00 |
          Sabor: {flavor} |
          Complemento: {complement}  |
          Quantidade: {qtd}
          <Button onClick={onClick} className="button buttonAdd" text="-" />
        </div>
      </div>
    </>
  );
}
