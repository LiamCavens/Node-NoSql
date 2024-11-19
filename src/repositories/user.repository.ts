import User, { IUser } from "../schemas/user.entity";
import { v4 as uuidv4 } from "uuid";

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findOne({ _id: id });
};

export const createUser = async (id?: string): Promise<IUser> => {
  const newUser = new User({ _id: id || uuidv4() });
  return await newUser.save();
};