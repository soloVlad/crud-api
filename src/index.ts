import http, { IncomingMessage, ServerResponse } from 'http';

import db from './db';
import {
  bodyParser,
  isUser,
  getErrorMessage,
  uuid
} from './utils';

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

  const idRegex = /^\/api\/users\/[\w-]+$/;

  if (url && idRegex.test(url)) {
    const id = url.split('/').at(-1);
    const isValidId = uuid.isUUID(id!);

    if (!isValidId || !id) {
      res.writeHead(400, { 'Content-Type': 'text/plain' })
      res.end('userId is invalid(not uuid)');
      return;
    }

    const isExist = db.has(id);

    if (!isExist) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('User not found');
      return;
    }

    switch (method) {
      case 'GET':
        const user = db.get(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
        break;

      case 'DELETE':
        db.remove(id);
        res.writeHead(204);
        res.end();
        break;

      case 'PUT':
        try {
          const body = await bodyParser(req);

          if (isUser(body)) {
            const newUser = db.update(id, body);

            res.writeHead(200, { 'Content-Type': 'application/json' });
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
});

server.listen(4001);
