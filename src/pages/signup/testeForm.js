import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from '../../services/authAPI';

const useForm = (validate) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const handleChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const history = useHistory()

  const handleSubmit = e => {
    setErrors(validate(values))
    let errorMsg = '';
    signUp(values.name, values.email, values.password, values.role)
    .then((response) => {
      if (response.code === 400){
        errorMsg = 'Responda os dados obrigatórios';
      } else if (response === 403) {
        errorMsg = 'Email já cadastrado';
        if (response === 200){
          history.push('/login')
        }
      } 
    },
    
  )}
  
  return { handleChange, values, handleSubmit, errors }
}

export default useForm;