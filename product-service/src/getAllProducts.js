import productList from './productList.json';

export const getAllProducts = async (event) => {
  console.log('getAllProducts called with event: ', event);

  return {
    statusCode: 200,
    body: JSON.stringify(productList)
  };

};