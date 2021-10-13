// export const postOrder = async (values) => {
//   const token = localStorage.getItem('token');
//   return await fetch('https://lab-api-bq.herokuapp.com/orders', {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       "Content-Type": "application/json",
//       'Authorization': `${token}`,
//     },
//     body: JSON.stringify(values)
//   }).then(res => res.json())
//     .catch(e => console.log(e))
// };

export const postOrder = async (orderValues) => {
  const token = localStorage.getItem('token');
  return await fetch('https://lab-api-bq.herokuapp.com/orders', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `${token}`,
    },
    body: JSON.stringify(orderValues)
  })
}

