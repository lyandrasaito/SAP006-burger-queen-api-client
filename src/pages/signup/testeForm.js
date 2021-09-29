import { useState } from "react";
import { signUp } from "../../services/authAPI.js";

const useForm = () => {

  localStorage.clear();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  //const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signUp(values.name, values.email, values.password, values.role).then((response) => {
        if (response.code === 400) {
          console.log("Dados obrigatórios ausentes")
        } else if (response.code === 403) {
          console.log("E-mail em uso")
        } else {
          console.log(response.token);

          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);

          console.log("DEU CERTO AAAAAAAAAA")
        }
      })
      .catch((error) => {
        console.log(error)
      });

    //setErrors(validate(values))
  }
  return { handleChange, handleSubmit }
}

export default useForm;