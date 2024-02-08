import { User } from "../types";

const isUser = (user: any): user is User => {
  return (
    typeof user === 'object' && user !== null &&
    Object.hasOwn(user, 'username') && typeof user.username === 'string' &&
    Object.hasOwn(user, 'age') && typeof user.age === 'number' &&
    Object.hasOwn(user, 'hobbies') && isArrayOfType(user.hobbies, 'string')
  )
}

const isArrayOfType = (array: any, givenType: string) => {
  return Array.isArray(array) && array.every(item => typeof item === givenType);
}

export default isUser;