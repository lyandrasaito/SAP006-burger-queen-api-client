import React from 'react';

//onChange, value
const Input = ({ name, type, placeholder, className }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={className}
    />
  )
}
export default Input;
