import { Router } from "express";
import asyncHandler from "../utils/asyncHandler";
import { getUserProfile } from "../controllers/user.controller";

const router = Router();

// Get the authenticated user's profile
router.get("/profile", asyncHandler(getUserProfile));

export default router;
