import { Router, Request, Response } from "express";
import Product from "../schemas/product.entity";
import asyncHandler from "../utils/asyncHandler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find();
    res.json(products);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  })
);

export default router;
