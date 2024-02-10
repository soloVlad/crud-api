import { v4 as uuid, validate } from 'uuid';

const generateId = () => {
  return uuid();
}

const isUUID = (str: string) => {
  return validate(str);
}

export default {
  generateId,
  isUUID,
};