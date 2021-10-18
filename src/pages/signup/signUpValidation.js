export const validation = (values) => {

  let errors = {};

  if (!values.name.trim()) {
    errors.name = 'Preencha o seu nome';
  }
  if (!values.email) {
    errors.email = 'Preencha seu email';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Formato de e-mail inválido. Tente novamente';
  }
  if (!values.password) {
    errors.password = 'Preencha com uma senha';
  } else if (values.password.length < 6) {
    errors.password = 'A senha deve conter no mínimo 6 caracteres';
  }
  if (!values.role) {
    errors.role = 'Selecione uma opção';
  } 
  return errors;
}

export default validation;