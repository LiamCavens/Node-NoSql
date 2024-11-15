import { UserEntity } from '../schemas/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { users } from '../data/users';

export const getUserById = (id: string): UserEntity | undefined => {
  return users.find((user) => user.id === id);
};

export const createUser = (id?: string): UserEntity => {
  const newUser: UserEntity = { id: id || uuidv4() };
  users.push(newUser);
  return newUser;
};
