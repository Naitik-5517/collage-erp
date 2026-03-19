import type { Course, CourseOffering, Enrollment, Attendance } from '@college-erp/types';

/**
 * Academic Service Contract
 */
export interface AcademicServiceContract {
  getCourse(id: string): Promise<Course | null>;
  listCourses(filters: CourseFilters): Promise<Course[]>;
  createCourse(data: Partial<Course>): Promise<Course>;
  updateCourse(id: string, data: Partial<Course>): Promise<Course>;
  deleteCourse(id: string): Promise<void>;

  getCourseOffering(id: string): Promise<CourseOffering | null>;
  listCourseOfferings(filters: any): Promise<CourseOffering[]>;
  createCourseOffering(data: Partial<CourseOffering>): Promise<CourseOffering>;

  markAttendance(data: MarkAttendanceData): Promise<void>;
  getAttendance(studentId: string, courseOfferingId: string): Promise<Attendance[]>;
  getAttendancePercentage(studentId: string, courseOfferingId: string): Promise<number>;
}

export interface CourseFilters {
  department?: string;
  semester?: number;
  isElective?: boolean;
  search?: string;
}

export interface MarkAttendanceData {
  courseOfferingId: string;
  date: Date;
  attendances: Array<{
    studentId: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  }>;
}

/**
 * Academic Service API Endpoints
 */
export const AcademicEndpoints = {
  // Courses
  GET_COURSE: '/courses/:id',
  LIST_COURSES: '/courses',
  CREATE_COURSE: '/courses',
  UPDATE_COURSE: '/courses/:id',
  DELETE_COURSE: '/courses/:id',

  // Course Offerings
  GET_OFFERING: '/course-offerings/:id',
  LIST_OFFERINGS: '/course-offerings',
  CREATE_OFFERING: '/course-offerings',

  // Attendance
  MARK_ATTENDANCE: '/attendance',
  GET_ATTENDANCE: '/attendance/student/:studentId/course/:courseId',
  GET_ATTENDANCE_PERCENTAGE: '/attendance/student/:studentId/course/:courseId/percentage',
} as const;
