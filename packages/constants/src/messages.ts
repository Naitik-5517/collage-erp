export const SUCCESS_MESSAGES = {
  // Auth
  LOGIN_SUCCESS: 'Login successful',
  LOGOUT_SUCCESS: 'Logout successful',
  REGISTER_SUCCESS: 'Registration successful',
  PASSWORD_CHANGED: 'Password changed successfully',
  PASSWORD_RESET_EMAIL_SENT: 'Password reset email sent',
  PASSWORD_RESET_SUCCESS: 'Password reset successful',
  EMAIL_VERIFIED: 'Email verified successfully',

  // CRUD Operations
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  FETCHED: 'Fetched successfully',

  // Student
  STUDENT_ENROLLED: 'Student enrolled successfully',
  STUDENT_PROFILE_UPDATED: 'Student profile updated',
  ENROLLMENT_CANCELLED: 'Enrollment cancelled',

  // Academic
  COURSE_CREATED: 'Course created successfully',
  COURSE_UPDATED: 'Course updated successfully',
  ATTENDANCE_MARKED: 'Attendance marked successfully',
  GRADE_SUBMITTED: 'Grade submitted successfully',

  // Generic
  OPERATION_SUCCESS: 'Operation completed successfully',
  DATA_SAVED: 'Data saved successfully',
};

export const ERROR_MESSAGES = {
  // Generic
  SOMETHING_WENT_WRONG: 'Something went wrong',
  NETWORK_ERROR: 'Network error occurred',
  INVALID_REQUEST: 'Invalid request',

  // Auth
  INVALID_CREDENTIALS: 'Invalid email or password',
  UNAUTHORIZED: 'You are not authorized',
  TOKEN_EXPIRED: 'Your session has expired',
  ACCOUNT_DISABLED: 'Your account is disabled',

  // Validation
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PHONE: 'Invalid phone number',
  WEAK_PASSWORD: 'Password is too weak',
  PASSWORD_MISMATCH: 'Passwords do not match',

  // Not Found
  USER_NOT_FOUND: 'User not found',
  STUDENT_NOT_FOUND: 'Student not found',
  COURSE_NOT_FOUND: 'Course not found',
  RESOURCE_NOT_FOUND: 'Resource not found',

  // Conflict
  EMAIL_EXISTS: 'Email already exists',
  STUDENT_ID_EXISTS: 'Student ID already exists',
  ALREADY_ENROLLED: 'Already enrolled in this course',

  // Business Logic
  ENROLLMENT_CLOSED: 'Enrollment is closed',
  CAPACITY_FULL: 'Course capacity is full',
  PREREQUISITE_NOT_MET: 'Prerequisites not met',
  INSUFFICIENT_PERMISSION: 'You do not have permission',
};

export const INFO_MESSAGES = {
  LOADING: 'Loading...',
  PROCESSING: 'Processing...',
  NO_DATA: 'No data available',
  NO_RESULTS: 'No results found',
  EMPTY_LIST: 'List is empty',
};
