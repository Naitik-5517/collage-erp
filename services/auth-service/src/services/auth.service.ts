import type { User } from "@college-erp/db";
import type { AuthTokens, LoginCredentials, RegisterData } from "@college-erp/types";
import { config } from "../config";
import { eventPublisher } from "../events";
import {
    PasswordResetRepository,
    RefreshTokenRepository,
    UserRepository,
} from "../repositories";
import {
    comparePassword,
    generateAccessToken,
    generateDeviceInfo,
    generateRefreshToken,
    generateResetToken,
    hashPassword,
    verifyRefreshToken,
} from "../utils";

export class AuthService {
  private userRepo: UserRepository;
  private refreshTokenRepo: RefreshTokenRepository;
  private passwordResetRepo: PasswordResetRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.refreshTokenRepo = new RefreshTokenRepository();
    this.passwordResetRepo = new PasswordResetRepository();
  }

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    // Check if user already exists
    const existingUser = await this.userRepo.findByEmail(data.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await this.userRepo.create({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      passwordHash,
      role: "student",
      isActive: true,
      isVerified: false,
    });

    // Generate tokens
    const tokens = await this.generateTokensForUser(user);

    // Publish event
    await eventPublisher.publishUserCreated({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      timestamp: new Date().toISOString(),
    });

    return { user, tokens };
  }

  async login(
    credentials: LoginCredentials,
    deviceInfo?: string,
    ipAddress?: string
  ): Promise<{ user: User; tokens: AuthTokens }> {
    // Find user
    const user = await this.userRepo.findByEmail(credentials.email);
    if (!user || !user.passwordHash) {
      throw new Error("Invalid credentials");
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error("Account is deactivated");
    }

    // Verify password
    const isPasswordValid = await comparePassword(
      credentials.password,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Update last login
    await this.userRepo.updateLastLogin(user.id);

    // Generate tokens
    const tokens = await this.generateTokensForUser(
      user,
      deviceInfo,
      ipAddress
    );

    // Publish event
    await eventPublisher.publishUserLoggedIn({
      userId: user.id,
      email: user.email,
      deviceInfo: deviceInfo || undefined,
      ipAddress: ipAddress || undefined,
      timestamp: new Date().toISOString(),
    });

    return { user, tokens };
  }

  async refreshAccessToken(refreshToken: string): Promise<AuthTokens> {
    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken);

    // Check if refresh token exists and is valid
    const tokenRecord = await this.refreshTokenRepo.findByToken(refreshToken);
    if (!tokenRecord) {
      throw new Error("Invalid refresh token");
    }

    // Get user
    const user = await this.userRepo.findById(payload.userId);
    if (!user || !user.isActive) {
      throw new Error("User not found or inactive");
    }

    // Generate new access token
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.getExpirySeconds(config.jwt.accessTokenExpiry),
    };
  }

  async logout(refreshToken: string): Promise<void> {
    // Revoke refresh token
    await this.refreshTokenRepo.revoke(refreshToken);
  }

  async logoutAll(userId: string): Promise<void> {
    // Revoke all refresh tokens for user
    await this.refreshTokenRepo.revokeAllForUser(userId);
  }

  async requestPasswordReset(email: string): Promise<void> {
    // Find user
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      // Don't reveal if user exists
      return;
    }

    // Generate reset token
    const token = generateResetToken();
    const expiresAt = new Date(Date.now() + config.passwordReset.tokenExpiry);

    // Save reset token
    await this.passwordResetRepo.create({
      userId: user.id,
      token,
      expiresAt,
      isUsed: false,
    });

    // Publish event (notification service will send email)
    await eventPublisher.publishPasswordResetRequested({
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    // Find reset token
    const resetRecord = await this.passwordResetRepo.findByToken(token);
    if (!resetRecord) {
      throw new Error("Invalid or expired reset token");
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword);

    // Update password
    await this.userRepo.updatePassword(resetRecord.userId, passwordHash);

    // Mark token as used
    await this.passwordResetRepo.markAsUsed(token);

    // Revoke all refresh tokens
    await this.refreshTokenRepo.revokeAllForUser(resetRecord.userId);

    // Get user for event
    const user = await this.userRepo.findById(resetRecord.userId);
    if (user) {
      // Publish event
      await eventPublisher.publishPasswordChanged({
        userId: user.id,
        email: user.email,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    // Get user
    const user = await this.userRepo.findById(userId);
    if (!user || !user.passwordHash) {
      throw new Error("User not found");
    }

    // Verify current password
    const isPasswordValid = await comparePassword(
      currentPassword,
      user.passwordHash
    );
    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const passwordHash = await hashPassword(newPassword);

    // Update password
    await this.userRepo.updatePassword(userId, passwordHash);

    // Revoke all refresh tokens
    await this.refreshTokenRepo.revokeAllForUser(userId);

    // Publish event
    await eventPublisher.publishPasswordChanged({
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
    });
  }

  async verifyEmail(userId: string): Promise<void> {
    await this.userRepo.verifyEmail(userId);
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  private async generateTokensForUser(
    user: User,
    deviceInfo?: string,
    ipAddress?: string
  ): Promise<AuthTokens> {
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Save refresh token
    const expiresAt = new Date(
      Date.now() + this.getExpiryMilliseconds(config.jwt.refreshTokenExpiry)
    );

    await this.refreshTokenRepo.create({
      userId: user.id,
      token: refreshToken,
      deviceInfo: generateDeviceInfo(deviceInfo),
      ipAddress,
      expiresAt,
      isRevoked: false,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: this.getExpirySeconds(config.jwt.accessTokenExpiry),
    };
  }

  private getExpiryMilliseconds(expiry: string): number {
    const match = expiry.match(/^(\d+)([mhd])$/);
    if (!match || !match[1]) return 15 * 60 * 1000; // default 15 minutes

    const value = Number.parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case "m":
        return value * 60 * 1000;
      case "h":
        return value * 60 * 60 * 1000;
      case "d":
        return value * 24 * 60 * 60 * 1000;
      default:
        return 15 * 60 * 1000;
    }
  }

  private getExpirySeconds(expiry: string): number {
    return Math.floor(this.getExpiryMilliseconds(expiry) / 1000);
  }
}
