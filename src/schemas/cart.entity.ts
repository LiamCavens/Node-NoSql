import mongoose, { Document, Schema } from "mongoose";

// const cartItem: CartItemEntity = {
//   product: bookProduct,
//   count: 2,
// };

export interface ICartItem extends Document {
  product: {
    _id: mongoose.Types.ObjectId;
    price: number;
  };
  count: number;
}

export const CartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  count: { type: Number, required: true },
});

// const cart: CartEntity = {
//   uuiid: '1434fec6-cd85-420d-95c0-eee2301a971d',
//   userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
//   isDeleted: false,
//   items: [cartItem],
// };

export interface ICart extends Document {
  uuid: string;
  userId: string;
  isDeleted: boolean;
  items: ICartItem[];
}

const CartSchema = new Schema<ICart>({
  uuid: { type: String, required: true },
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: { type: [CartItemSchema], required: true },
});

export default mongoose.model<ICart>("Cart", CartSchema);
