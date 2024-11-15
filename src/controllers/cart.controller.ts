import { Request, Response } from "express";
import {
  getOrCreateCart,
  updateCart,
  clearCart,
} from "../services/cart.service";
import { getUserById, createUser } from "../repositories/user.repository";

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId as string; // Assumes `authenticate` middleware sets `userId`

    let user = await getUserById(userId);
    if (!user) {
      user = await createUser(userId);
    }

    const cart = await getOrCreateCart(user.id);

    const total = cart.items.reduce(
      (acc: number, item: { product: { price: number }; count: number }) =>
        acc + item.product.price * item.count,
      0
    );

    res.status(200).json({
      data: {
        cart: {
          id: cart.id,
          items: cart.items,
        },
        total,
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

export const putCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId as string;
    const { productId, count } = req.body;

    const cart = await updateCart(userId, productId, count);
    if (!cart) {
      res
        .status(400)
        .json({ data: null, error: { message: "Products are not valid" } });
      return;
    }

    const total = cart.items.reduce(
      (acc: number, item: { product: { price: number }; count: number }) =>
        acc + item.product.price * item.count,
      0
    );

    res.status(200).json({
      data: { cart, total },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server error" },
    });
  }
};

export const clearCartController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId as string;

    if (!userId) {
      res.status(403).json({
        data: null,
        error: { message: "You must be authorized user" },
      });
      return;
    }

    const user = await getUserById(userId);
    if (!user) {
      res.status(401).json({
        data: null,
        error: { message: "User is not authorized" },
      });
      return;
    }

    await clearCart(userId);

    res.status(200).json({
      data: { message: "Cart cleared successfully" },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server error" },
    });
  }
};
