import { IncomingMessage, ServerResponse } from "http";

import db from "../db";
import { DBUser } from "../types";

const getById = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: DBUser['id']
) => {
  const user = db.get(id);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
}

export default getById;