import React from 'react';

function P({ errors }) {
  return (
    <p>
      {errors.name}
    </p>
  );
}

export default P;