import { useState } from "react";
import { signIn } from "../../services/authAPI";
import { useHistory } from 'react-router-dom';
import validation from "./loginValidation";

const useForm = () => {
  localStorage.clear();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleSignup = () => {
    history.push('/signup')
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    (setErrors(validation(values)));

    signIn(values.email, values.password).then((response) => {
      if (response.code === 400) {
        alert("E-mail e/ou senha inválidos");
      } else {
        localStorage.setItem('token', response.token);
        localStorage.setItem('id', response.id);
        
        console.log(response.token)

        if (response.role === "hall") {
          history.push('/hall')
        }
        else if (response.role === "kitchen") {
          history.push('/kitchen')
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  };

  return { handleChange, handleSubmit, handleSignup, errors };
}

export default useForm;