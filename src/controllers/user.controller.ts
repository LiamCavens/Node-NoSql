import { Request, Response } from "express";
import User from "../schemas/user.entity";

// Get the user profile
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        data: null,
        error: { message: "Unauthorized: User ID is missing" },
      });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        data: null,
        error: { message: "User not found" },
      });
      return;
    }

    res.status(200).json({
      data: user,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: { message: "Internal Server error" },
    });
  }
};