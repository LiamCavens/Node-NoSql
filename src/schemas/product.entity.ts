import mongoose, { Document, Schema } from "mongoose";

// const product: IProduct = {
//   id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
//   title: 'Book',
//   description: 'A very interesting book',
//   price: 100,
// };

export interface IProduct extends Document {
  uuid: string; 
  title: string;
  description: string;
  price: number;
}

const ProductSchema = new Schema<IProduct>({
  uuid: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);