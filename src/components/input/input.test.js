import { render,fireEvent } from '@testing-library/react'
import Input from './input'

test('renderizar o input', () =>{
  render(<Input onChange={() => {}} defaultValue='defaultValue'/>);
})

test('testando input', async () => {
  const { getByDisplayValue } = render(<Input />)
  getByDisplayValue('')
})

test('ao mudar o value', () => {
  const { getByDisplayValue } = render(<Input />)
  getByDisplayValue('')
  const inputElement = getByDisplayValue('')
  fireEvent.change(inputElement, { target: { value: 'name' } })
  getByDisplayValue('name')
})