import mongoose, { Document, Schema } from "mongoose";

// Interface for Product
export interface IProduct extends Document {
  _id: string;
  title: string;
  description: string;
  price: number;
}

// Product Schema
const ProductSchema = new Schema<IProduct>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
