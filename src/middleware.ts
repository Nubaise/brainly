import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export function userMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "JWT secret not configured" });
  }

  try {
    const decoded = jwt.verify(token, secret);

    // runtime-safe check: verify it's an object and has a string userId
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded &&
      typeof (decoded as any).userId === "string"
    ) {
      req.userId = (decoded as any).userId;
      next();
    } else {
      return res.status(401).json({ message: "Invalid token payload" });
    }
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}
