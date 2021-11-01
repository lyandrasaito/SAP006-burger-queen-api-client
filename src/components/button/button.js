import React from 'react';

function Button({ onClick, text, className, type }) {
  return (
    <button onClick={onClick} className={className} type={type}>
      {text}
    </button>
  );
};

export default Button;
