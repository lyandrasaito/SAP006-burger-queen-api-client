import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Button from './button.js';

it('deve renderizar um botão com o texto indicado', () => {
  const texto = "uva";
  render(<Button text="uva"></Button>);

  const btn = screen.getByText(texto);

  expect(btn).toBeInTheDocument();

});

it('deve disparar uma função de click recebida via prop', () => {
  const texto = "click";
  const onClick = jest.fn();
  render(<Button text="click" onClick={onClick}></Button>);
  expect(onClick).toHaveBeenCalledTimes(0);
  user.click(screen.getByText(texto));
});



