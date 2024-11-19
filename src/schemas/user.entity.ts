import mongoose, { Document, Schema } from "mongoose";

// const user: IUser = {
//   _id: '123',
//   name: 'John Doe',
//   email: 'johndoe@email.com',
//   password: 'password123',
// };

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>("User", UserSchema);