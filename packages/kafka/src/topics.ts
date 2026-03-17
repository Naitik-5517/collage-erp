export const TOPICS = {
  USER_CREATED: "user.v1.created",
  ENROLLMENT_CONFIRMED: "enrollment.v1.confirmed",
  FEE_PAID: "fee.v1.paid",
  FEE_OVERDUE: "fee.v1.overdue",
  ASSIGNMENT_SUBMITTED: "assignment.v1.submitted",
  ASSIGNMENT_GRADED: "assignment.v1.graded",
  ATTENDANCE_MARKED: "attendance.v1.marked",
  EXAM_RESULT_PUBLISHED: "exam.v1.result.published",
  MESSAGE_SENT: "message.v1.sent",
  VIDEO_UPLOAD_COMPLETE: "video.v1.upload.complete",
} as const;

export type TopicName = typeof TOPICS[keyof typeof TOPICS];
