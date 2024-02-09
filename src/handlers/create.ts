import { IncomingMessage, ServerResponse } from "http";

import db from "../db";
import { bodyParser, getErrorMessage, isUser } from "../utils";

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
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
}

export default createUser;