import type { JWTPayload } from "@college-erp/types";
import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../config";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: config.jwt.accessTokenExpiry as string,
  };
  return jwt.sign(payload, config.jwt.accessTokenSecret, options);
}

export function generateRefreshToken(payload: TokenPayload): string {
  const options: SignOptions = {
    expiresIn: config.jwt.refreshTokenExpiry as string,
  };
  return jwt.sign(payload, config.jwt.refreshTokenSecret, options);
}

export function verifyAccessToken(token: string): JWTPayload {
  return jwt.verify(token, config.jwt.accessTokenSecret) as JWTPayload;
}

export function verifyRefreshToken(token: string): JWTPayload {
  return jwt.verify(token, config.jwt.refreshTokenSecret) as JWTPayload;
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}
