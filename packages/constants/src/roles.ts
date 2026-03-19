export enum Role {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  STAFF = 'STAFF',
}

export enum Permission {
  // User Management
  USER_CREATE = 'user:create',
  USER_READ = 'user:read',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',

  // Student Management
  STUDENT_CREATE = 'student:create',
  STUDENT_READ = 'student:read',
  STUDENT_UPDATE = 'student:update',
  STUDENT_DELETE = 'student:delete',
  STUDENT_ENROLL = 'student:enroll',

  // Academic Management
  COURSE_CREATE = 'course:create',
  COURSE_READ = 'course:read',
  COURSE_UPDATE = 'course:update',
  COURSE_DELETE = 'course:delete',

  // Attendance
  ATTENDANCE_MARK = 'attendance:mark',
  ATTENDANCE_VIEW = 'attendance:view',
  ATTENDANCE_EDIT = 'attendance:edit',

  // Grades
  GRADE_SUBMIT = 'grade:submit',
  GRADE_VIEW = 'grade:view',
  GRADE_EDIT = 'grade:edit',

  // Finance
  FINANCE_VIEW = 'finance:view',
  FINANCE_CREATE = 'finance:create',
  FINANCE_UPDATE = 'finance:update',
  FINANCE_DELETE = 'finance:delete',

  // Reports
  REPORT_GENERATE = 'report:generate',
  REPORT_VIEW = 'report:view',
  REPORT_EXPORT = 'report:export',

  // System
  SYSTEM_SETTINGS = 'system:settings',
  SYSTEM_LOGS = 'system:logs',
}

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),

  [Role.TEACHER]: [
    Permission.USER_READ,
    Permission.STUDENT_READ,
    Permission.COURSE_READ,
    Permission.COURSE_UPDATE,
    Permission.ATTENDANCE_MARK,
    Permission.ATTENDANCE_VIEW,
    Permission.ATTENDANCE_EDIT,
    Permission.GRADE_SUBMIT,
    Permission.GRADE_VIEW,
    Permission.GRADE_EDIT,
    Permission.REPORT_GENERATE,
    Permission.REPORT_VIEW,
  ],

  [Role.STUDENT]: [
    Permission.USER_READ,
    Permission.STUDENT_READ,
    Permission.COURSE_READ,
    Permission.ATTENDANCE_VIEW,
    Permission.GRADE_VIEW,
    Permission.FINANCE_VIEW,
  ],

  [Role.PARENT]: [
    Permission.STUDENT_READ,
    Permission.COURSE_READ,
    Permission.ATTENDANCE_VIEW,
    Permission.GRADE_VIEW,
    Permission.FINANCE_VIEW,
  ],

  [Role.STAFF]: [
    Permission.USER_READ,
    Permission.STUDENT_READ,
    Permission.COURSE_READ,
    Permission.FINANCE_VIEW,
    Permission.REPORT_VIEW,
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false;
}

export function hasAnyPermission(role: Role, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

export function hasAllPermissions(role: Role, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}
