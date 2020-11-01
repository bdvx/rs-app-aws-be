import productList from './productList.json';

export const getAllProducts = async (event) => {
  console.log('getAllProducts lambda called with event: ', event);

  return {
    headers: { "Access-Control-Allow-Origin": "*" },
    statusCode: 200,
    body: JSON.stringify(productList)
  };

};