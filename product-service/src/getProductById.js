import productList from './productList.json';

const headers = { "Access-Control-Allow-Origin": "*" };

export const getProductById = async (event) => {
  console.log('getProductById lambda called with event: ', event);
  const { productId } = event.pathParameters;
  // search needed product - by id field
  const product = productList.find((prod) => prod.id === productId);

  if (product === -1){
    return {
        headers,
        statusCode: 404,
        body: "Target product was not found",
      };
  }

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(product),
  };

};