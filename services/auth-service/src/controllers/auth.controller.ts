import type { LoginCredentials, RegisterData } from "@college-erp/types";
import type { NextFunction, Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware";
import { AuthService } from "../services";
import { getClientIp } from "../utils";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: RegisterData = req.body;
      const { user, tokens } = await this.authService.register(data);

      res.status(201).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
          },
          tokens,
        },
        message: "User registered successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const credentials: LoginCredentials = req.body;
      const deviceInfo = req.get("user-agent");
      const ipAddress = getClientIp(req);

      const { user, tokens } = await this.authService.login(
        credentials,
        deviceInfo,
        ipAddress
      );

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
          },
          tokens,
        },
        message: "Login successful",
      });
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          error: {
            code: "AUTH_1001",
            message: "Refresh token is required",
            timestamp: new Date().toISOString(),
            path: req.path,
          },
        });
        return;
      }

      const tokens = await this.authService.refreshAccessToken(refreshToken);

      res.status(200).json({
        success: true,
        data: { tokens },
        message: "Token refreshed successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          success: false,
          error: {
            code: "AUTH_1001",
            message: "Refresh token is required",
            timestamp: new Date().toISOString(),
            path: req.path,
          },
        });
        return;
      }

      await this.authService.logout(refreshToken);

      res.status(200).json({
        success: true,
        data: null,
        message: "Logout successful",
      });
    } catch (error) {
      next(error);
    }
  };

  logoutAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = (req as AuthenticatedRequest).user?.userId;

      if (!userId) {
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

      await this.authService.logoutAll(userId);

      res.status(200).json({
        success: true,
        data: null,
        message: "Logged out from all devices",
      });
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          success: false,
          error: {
            code: "AUTH_1003",
            message: "Email is required",
            timestamp: new Date().toISOString(),
            path: req.path,
          },
        });
        return;
      }

      await this.authService.requestPasswordReset(email);

      res.status(200).json({
        success: true,
        data: null,
        message: "Password reset email sent if user exists",
      });
    } catch (error) {
      next(error);
    }
  };

  resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        res.status(400).json({
          success: false,
          error: {
            code: "AUTH_1004",
            message: "Token and new password are required",
            timestamp: new Date().toISOString(),
            path: req.path,
          },
        });
        return;
      }

      await this.authService.resetPassword(token, newPassword);

      res.status(200).json({
        success: true,
        data: null,
        message: "Password reset successful",
      });
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = (req as AuthenticatedRequest).user?.userId;
      const { currentPassword, newPassword } = req.body;

      if (!userId) {
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

      if (!currentPassword || !newPassword) {
        res.status(400).json({
          success: false,
          error: {
            code: "AUTH_1005",
            message: "Current and new password are required",
            timestamp: new Date().toISOString(),
            path: req.path,
          },
        });
        return;
      }

      await this.authService.changePassword(
        userId,
        currentPassword,
        newPassword
      );

      res.status(200).json({
        success: true,
        data: null,
        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = (req as AuthenticatedRequest).user?.userId;

      if (!userId) {
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

      const user = await this.authService.getProfile(userId);

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isVerified: user.isVerified,
            avatarUrl: user.avatarUrl,
            lastLoginAt: user.lastLoginAt,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  };
}
