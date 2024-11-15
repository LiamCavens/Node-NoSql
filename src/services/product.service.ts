

import { IProduct } from '../schemas/product.entity';
import { getAllProducts, getProductById } from '../repositories/product.repository';

export const fetchAllProducts = (): IProduct[] => {
  return getAllProducts();
};

export const fetchProductById = (id: string): IProduct | null => {
  const product = getProductById(id);
  return product || null;
};
