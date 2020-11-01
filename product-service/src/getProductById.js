import productList from './productList.json';

export const getProductById = async (event) => {
  console.log('getProductById lambda called with event: ', event);
  const { productId } = event.pathParameters;

  return {
    statusCode: 200,
    body: JSON.stringify(productList[productId])
  };

};