import React from 'react';
import Button from '../button/button';
import '../../style.css';

export default function Menu({ onClick, className, key, id, name, price, flavor, complement, img }) {
  return (
    <>
      <div className={className} key={key} id={id} price={price}>
        <h1 className="" > {id} {name}</h1>
        <img src={img} className="productsImage"></img>

        <h1 className="" >  R${price},00</h1>
        <h1 className=""> {flavor}</h1>
        <h1 className=""> {complement}</h1>

        <Button onClick={onClick} className="button buttonAdd" text="+" />
      </div>
    </>
  );
}
