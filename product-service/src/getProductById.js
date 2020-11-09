import { Client } from 'pg';
import { headers, errMessage } from './helpers.js';
import { DB_OPTIONS } from './constants.js';

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;
  console.log('getProductById lambda called with event: ', event);
  // get new DB client (cause using pools is not good for lambdas)
  const client = new Client(DB_OPTIONS);
  await client.connect();

  try {
  // search needed product - by id field
  const { rows } = await client.query(`
  select * from products p inner join stocks s on p.id = s.product_id where p.id = '${productId}'
  `);

  if (!rows.length){
    return {
        headers,
        statusCode: 404,
        body: "Target product was not found",
      };
  }

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(rows[0]),
  };

  } catch (err) {
    console.error('getProductById lambda crashed with error:', err)
    return errMessage;
  } finally {
    client.end();
  }

};