import { randomBytes, createHash, pbkdf2 } from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(pbkdf2);

/**
 * Generate random token
 */
export function generateToken(length = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Generate random ID
 */
export function generateId(prefix?: string): string {
  const id = randomBytes(16).toString('hex');
  return prefix ? `${prefix}_${id}` : id;
}

/**
 * Hash string using SHA-256
 */
export function hashString(str: string): string {
  return createHash('sha256').update(str).digest('hex');
}

/**
 * Hash password using PBKDF2
 */
export async function hashPassword(password: string, salt?: string): Promise<{ hash: string; salt: string }> {
  const passwordSalt = salt || randomBytes(16).toString('hex');
  const hash = await pbkdf2Async(password, passwordSalt, 100000, 64, 'sha512');

  return {
    hash: hash.toString('hex'),
    salt: passwordSalt,
  };
}

/**
 * Verify password
 */
export async function verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
  const { hash: computedHash } = await hashPassword(password, salt);
  return computedHash === hash;
}

/**
 * Generate OTP
 */
export function generateOTP(length = 6): string {
  const digits = '0123456789';
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    otp += digits[randomIndex];
  }

  return otp;
}

/**
 * Generate UUID v4
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
