import { Request, Response, NextFunction } from "express";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    return res.status(401).json({
      data: null,
      error: { message: "User is not authorized" },
    });
  }

  next();
};
