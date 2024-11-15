import { ProductEntity } from '../schemas/product.entity';
import { products } from '../data/products';

export const getAllProducts = (): ProductEntity[] => {
  return products;
};

export const getProductById = (id: string): ProductEntity | undefined => {
  return products.find((product) => product.id === id);
};
