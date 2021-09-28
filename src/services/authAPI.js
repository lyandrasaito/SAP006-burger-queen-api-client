export const signUp = async (data) => {
  return await fetch('https://lab-api-bq.herokuapp.com/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      restaurant: 'Burger Things',
    }),
  }).then(banana => banana.json())
};

//stringfy para enviar info
//parse para pegar info

export const signIn = async (email, password) => {
  //console.log(email, password)
  return await fetch('https://lab-api-bq.herokuapp.com/auth', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  }).then(res => res.json());
};
