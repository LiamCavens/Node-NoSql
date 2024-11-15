import Cart, { ICart } from "../schemas/cart.entity";
import { v4 as uuidv4 } from 'uuid';

// Retrieve or create a cart for a user
export const getOrCreateCart = async (userId: string): Promise<ICart> => {
  let cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    cart = new Cart({
      uuid: uuidv4(),
      userId,
      isDeleted: false,
      items: [],
    });
    await cart.save();
  }
  return cart;
};

// Retrieve a cart by user ID
export const getCartByUserId = async (userId: string): Promise<ICart | null> => {
  return await Cart.findOne({ userId, isDeleted: false });
};

// Create a new cart for a user
export const createCart = async (userId: string): Promise<ICart> => {
  const newCart = new Cart({
    uuid: uuidv4(),
    userId,
    isDeleted: false,
    items: [],
  });
  await newCart.save();
  return newCart;
};

export const saveCart = async (cart: ICart): Promise<ICart> => {
  return await Cart.findByIdAndUpdate(cart._id, cart, { new: true, upsert: true });
};

export const deleteCartByUserId = async (userId: string): Promise<void> => {
  await Cart.findOneAndUpdate({ userId }, { isDeleted: true });
};

export const clearCart = async (userId: string): Promise<void> => {
  const cart = await Cart.findOne({ userId, isDeleted: false });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
};
