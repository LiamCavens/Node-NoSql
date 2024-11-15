import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  getCart,
  putCart,
  clearCartController,
} from "../controllers/cart.controller";

const router = Router();

router.get("/", asyncHandler(getCart));
router.put("/", asyncHandler(putCart));
router.delete("/", asyncHandler(clearCartController));

export default router;
