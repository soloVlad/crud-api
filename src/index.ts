import http, { IncomingMessage, ServerResponse } from 'http';

import db from './db';
import { bodyParser, isUser, getErrorMessage } from './utils';

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;

  if (url === '/api/users') {
    switch (method) {
      case 'GET':
        const users = db.getAll();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
        break;

      case 'POST':
        try {
          const body = await bodyParser(req);

          if (isUser(body)) {
            const newUser = db.add(body);

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
          } else {
            throw new Error('Invalid user info. \nEnsure you specified all required fields');
          }
        } catch (error) {
          const errorMessage = getErrorMessage(error);

          res.writeHead(400, { 'Content-Type': 'text/plain' })
          res.end(errorMessage);
        }
        break;
    }
  }

  if (url && /^\/api\/users\/\w+$/.test(url)) {

  }
});

server.listen(4001);
