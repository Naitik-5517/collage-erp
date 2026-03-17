import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "college_admin",
  "principal",
  "vice_principal",
  "registrar",
  "hod",
  "faculty",
  "student",
  "parent",
  "alumni",
  "accountant",
  "hr_officer",
  "exam_controller",
  "librarian",
  "hostel_warden",
  "transport_manager",
  "placement_officer",
  "counsellor",
  "medical_officer",
  "it_admin",
  "security_guard",
  "canteen_vendor",
  "vendor",
  "auditor",
  "govt_inspector",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  collegeId: uuid("college_id"),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  passwordHash: text("password_hash"),
  role: userRoleEnum("role").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  isVerified: boolean("is_verified").notNull().default(false),
  twoFactorEnabled: boolean("two_factor_enabled").notNull().default(false),
  avatarUrl: text("avatar_url"),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;