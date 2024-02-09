import { v4 as uuid } from 'uuid';

const generateId = () => {
  return uuid();
}

export default generateId;