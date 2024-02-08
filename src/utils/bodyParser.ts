import http = require('http');

const bodyParser = (req: http.IncomingMessage) => {
  return new Promise((resolve, reject) => {
    const body: any[] = [];

    req.on('data', (chunk) => body.push(chunk));
    req.on('end', () => {
      const rawData = Buffer.concat(body).toString();
      const contentType = req.headers['content-type'];

      if (contentType?.includes('application/json')) {
        try {
          const parsedBody = JSON.parse(rawData);
          reject(parsedBody);
        } catch (error) {
          reject(error);
        }
      } else {
        resolve(rawData);
      }
    })
    req.on('error', (error) => {
      reject(error);
    })
  })
}

module.exports = {
  bodyParser,
};
