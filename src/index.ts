import http, { IncomingMessage, ServerResponse } from 'http';

import { bodyParser, isUser, generateId } from './utils';
import { DBUser } from './types';

const users: DBUser[] = [
  {
    id: 1,
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
    }
  }

  // try {
  //   const body = await bodyParser(req);
  //   console.log(body);
  // } catch (error) {
  //   console.error(error);
  // }

  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // res.end(JSON.stringify({
  //   data: 'Hello World!',
  // }));
});

server.listen(4001);
