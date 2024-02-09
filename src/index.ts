import http, { IncomingMessage, ServerResponse } from 'http';

import { bodyParser, isUser, generateId, getErrorMessage } from './utils';
import { DBUser } from './types';

const users: DBUser[] = [
  {
    id: '1',
    username: 'vlad',
    age: 20,
    hobbies: ['arra'],
  }
];

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;

  if (url === '/users') {
    switch (method) {
      case 'GET':
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
        break;

      case 'POST':
        try {
          const body = await bodyParser(req);

          if (isUser(body)) {
            const id = generateId();
            const newUser = { id, ...body } as DBUser;

            users.push(newUser);

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
    }q
  }
});

server.listen(4001);
