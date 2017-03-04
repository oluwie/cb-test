
const http = require('http');

const API = 'http://localhost:8888/content';

function main() {

  http.get(API, (response) => {
    const statusCode = response.statusCode;
    let rawData = '';
    let parsedData;

    if(statusCode !== 200) {
      // handle error.
      // TODO: handle error

      // free up memory
      response.resume();
      return;
    }

    response
      .on('data', (chunk) => rawData += chunk)
      .on('end',  () => {
        try {
          parsedData = JSON.parse(rawData);
        }
        catch(err){
          throw new Error(err);
        }
      })
      .on('error', (err) => {
        throw new Error(err);
      });
  });
}

exports = module.exports = main;
