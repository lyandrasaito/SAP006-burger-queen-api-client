import React from 'react';

//onChange, value
const Input = ({ name, type, placeholder, className, value }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={className}
      value={value.name}
    />
  )
}
export default Input;
