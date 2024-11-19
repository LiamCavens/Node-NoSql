import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  getCart,
  putCart,
  clearCartController,
  checkoutCart,
} from "../controllers/cart.controller";

const router = Router();

router.get("/", asyncHandler(getCart));
router.put("/", asyncHandler(putCart));
router.delete("/", asyncHandler(clearCartController));
router.post("/checkout", asyncHandler(checkoutCart));

export default router;
