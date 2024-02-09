import { IncomingMessage, ServerResponse } from "http";

import db from "../db";
import { bodyParser, getErrorMessage, isUser } from "../utils";
import { DBUser } from "../types";

const update = async (
  req: IncomingMessage,
  res: ServerResponse,
  id: DBUser['id']
) => {
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
}

export default update;