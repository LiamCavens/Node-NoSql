import { ICart } from "../schemas/cart.entity";
import {
  getCartByUserId,
  createCart,
  saveCart,
} from "../repositories/cart.repository";
import { getProductById } from "../repositories/product.repository";

export const getOrCreateCart = async (userId: string): Promise<ICart> => {
  // Try to find a cart and populate products
  let cart = await getCartByUserId(userId);

  // If no cart exists, create one
  if (!cart) {
    cart = await createCart(userId);
  }

  // Always populate the product details
  await cart.populate("items.product");
  return cart;
};

export const updateCart = async (
  userId: string,
  productId: string,
  count: number
): Promise<ICart | null> => {
  const cart = await getOrCreateCart(userId); // Cart is now populated
  const product = await getProductById(productId);

  if (!product) {
    throw new Error(`Product with ID ${productId} not found.`);
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product._id.toString() === productId // Safe to access _id
  );

  if (itemIndex >= 0) {
    if (count === 0) {
      cart.items.splice(itemIndex, 1); // Remove product from cart
    } else {
      cart.items[itemIndex].count = count; // Update product count
    }
  } else if (count > 0) {
    cart.items.push({
      product, // Push the full product
      count,
    } as any); // Use `as any` if needed to bypass strict Mongoose validation
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
