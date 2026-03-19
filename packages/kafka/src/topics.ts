export const TOPICS = {
  // Auth events
  USER_CREATED: "user.v1.created",
  USER_LOGGED_IN: "user.v1.logged_in",
  PASSWORD_RESET_REQUESTED: "user.v1.password_reset_requested",
  PASSWORD_CHANGED: "user.v1.password_changed",

  // Academic events
  ENROLLMENT_CONFIRMED: "enrollment.v1.confirmed",

  // Finance events
  FEE_PAID: "fee.v1.paid",
  FEE_OVERDUE: "fee.v1.overdue",

  // LMS events
  ASSIGNMENT_SUBMITTED: "assignment.v1.submitted",
  ASSIGNMENT_GRADED: "assignment.v1.graded",

  // Attendance events
  ATTENDANCE_MARKED: "attendance.v1.marked",

  // Exam events
  EXAM_RESULT_PUBLISHED: "exam.v1.result.published",

  // Messaging events
  MESSAGE_SENT: "message.v1.sent",

  // Media events
  VIDEO_UPLOAD_COMPLETE: "video.v1.upload.complete",
} as const;

export type TopicName = typeof TOPICS[keyof typeof TOPICS];
