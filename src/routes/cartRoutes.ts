import { Router, Request, Response } from "express";
import {
  getOrCreateCart,
  updateCart,
  clearCart,
} from "../services/cart.service";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

// Get cart route
router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;
    const cart = await getOrCreateCart(userId!);
    res.json(cart);
  })
);

// Update cart route
router.put(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId;
    const { productId, count } = req.body;

    const updatedCart = await updateCart(userId!, productId, count);
    if (!updatedCart) {
      res.status(404).json({ message: "Product not found or invalid count" });
      return;
    }

    res.json(updatedCart);
  })
);

// Clear cart route
router.delete(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.userId; // Assumes `authenticate` middleware has set this
    await clearCart(userId!);
    res.status(204).send();
  })
);

export default router;
