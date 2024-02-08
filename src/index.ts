import http, { IncomingMessage, ServerResponse } from 'http';

import { bodyParser, isUser } from './utils';
import { User, DBUser } from './types';

const users: DBUser[] = [];

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await bodyParser(req);
    console.log(body);
  } catch (error) {
    console.error(error);
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(4001);
