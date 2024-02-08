import http = require('http');

const { bodyParser } = require('./utils/bodyParser');

const server = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
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
