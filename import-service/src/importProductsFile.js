import AWS from 'aws-sdk';
import { headers, errMessage } from './helpers.js';


export const importProductsFile = async (event) => {
    console.log('importProductsFile lambda called with event: ', event);

    const { BUCKET: Bucket, REGION: region } = process.env;
    const { name, contentType: ContentType } = event.queryStringParameters || {};

    const params = {
        Bucket,
        Key: `uploaded/${name}`,
        Expires: 60,
        ContentType,
    }
    try {
        const s3 = new AWS.S3({region, signatureVersion: 'v4'});
        
        const signedURL = await s3.getSignedUrlPromise('putObject', params);
        return {
          statusCode: 200,
          headers,
          body: signedURL,
          }
      } catch (err) {
          console.error('importProductsFile lambda crashed with error:', err)
          return errMessage;
      }
}