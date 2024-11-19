import mongoose, { Document, Schema } from "mongoose";
import { IProduct } from "./product.entity";

export interface ICartItem extends Document {
  product: IProduct;
  count: number;
}

export const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference the Product model
  count: { type: Number, required: true },
});

export interface ICart extends Document {
  _id: string; // UUID
  userId: string;
  isDeleted: boolean;
  items: ICartItem[];
}

const CartSchema = new Schema<ICart>({
  _id: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: { type: [CartItemSchema], required: true },
});

export default mongoose.model<ICart>("Cart", CartSchema);
