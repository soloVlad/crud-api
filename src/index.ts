import http, { IncomingMessage, ServerResponse } from 'http';

import db from './db';
import handlers from './handlers';
import {
  bodyParser,
  isUser,
  getErrorMessage,
  uuid
} from './utils';

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const { url, method } = req;
    const idRegex = /^\/api\/users\/[\w-]+$/;

    if (url === '/api/users') {
      switch (method) {
        case 'GET':
          await handlers.getAll(req, res);
          break;

        case 'POST':
          await handlers.createUser(req, res);
          break;
      }
    }
    else if (url && idRegex.test(url)) {
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
          await handlers.getById(req, res, id);
          break;

        case 'DELETE':
          await handlers.remove(req, res, id);
          break;

        case 'PUT':
          await handlers.update(req, res, id);
          break;
      }
    }
    else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Unknown route');
    }
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end(errorMessage);
  }
});

server.listen(4001);
