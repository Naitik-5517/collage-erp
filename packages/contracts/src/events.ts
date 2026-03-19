/**
 * Domain Events
 *
 * These events are published to Kafka for inter-service communication
 */

// User Events
export interface UserCreatedEvent {
  type: 'user.created';
  userId: string;
  email: string;
  role: string;
  timestamp: string;
}

export interface UserUpdatedEvent {
  type: 'user.updated';
  userId: string;
  changes: Record<string, any>;
  timestamp: string;
}

export interface UserDeletedEvent {
  type: 'user.deleted';
  userId: string;
  timestamp: string;
}

// Student Events
export interface StudentEnrolledEvent {
  type: 'student.enrolled';
  studentId: string;
  courseOfferingId: string;
  enrollmentId: string;
  timestamp: string;
}

export interface StudentDroppedCourseEvent {
  type: 'student.dropped_course';
  studentId: string;
  courseOfferingId: string;
  enrollmentId: string;
  reason?: string;
  timestamp: string;
}

// Academic Events
export interface AttendanceMarkedEvent {
  type: 'attendance.marked';
  courseOfferingId: string;
  date: string;
  attendances: Array<{
    studentId: string;
    status: string;
  }>;
  markedBy: string;
  timestamp: string;
}

export interface GradeSubmittedEvent {
  type: 'grade.submitted';
  enrollmentId: string;
  studentId: string;
  courseOfferingId: string;
  grade: string;
  submittedBy: string;
  timestamp: string;
}

// Finance Events
export interface PaymentReceivedEvent {
  type: 'payment.received';
  paymentId: string;
  studentId: string;
  amount: number;
  paymentMethod: string;
  timestamp: string;
}

export interface InvoiceGeneratedEvent {
  type: 'invoice.generated';
  invoiceId: string;
  studentId: string;
  amount: number;
  dueDate: string;
  timestamp: string;
}

// Notification Events
export interface NotificationSentEvent {
  type: 'notification.sent';
  notificationId: string;
  userId: string;
  channel: 'email' | 'sms' | 'push' | 'in-app';
  status: 'sent' | 'failed';
  timestamp: string;
}

// Union type of all events
export type DomainEvent =
  | UserCreatedEvent
  | UserUpdatedEvent
  | UserDeletedEvent
  | StudentEnrolledEvent
  | StudentDroppedCourseEvent
  | AttendanceMarkedEvent
  | GradeSubmittedEvent
  | PaymentReceivedEvent
  | InvoiceGeneratedEvent
  | NotificationSentEvent;

// Event topic mapping
export const EventTopics = {
  USER: 'user-events',
  STUDENT: 'student-events',
  ACADEMIC: 'academic-events',
  FINANCE: 'finance-events',
  NOTIFICATION: 'notification-events',
} as const;
