import { Request, Response } from "express";
import Cart, { ICart } from "../schemas/cart.entity";
import {
  getOrCreateCart,
  updateCart,
  clearCart,
} from "../services/cart.service";
import { getUserById, createUser } from "../repositories/user.repository";
import { createOrderFromCart } from "../services/order.service";

export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId as string;

    let user = await getUserById(userId);

    if (!user) {
      user = await createUser(userId);
    }

    const cart = await getOrCreateCart(user.id);

    // Calculate the total price
    const total = cart.items.reduce((acc, item) => {
      if ("price" in item.product) {
        return acc + item.product.price * item.count;
      }
      return acc;
    }, 0);

    // Send the response
    res.status(200).json({
      data: {
        cart: {
          id: cart._id,
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
    const userId = req.headers["x-user-id"] as string;
    const { productId, count } = req.body;

    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "Unauthorized: User ID is missing" },
      });
      return;
    }

    if (!productId || typeof count !== "number") {
      res.status(400).json({
        data: null,
        error: { message: "Invalid product ID or count" },
      });
      return;
    }

    const updatedCart = await updateCart(userId, productId, count);

    const total = updatedCart?.items.reduce((acc, item) => {
      // Use a type guard to check if `product` is populated
      if ("price" in item.product) {
        return acc + item.product.price * item.count;
      }
      return acc;
    }, 0);

    res.status(200).json({
      data: { cart: updatedCart, total },
      error: null,
    });
  } catch (error: any) {
    console.error("Error updating cart:", error.message);

    if (error.message.includes("Product with ID")) {
      // Return 404 for product not found
      res.status(404).json({
        data: null,
        error: { message: error.message },
      });
      return;
    }

    // Return 500 for other errors
    res.status(500).json({
      data: null,
      error: { message: "Internal Server Error" },
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

export const checkoutCart = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId as string; // Assuming `authenticate` middleware attaches `userId`

    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "Unauthorized: User ID is missing" },
      });
      return;
    }

    // Get the user's cart
    const cart = await getOrCreateCart(userId);

    if (!cart || cart.items.length === 0) {
      res.status(400).json({
        data: null,
        error: { message: "Cart is empty or invalid for checkout" },
      });
      return;
    }

    // Create an order from the cart
    const order = await createOrderFromCart(userId);

    if (!order) {
      res.status(500).json({
        data: null,
        error: { message: "Failed to create order during checkout" },
      });
      return;
    }

    await clearCart(userId);

    res.status(201).json({
      data: {
        message: "Checkout successful",
        order,
      },
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server Error" },
    });
  }
};
