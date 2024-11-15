import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import { createOrder, getOrders } from "../controllers/order.controller";

const router = Router();

router.post("/", asyncHandler(createOrder));
router.get("/", asyncHandler(getOrders));

export default router;
