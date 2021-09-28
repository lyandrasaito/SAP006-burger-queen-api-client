import React from 'react';

function PError({ errors }) {
  return (
    <p>
      {errors.name}
    </p>
  );
}

export default PError;