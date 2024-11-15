import mongoose, { Document, Schema } from "mongoose";
import { ICartItem, CartItemSchema } from "./cart.entity";

export type ORDER_STATUS = "created" | "completed";

// const order: IOrder = {
//   uuid: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
//   userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
//   cartId: '',
//   items: cart.items,
//   status: 'created',
//   total: 2,
// };

export interface IOrder extends Document {
  uuid: string;
  userId: string;
  cartId: string;
  items: ICartItem[];
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema = new Schema<IOrder>({
  uuid: { type: String, required: true },
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  items: { type: [CartItemSchema], required: true },
  status: { type: String, required: true, enum: ["created", "completed"] },
  total: { type: Number, required: true },
});

export default mongoose.model<IOrder>("Order", OrderSchema);