import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = req.header("x-user-id");

  if (!userId) {
    // If `userId` is missing, respond with a 401 status and terminate the request.
    res.status(401).json({ message: "Unauthorized: User ID is missing" });
    return;
  }

  req.userId = userId; // Attach the user ID to the request
  next(); // Call next() to proceed to the next middleware or route handler
};
