import type { NextFunction, Request, Response } from 'express';

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("Error:", error);

  // Handle known errors
  if (error.message === "User with this email already exists") {
    res.status(409).json({
      success: false,
      error: {
        code: "AUTH_1008",
        message: error.message,
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
    return;
  }

  if (error.message === "Invalid credentials") {
    res.status(401).json({
      success: false,
      error: {
        code: "AUTH_1000",
        message: error.message,
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
    return;
  }

  if (error.message === "Account is deactivated") {
    res.status(403).json({
      success: false,
      error: {
        code: "AUTH_1009",
        message: error.message,
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
    return;
  }

  if (
    error.message === "Invalid refresh token" ||
    error.message === "Invalid or expired reset token"
  ) {
    res.status(401).json({
      success: false,
      error: {
        code: "AUTH_1006",
        message: error.message,
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
    return;
  }

  if (error.message === "User not found or inactive") {
    res.status(404).json({
      success: false,
      error: {
        code: "AUTH_1010",
        message: "User not found",
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
    return;
  }

  if (error.message === "Current password is incorrect") {
    res.status(400).json({
      success: false,
      error: {
        code: "AUTH_1011",
        message: error.message,
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
    return;
  }

  // Handle validation errors
  if (error.name === "ZodError") {
    res.status(422).json({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Validation failed",
        details: error,
        timestamp: new Date().toISOString(),
        path: req.path,
      },
    });
    return;
  }

  // Default error
  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "An internal error occurred",
      timestamp: new Date().toISOString(),
      path: req.path,
    },
  });
}
