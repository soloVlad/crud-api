import { IncomingMessage } from 'http';

const bodyParser = (req: IncomingMessage) => {
  return new Promise((resolve, reject) => {
    const body: any[] = [];

    req.on('data', (chunk) => body.push(chunk));
    req.on('end', () => {
      const rawData = Buffer.concat(body).toString();
      const contentType = req.headers['content-type'];

      if (contentType?.includes('application/json')) {
        try {
          const parsedBody = JSON.parse(rawData);
          resolve(parsedBody);
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

export default bodyParser;