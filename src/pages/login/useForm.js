import { useState } from "react";
import { signIn } from "../../services/authAPI";
import { useHistory } from 'react-router-dom';

const useForm = () => {
  localStorage.clear();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  //const [errors, setErrors] = useState({});

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

    signIn(values.email, values.password).then((response) => {
        if (response.code === 400) {
          console.log("E-mail e/ou senha inválidos");
        } else {          
          localStorage.setItem('token', response.token);
          localStorage.setItem('id', response.id);

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

  return { handleChange, handleSubmit, handleSignup };
}

export default useForm;