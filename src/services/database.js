const token = localStorage.getItem("token");

export const menu = async () => {
  return await fetch('https://lab-api-bq.herokuapp.com/products', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${token}`
    },
  }).then(res => res.json());
}

export default menu;