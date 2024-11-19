import mongoose from "mongoose";
import { ICart } from "../schemas/cart.entity";
import {
  createCart,
  getCartByUserId,
  saveCart,
} from "../repositories/cart.repository";
import { getProductById } from "../repositories/product.repository";

export const getOrCreateCart = async (userId: string): Promise<ICart> => {
  let cart = await getCartByUserId(userId);
  if (!cart) {
    cart = await createCart(userId);
  }
  return cart;
};

export const updateCart = async (
  userId: string,
  productId: string,
  count: number
): Promise<ICart> => {
  const cart = await getOrCreateCart(userId);

  const productObjectId = new mongoose.Types.ObjectId(productId);
  // Fetch the product from the database
  const product = await getProductById(productObjectId);

  if (!product) {
    // If the product is not found, throw an error
    throw new Error(`Product with ID ${productId} not found.`);
  }

  // Find the index of the product in the cart
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productObjectId.toString()
  );

  if (itemIndex >= 0) {
    if (count === 0) {
      // Remove the product from the cart if count is 0
      cart.items.splice(itemIndex, 1);
    } else {
      // Update the count of the existing product
      cart.items[itemIndex].count = count;
    }
  } else if (count > 0) {
    cart.items.push({
      product: product._id,
      count,
    } as any);
  }

  return await saveCart(cart);
};

export const clearCart = async (userId: string): Promise<void> => {
  const cart = await getCartByUserId(userId);
  if (cart) {
    cart.items = [];
    await saveCart(cart);
  }
};
