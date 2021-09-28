import { useState } from "react";

const useForm = (validate) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    //e.preventDefaut();

    setErrors(validate(values))
  }
  return { handleChange, handleSubmit, errors }
}

export default useForm;