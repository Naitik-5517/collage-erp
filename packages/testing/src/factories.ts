import { generateId } from '@college-erp/utils';
import type { User, Student, Course } from '@college-erp/types';

/**
 * Create a test user
 */
export function createTestUser(overrides: Partial<User> = {}): User {
  return {
    id: generateId('user'),
    email: `test-${Date.now()}@test.college.edu`,
    firstName: 'Test',
    lastName: 'User',
    role: 'STUDENT' as any,
    status: 'ACTIVE' as any,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  } as User;
}

/**
 * Create a test student
 */
export function createTestStudent(overrides: Partial<Student> = {}): Student {
  return {
    id: generateId('student'),
    userId: generateId('user'),
    studentId: `STU${Math.floor(100000 + Math.random() * 900000)}`,
    enrollmentNumber: `EN${Math.floor(10000000 + Math.random() * 90000000)}`,
    batch: '2024',
    semester: 1,
    section: 'A',
    program: 'Computer Science',
    department: 'Engineering',
    admissionDate: new Date(),
    status: 'ACTIVE' as any,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Create a test course
 */
export function createTestCourse(overrides: Partial<Course> = {}): Course {
  return {
    id: generateId('course'),
    code: `CS${Math.floor(100 + Math.random() * 900)}`,
    name: 'Test Course',
    description: 'A test course',
    credits: 3,
    department: 'Computer Science',
    semester: 1,
    isElective: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Create multiple test entities
 */
export function createMany<T>(factory: (overrides?: any) => T, count: number, overrides?: any): T[] {
  return Array.from({ length: count }, () => factory(overrides));
}
