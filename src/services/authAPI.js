export const signUp = async (name, email, password, role) => {
  return await fetch('https://lab-api-bq.herokuapp.com/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
      role: role,
      restaurant: "Burger Things",
    }),
  }).then(res => res.json())
};

export const signIn = async (email, password) => {
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
