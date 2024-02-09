import { generateId } from "../utils";
import { DBUser, User } from "../types";

const users: DBUser[] = [];

const getAll = () => {
  return [...users];
}

const add = (user: User) => {
  const id = generateId();
  const newUser = { id, ...user } as DBUser;

  users.push(newUser);

  return newUser;
}


export default {
  getAll,
  add,
}