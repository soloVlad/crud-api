import { IncomingMessage, ServerResponse } from "http";

import db from "../db";

const getAll = async (req: IncomingMessage, res: ServerResponse) => {
  const users = db.getAll();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
}

export default getAll;