import { IProduct } from "../schemas/product.entity";
import {
  getAllProducts as fetchAllProducts,
  getProductById as fetchProductById,
} from "../repositories/product.repository";

// Get all products
export const getAllProducts = async (): Promise<IProduct[]> => {
  return await fetchAllProducts();
};

// Get a product by ID
export const getProductById = async (
  productId: string
): Promise<IProduct | null> => {
  const product = await fetchProductById(productId);
  return product || null; // Return null if no product is found
};
