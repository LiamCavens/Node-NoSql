import mongoose from "mongoose";
import Product, { IProduct } from "../schemas/product.entity";

export const getAllProducts = async (): Promise<IProduct[]> => {
  return await Product.find();
};

export const getProductById = async (
  id: string | mongoose.Types.ObjectId
): Promise<IProduct | null> => {
  return await Product.findById(id);
};

export const addProduct = async (
  productData: Partial<IProduct>
): Promise<IProduct> => {
  const product = new Product(productData);
  return await product.save();
};

export const addProducts = async (
  products: Partial<IProduct[]>
): Promise<IProduct[]> => {
  return await Product.insertMany(products);
};

export const deleteProductById = async (
  id: string
): Promise<IProduct | null> => {
  return await Product.findByIdAndDelete(id);
};

export const deleteAllProducts = async (): Promise<void> => {
  await Product.deleteMany({});
};
