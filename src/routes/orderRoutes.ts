import { Router, Request, Response } from "express";
import {
  createOrderFromCart,
  getOrdersForUser,
} from "../services/order.service";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

// Create an order from the user's cart
router.post(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId; // Get userId from the authenticate middleware
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID is missing" });
      return;
    }

    const order = await createOrderFromCart(userId);
    if (!order) {
      res.status(400).json({
        message: "Cannot create order. Cart may be empty or invalid.",
      });
      return;
    }

    res.status(201).json(order);
  })
);

// Get all orders for the authenticated user
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized: User ID is missing" });
      return;
    }

    const orders = await getOrdersForUser(userId);
    res.json(orders);
  })
);

export default router;
