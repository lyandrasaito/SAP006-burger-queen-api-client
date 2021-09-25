export const signUp = async (data) => {
  return await fetch('https://lab-api-bq.herokuapp.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      restaurant: 'Burger Things',
    })
      .then(data => console.log(data.json()))
  });
};

// values como parametro e chamar ele depois do stringfy
//https://dev.to/silvenleaf/fetch-api-easiest-explanation-part-1-4-get-silvenleaf-21e2
//stringfy para enviar info
//parse para pegar info

export const signIn = async (data) => {
  return await fetch('https://lab-api-bq.herokuapp.com/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    })
  });
};