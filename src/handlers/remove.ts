import { IncomingMessage, ServerResponse } from "http";

import db from "../db";
import { DBUser } from "../types";

const remove = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: DBUser['id']
) => {
  db.remove(id);
  res.writeHead(204);
  res.end();
}

export default remove;