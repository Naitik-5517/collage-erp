import { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } from './app';

export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX_LENGTH: 255,
  },
  PASSWORD: {
    MIN_LENGTH: PASSWORD_MIN_LENGTH,
    MAX_LENGTH: PASSWORD_MAX_LENGTH,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    MESSAGE: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  },
  PHONE: {
    PATTERN: /^\+?[1-9]\d{1,14}$/,
    MESSAGE: 'Invalid phone number format',
  },
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z\s'-]+$/,
  },
  STUDENT_ID: {
    PATTERN: /^[A-Z0-9]{6,12}$/,
    MESSAGE: 'Student ID must be 6-12 alphanumeric characters',
  },
  ENROLLMENT_NUMBER: {
    PATTERN: /^[A-Z0-9]{8,15}$/,
    MESSAGE: 'Enrollment number must be 8-15 alphanumeric characters',
  },
  COURSE_CODE: {
    PATTERN: /^[A-Z]{2,4}\d{3,4}$/,
    MESSAGE: 'Course code must be in format like CS101 or MATH1001',
  },
  PINCODE: {
    PATTERN: /^\d{6}$/,
    MESSAGE: 'Pincode must be 6 digits',
  },
  URL: {
    PATTERN: /^https?:\/\/.+/,
    MESSAGE: 'Invalid URL format',
  },
};

export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  MIN_LENGTH: (field: string, min: number) => `${field} must be at least ${min} characters`,
  MAX_LENGTH: (field: string, max: number) => `${field} must not exceed ${max} characters`,
  INVALID_FORMAT: (field: string) => `Invalid ${field} format`,
  MUST_BE_POSITIVE: (field: string) => `${field} must be a positive number`,
  MUST_BE_INTEGER: (field: string) => `${field} must be an integer`,
  INVALID_ENUM: (field: string, values: string[]) => `${field} must be one of: ${values.join(', ')}`,
  INVALID_DATE: 'Invalid date format',
  DATE_IN_PAST: 'Date must be in the past',
  DATE_IN_FUTURE: 'Date must be in the future',
};
