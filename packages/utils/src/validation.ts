import { VALIDATION_RULES } from '@college-erp/constants';

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_RULES.EMAIL.PATTERN.test(email);
}

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  return VALIDATION_RULES.PHONE.PATTERN.test(phone);
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): boolean {
  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) return false;
  if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) return false;
  return VALIDATION_RULES.PASSWORD.PATTERN.test(password);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  return VALIDATION_RULES.URL.PATTERN.test(url);
}

/**
 * Validate student ID
 */
export function isValidStudentId(studentId: string): boolean {
  return VALIDATION_RULES.STUDENT_ID.PATTERN.test(studentId);
}

/**
 * Validate course code
 */
export function isValidCourseCode(code: string): boolean {
  return VALIDATION_RULES.COURSE_CODE.PATTERN.test(code);
}

/**
 * Validate pincode
 */
export function isValidPincode(pincode: string): boolean {
  return VALIDATION_RULES.PINCODE.PATTERN.test(pincode);
}

/**
 * Validate date
 */
export function isValidDate(date: any): boolean {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}

/**
 * Check if value is empty
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Sanitize string input
 */
export function sanitizeString(str: string): string {
  return str
    .trim()
    .replace(/[<>]/g, '')
    .replace(/[\x00-\x1F\x7F]/g, '');
}
