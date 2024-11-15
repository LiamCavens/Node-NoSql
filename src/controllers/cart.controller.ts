import { Request, Response } from "express";
import {
  getOrCreateCart,
  updateCart,
  clearCart,
} from "../services/cart.service";
import { getUserById, createUser } from "../repositories/user.repository";

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    // Check if the user exists, create if not
    let user = getUserById(userId);
    if (!user) {
      user = createUser(userId);
    }

    // Retrieve or create the cart for the user without needing `userId` in the cart
    const cart = await getOrCreateCart(user.id);

    // Calculate the total for the cart
    const total = cart.items.reduce(
      (acc: number, item: { product: { price: number; }; count: number; }) => acc + item.product.price * item.count,
      0
    );

    // Respond with the cart data and total
    res.status(200).json({
      data: {
        cart: {
          id: cart.id,
          items: cart.items,
        },
        total: total,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server error" },
    });
  }
};

export const putCart = async (req: Request, res: Response) => {
  const userId = req.headers["x-user-id"] as string;
  const { productId, count } = req.body;

  const cart = await updateCart(userId, productId, count);
  if (!cart) {
    return res
      .status(400)
      .json({ data: null, error: { message: "Products are not valid" } });
  }

  const total = cart.items.reduce(
    (acc: number, item: { product: { price: number; }; count: number; }) => acc + item.product.price * item.count,
    0
  );

  res.status(200).json({
    data: { cart, total },
    error: null,
  });
};

export const clearCartController = (req: Request, res: Response) => {
  try {
    const userId = req.headers["x-user-id"] as string;

    if (!userId) {
      return res.status(403).json({
        data: null,
        error: { message: "You must be authorized user" },
      });
    }

    const user = getUserById(userId);
    if (!user) {
      return res.status(401).json({
        data: null,
        error: { message: "User is not authorized" },
      });
    }

    clearCart(userId);

    res.status(200).json({
      data: { message: "Cart cleared successfully" },
      error: null,
    });
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({
      data: null,
      error: { message: "Internal Server error" },
    });
  }
};
