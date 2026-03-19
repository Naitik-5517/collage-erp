import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils";

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: {
          code: "AUTH_1002",
          message: "No token provided",
          timestamp: new Date().toISOString(),
          path: req.path,
        },
      });
      return;
    }

    const token = authHeader.substring(7);

    try {
      const payload = verifyAccessToken(token);
      (req as AuthenticatedRequest).user = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      };
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        error: {
          code: "AUTH_1006",
          message: "Invalid or expired token",
          timestamp: new Date().toISOString(),
          path: req.path,
        },
      });
    }
  } catch (error) {
    next(error);
  }
}

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;

    if (!user) {
      res.status(401).json({
        success: false,
        error: {
          code: "AUTH_1002",
          message: "Unauthorized",
          timestamp: new Date().toISOString(),
          path: req.path,
        },
      });
      return;
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
      res.status(403).json({
        success: false,
        error: {
          code: "AUTH_1007",
          message: "Insufficient permissions",
          timestamp: new Date().toISOString(),
          path: req.path,
        },
      });
      return;
    }

    next();
  };
}
