import type { Student, StudentProfile } from '@college-erp/types';

/**
 * Student Service Contract
 */
export interface StudentServiceContract {
  getStudent(id: string): Promise<Student | null>;
  getStudentProfile(id: string): Promise<StudentProfile | null>;
  createStudent(data: Partial<Student>): Promise<Student>;
  updateStudent(id: string, data: Partial<Student>): Promise<Student>;
  deleteStudent(id: string): Promise<void>;
  listStudents(filters: StudentFilters): Promise<PaginatedStudents>;
  enrollStudent(studentId: string, courseOfferingId: string): Promise<void>;
  getEnrollments(studentId: string): Promise<any[]>;
}

export interface StudentFilters {
  page?: number;
  limit?: number;
  batch?: string;
  semester?: number;
  department?: string;
  status?: string;
  search?: string;
}

export interface PaginatedStudents {
  data: Student[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * Student Service API Endpoints
 */
export const StudentEndpoints = {
  GET_STUDENT: '/students/:id',
  GET_PROFILE: '/students/:id/profile',
  LIST_STUDENTS: '/students',
  CREATE_STUDENT: '/students',
  UPDATE_STUDENT: '/students/:id',
  DELETE_STUDENT: '/students/:id',
  ENROLL: '/students/:id/enrollments',
  GET_ENROLLMENTS: '/students/:id/enrollments',
} as const;
