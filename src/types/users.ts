export type User = {
  username: string;
  age: number;
  hobbies: string[];
};

export type DBUser = User & {
  id: string;
}