export const validation = (values) => {

  let errors = {};

  if (!values.email) {
    errors.email = "E-mail obrigatório";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Formato de e-mail inválido";
  }

  if (!values.password) {
    errors.password = "Senha obrigatória";
  } else if (values.password.length < 6) {
    errors.password = "Senha muito curta";
  }
  return errors;
}

export default validation;