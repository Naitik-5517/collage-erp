import type { LoginCredentials, RegisterData, AuthTokens } from '@college-erp/types';

/**
 * Auth Service Contract
 */
export interface AuthServiceContract {
  login(credentials: LoginCredentials): Promise<AuthTokens>;
  register(data: RegisterData): Promise<{ userId: string }>;
  logout(userId: string): Promise<void>;
  refreshToken(refreshToken: string): Promise<AuthTokens>;
  verifyToken(token: string): Promise<{ valid: boolean; payload?: any }>;
  resetPassword(email: string): Promise<void>;
  changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void>;
}

/**
 * Auth Service API Endpoints
 */
export const AuthEndpoints = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  VERIFY: '/auth/verify',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  OAUTH_GOOGLE: '/auth/oauth/google',
  OAUTH_MICROSOFT: '/auth/oauth/microsoft',
} as const;
