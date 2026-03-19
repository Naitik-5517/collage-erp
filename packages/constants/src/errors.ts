export enum ErrorCode {
  // Authentication Errors (1000-1099)
  INVALID_CREDENTIALS = 'AUTH_1000',
  TOKEN_EXPIRED = 'AUTH_1001',
  TOKEN_INVALID = 'AUTH_1002',
  UNAUTHORIZED = 'AUTH_1003',
  FORBIDDEN = 'AUTH_1004',
  ACCOUNT_LOCKED = 'AUTH_1005',
  ACCOUNT_NOT_VERIFIED = 'AUTH_1006',

  // Validation Errors (2000-2099)
  VALIDATION_ERROR = 'VAL_2000',
  REQUIRED_FIELD_MISSING = 'VAL_2001',
  INVALID_EMAIL = 'VAL_2002',
  INVALID_PHONE = 'VAL_2003',
  INVALID_DATE = 'VAL_2004',
  INVALID_FORMAT = 'VAL_2005',

  // Resource Errors (3000-3099)
  RESOURCE_NOT_FOUND = 'RES_3000',
  RESOURCE_ALREADY_EXISTS = 'RES_3001',
  RESOURCE_CONFLICT = 'RES_3002',

  // Database Errors (4000-4099)
  DATABASE_ERROR = 'DB_4000',
  DATABASE_CONNECTION_ERROR = 'DB_4001',
  DATABASE_QUERY_ERROR = 'DB_4002',
  DATABASE_CONSTRAINT_ERROR = 'DB_4003',

  // Server Errors (5000-5099)
  INTERNAL_SERVER_ERROR = 'SRV_5000',
  SERVICE_UNAVAILABLE = 'SRV_5001',
  GATEWAY_TIMEOUT = 'SRV_5002',
  EXTERNAL_SERVICE_ERROR = 'SRV_5003',

  // Business Logic Errors (6000-6099)
  ENROLLMENT_LIMIT_REACHED = 'BIZ_6000',
  PREREQUISITE_NOT_MET = 'BIZ_6001',
  INVALID_OPERATION = 'BIZ_6002',
  INSUFFICIENT_PERMISSIONS = 'BIZ_6003',
  DUPLICATE_ENTRY = 'BIZ_6004',
}

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  [ErrorCode.INVALID_CREDENTIALS]: 'Invalid email or password',
  [ErrorCode.TOKEN_EXPIRED]: 'Authentication token has expired',
  [ErrorCode.TOKEN_INVALID]: 'Invalid authentication token',
  [ErrorCode.UNAUTHORIZED]: 'Unauthorized access',
  [ErrorCode.FORBIDDEN]: 'Access forbidden',
  [ErrorCode.ACCOUNT_LOCKED]: 'Account is locked',
  [ErrorCode.ACCOUNT_NOT_VERIFIED]: 'Account is not verified',

  [ErrorCode.VALIDATION_ERROR]: 'Validation error',
  [ErrorCode.REQUIRED_FIELD_MISSING]: 'Required field is missing',
  [ErrorCode.INVALID_EMAIL]: 'Invalid email format',
  [ErrorCode.INVALID_PHONE]: 'Invalid phone number',
  [ErrorCode.INVALID_DATE]: 'Invalid date format',
  [ErrorCode.INVALID_FORMAT]: 'Invalid format',

  [ErrorCode.RESOURCE_NOT_FOUND]: 'Resource not found',
  [ErrorCode.RESOURCE_ALREADY_EXISTS]: 'Resource already exists',
  [ErrorCode.RESOURCE_CONFLICT]: 'Resource conflict',

  [ErrorCode.DATABASE_ERROR]: 'Database error occurred',
  [ErrorCode.DATABASE_CONNECTION_ERROR]: 'Database connection failed',
  [ErrorCode.DATABASE_QUERY_ERROR]: 'Database query failed',
  [ErrorCode.DATABASE_CONSTRAINT_ERROR]: 'Database constraint violation',

  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal server error',
  [ErrorCode.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable',
  [ErrorCode.GATEWAY_TIMEOUT]: 'Gateway timeout',
  [ErrorCode.EXTERNAL_SERVICE_ERROR]: 'External service error',

  [ErrorCode.ENROLLMENT_LIMIT_REACHED]: 'Enrollment limit reached',
  [ErrorCode.PREREQUISITE_NOT_MET]: 'Prerequisites not met',
  [ErrorCode.INVALID_OPERATION]: 'Invalid operation',
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: 'Insufficient permissions',
  [ErrorCode.DUPLICATE_ENTRY]: 'Duplicate entry',
};
