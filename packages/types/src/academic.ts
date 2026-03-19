export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  semester: number;
  isElective: boolean;
  prerequisites?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseOffering {
  id: string;
  courseId: string;
  teacherId: string;
  academicYear: string;
  semester: number;
  section: string;
  maxStudents: number;
  enrolledStudents: number;
  schedule: ClassSchedule[];
  status: OfferingStatus;
}

export interface ClassSchedule {
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  room: string;
  building?: string;
}

export enum DayOfWeek {
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
  SUNDAY = 'SUNDAY',
}

export enum OfferingStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseOfferingId: string;
  enrollmentDate: Date;
  status: EnrollmentStatus;
  grade?: string;
  credits: number;
}

export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  DROPPED = 'DROPPED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface Attendance {
  id: string;
  studentId: string;
  courseOfferingId: string;
  date: Date;
  status: AttendanceStatus;
  remarks?: string;
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED',
}
