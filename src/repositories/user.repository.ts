import User, { IUser } from "../schemas/user.entity";
import { v4 as uuidv4 } from "uuid";

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await User.findOne({ _id: id });
};

export const createUser = async (id?: string): Promise<IUser> => {
  // This would be done on a sign up form
  const newUser = new User({
    _id: id || uuidv4(),
    name: "New User",
    email: "example@gmail.com",
    password: "password123",
  });
  await newUser.save();
  return newUser;
};
