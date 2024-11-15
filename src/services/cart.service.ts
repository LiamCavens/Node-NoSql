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
): Promise<ICart | null> => {
  const cart = await getOrCreateCart(userId);
  const product = await getProductById(productId);

  if (!product) {
    // If the product is not found, return null
    return null;
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
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
    // Use `product._id` directly without constructing a new ObjectId
    cart.items.push({
      product: product._id, // Mongoose automatically handles the correct ObjectId type
      count,
    } as any);
  }

  // Save the updated cart to the database
  return await saveCart(cart);
};

export const clearCart = async (userId: string): Promise<void> => {
  const cart = await getCartByUserId(userId);
  if (cart) {
    cart.items = [];
    await saveCart(cart);
  }
};
