import { uuid } from "../utils";
import { DBUser, User } from "../types";

let users: DBUser[] = [];

const getAll = () => {
  return [...users];
}

const get = (id: DBUser['id']) => {
  return users.find(user => user.id === id);
}

const add = (user: User) => {
  const id = uuid.generateId();
  const newUser = { id, ...user } as DBUser;

  users.push(newUser);

  return newUser;
}

const remove = (id: DBUser['id']) => {
  if (!has(id)) return;

  users = users.filter(user => user.id !== id);
}

const update = (id: DBUser['id'], userInfo: User) => {
  if (!has(id)) return;

  const index = users.findIndex(user => user.id === id);
  const newUser = { ...users[index], ...userInfo };

  users[index] = newUser;

  return newUser;
}

const has = (id: DBUser['id']) => {
  return users.some(user => user.id === id);
}


export default {
  getAll,
  get,
  add,
  remove,
  update,
  has,
}