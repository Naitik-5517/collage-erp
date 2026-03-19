import { Router } from "express";
import { AuthController } from "../controllers";
import { authenticate, validate } from "../middleware";
import {
    changePasswordValidator,
    forgotPasswordValidator,
    loginValidator,
    refreshTokenValidator,
    registerValidator,
    resetPasswordValidator,
} from "../validators";

export const router = Router();
const authController = new AuthController();

// Public routes
router.post("/auth/register", validate(registerValidator), authController.register);
router.post("/auth/login", validate(loginValidator), authController.login);
router.post("/auth/refresh", validate(refreshTokenValidator), authController.refreshToken);
router.post("/auth/logout", validate(refreshTokenValidator), authController.logout);
router.post("/auth/forgot-password", validate(forgotPasswordValidator), authController.forgotPassword);
router.post("/auth/reset-password", validate(resetPasswordValidator), authController.resetPassword);

// Protected routes
router.post("/auth/change-password", authenticate, validate(changePasswordValidator), authController.changePassword);
router.post("/auth/logout-all", authenticate, authController.logoutAll);
router.get("/auth/profile", authenticate, authController.getProfile);

// Health check
router.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "auth-service" });
});
