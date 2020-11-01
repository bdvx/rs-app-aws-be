import productList from './productList.json';

export const getProductById = async (event) => {
  console.log('Lambda invocation with event: ', event);
  const { productId } = event.queryStringParams.productId

  return {
    statusCode: 200,
    body: JSON.stringify(productList[productId])
  };

};