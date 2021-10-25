import React from 'react';
import '../../style.css';
import Button from '../button/button';

export default function Cart({ className, key, id, name, price, flavor, complement, qtd, onClick }) {
  return (
    <>
      <div className={className} key={key} id={id} price={price} qtd={qtd}>
        <div>
          <h4> {id} {name}</h4>
        </div>
        <div>
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
