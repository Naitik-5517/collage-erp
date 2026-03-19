export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
  STAFF = 'STAFF',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  DELETED = 'DELETED',
}

export interface BaseUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminUser extends BaseUser {
  role: UserRole.ADMIN;
  permissions: string[];
}

export interface TeacherUser extends BaseUser {
  role: UserRole.TEACHER;
  employeeId: string;
  department: string;
  subjects: string[];
}

export interface StudentUser extends BaseUser {
  role: UserRole.STUDENT;
  studentId: string;
  enrollmentNumber: string;
  batch: string;
  semester: number;
}

export type User = AdminUser | TeacherUser | StudentUser | BaseUser;
