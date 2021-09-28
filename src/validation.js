export default function validation(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = 'Preencha o seu nome';
  }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = '';
  // }

  if (!values.email) {
    errors.email = 'Preencha seu email';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email inválido. Tente novamente';
  }
  if (!values.password) {
    errors.password = 'Preencha com uma senha';
  } else if (values.password.length < 6) {
    errors.password = 'A senha deve conter no mínimo 6 caracteres';
  }

  return errors;
}