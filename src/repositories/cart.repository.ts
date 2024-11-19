import Cart, { ICart } from "../schemas/cart.entity";
import { v4 as uuidv4 } from "uuid";

// Retrieve or create a cart for a user
export const getOrCreateCart = async (userId: string): Promise<ICart> => {
  let cart = await Cart.findOne({ userId, isDeleted: false });
  if (!cart) {
    cart = new Cart({
      _id: uuidv4(),
      userId,
      isDeleted: false,
      items: [],
    });
    await cart.save();
  }
  return cart;
};

// Retrieve a cart by user ID
export const getCartByUserId = async (
  userId: string
): Promise<ICart | null> => {
  try {
    const cart = await Cart.findOne({ userId, isDeleted: false }).populate({
      path: "items.product",
      model: "Product",
    });

    return cart;
  } catch (error) {
    console.error("Error fetching cart by user ID:", error);
    throw new Error("Failed to retrieve cart.");
  }
};


// Create a new cart for a user
export const createCart = async (userId: string): Promise<ICart> => {
  const newCart = new Cart({
    _id: uuidv4(),
    userId,
    isDeleted: false,
    items: [],
  });
  await newCart.save();
  return newCart;
};

export const saveCart = async (cart: ICart): Promise<ICart> => {
  try {
    // If `cart` is already a Mongoose document, call `.save()` directly
    if (cart instanceof Cart) {
      return await cart.save();
    }

    console.log("Liam:cart in repo");
    console.log(cart);

    // If `cart` is a plain object, find the cart and update it
    const existingCart = await Cart.findById(cart._id);
    if (existingCart) {
      existingCart.items = cart.items; // Update items array
      existingCart.isDeleted = cart.isDeleted; // Update isDeleted status
      return await existingCart.save();
    }

    // If the cart doesn't exist, create a new one
    const newCart = new Cart(cart);
    return await newCart.save();
  } catch (error) {
    console.error("Error saving cart:", error);
    throw new Error("Failed to save the cart.");
  }
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
