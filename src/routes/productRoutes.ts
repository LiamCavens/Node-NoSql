import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import { getProducts, getProductById } from "../controllers/product.controller";

const router = Router();

router.get("/", asyncHandler(getProducts));
router.get("/:id", asyncHandler(getProductById));

export default router;
