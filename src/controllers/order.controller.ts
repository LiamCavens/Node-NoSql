import { Request, Response } from "express";
import {
  createOrderFromCart,
  getOrdersForUser,
} from "../services/order.service";

// Create a new order from the cart
export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId; // Assuming `authenticate` middleware attaches `userId` to `req`
    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "Unauthorized: User ID is missing" },
      });
      return;
    }

    const order = await createOrderFromCart(userId);
    if (!order) {
      res.status(400).json({
        data: null,
        error: {
          message: "Cannot create order. Cart may be empty or invalid.",
        },
      });
      return;
    }

    res.status(201).json({
      data: order,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server error" },
    });
  }
};

// Get all orders for the authenticated user
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "Unauthorized: User ID is missing" },
      });
      return;
    }

    const orders = await getOrdersForUser(userId);
    res.status(200).json({
      data: orders,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server error" },
    });
  }
};