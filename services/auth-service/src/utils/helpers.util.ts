import type { Request } from "express";
import crypto from "node:crypto";

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function generateDeviceInfo(userAgent?: string): string {
  return userAgent || "unknown";
}

export function getClientIp(req: Request): string {
  return (
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    (req.headers["x-real-ip"] as string) ||
    req.socket.remoteAddress ||
    "unknown"
  );
}
