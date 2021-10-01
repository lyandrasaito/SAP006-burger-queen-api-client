import { useState } from "react";
import { signUp } from "../../services/authAPI.js";
import { useHistory } from "react-router";
import { validation } from './signUpValidation.js'

const useForm = () => {

  localStorage.clear();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const history = useHistory()
  const handleLogin = () => history.push('/login')

  const handleSubmit = (e) => {
    e.preventDefault();

    (setErrors(validation(values)));

    signUp(values.name, values.email, values.password, values.role)
      .then((response) => {
        if (response.code === 400) {
          console.log("Dados obrigatórios ausentes")
        } else if (response.code === 403) {
          console.log("E-mail em uso")
        } else {
          console.log(response.token);

          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);

          console.log("DEU CERTO AAAAAAAAAA")
          handleLogin();
        }
      })
      .catch((errors) => {
        console.log(errors)
      });
  }
  return { handleChange, handleSubmit, errors }
}

export default useForm;