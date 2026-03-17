const fs = require("fs");
const path = require("path");

const schemas = {
  "packages/db/src/schemas/auth/users.ts": `
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
`.trim(),

  "packages/db/src/schemas/academic/colleges.ts": `
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const colleges = pgTable("colleges", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  address: text("address"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  pincode: varchar("pincode", { length: 10 }),
  website: text("website"),
  logoUrl: text("logo_url"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type College = typeof colleges.$inferSelect;
export type NewCollege = typeof colleges.$inferInsert;
`.trim(),

  "packages/db/src/schemas/academic/departments.ts": `
import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { colleges } from "./colleges";

export const departments = pgTable("departments", {
  id: uuid("id").primaryKey().defaultRandom(),
  collegeId: uuid("college_id")
    .notNull()
    .references(() => colleges.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 20 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;
`.trim(),

  "packages/db/src/schemas/academic/programmes.ts": `
import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const programmeLevelEnum = pgEnum("programme_level", [
  "ug",
  "pg",
  "diploma",
  "phd",
  "certificate",
]);

export const programmes = pgTable("programmes", {
  id: uuid("id").primaryKey().defaultRandom(),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 20 }).notNull(),
  level: programmeLevelEnum("level").notNull(),
  durationYears: integer("duration_years").notNull(),
  totalSemesters: integer("total_semesters").notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Programme = typeof programmes.$inferSelect;
export type NewProgramme = typeof programmes.$inferInsert;
`.trim(),

  "packages/db/src/schemas/academic/subjects.ts": `
import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const subjects = pgTable("subjects", {
  id: uuid("id").primaryKey().defaultRandom(),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  code: varchar("code", { length: 20 }).notNull(),
  credits: integer("credits").notNull().default(4),
  theoryHours: integer("theory_hours").notNull().default(0),
  practicalHours: integer("practical_hours").notNull().default(0),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Subject = typeof subjects.$inferSelect;
export type NewSubject = typeof subjects.$inferInsert;
`.trim(),

  "packages/db/src/schemas/academic/batches.ts": `
import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { programmes } from "./programmes";

export const batches = pgTable("batches", {
  id: uuid("id").primaryKey().defaultRandom(),
  programmeId: uuid("programme_id")
    .notNull()
    .references(() => programmes.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  year: integer("year").notNull(),
  section: varchar("section", { length: 10 }),
  maxStrength: integer("max_strength").notNull().default(60),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Batch = typeof batches.$inferSelect;
export type NewBatch = typeof batches.$inferInsert;
`.trim(),

  "packages/db/src/schemas/academic/semesters.ts": `
import {
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  date,
  timestamp,
} from "drizzle-orm/pg-core";
import { programmes } from "./programmes";

export const semesters = pgTable("semesters", {
  id: uuid("id").primaryKey().defaultRandom(),
  programmeId: uuid("programme_id")
    .notNull()
    .references(() => programmes.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  number: integer("number").notNull(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  isActive: boolean("is_active").notNull().default(false),
  isCurrent: boolean("is_current").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type Semester = typeof semesters.$inferSelect;
export type NewSemester = typeof semesters.$inferInsert;
`.trim(),

  "packages/db/src/schemas/index.ts": `
export * from "./auth/users";
export * from "./academic/colleges";
export * from "./academic/departments";
export * from "./academic/programmes";
export * from "./academic/subjects";
export * from "./academic/batches";
export * from "./academic/semesters";
`.trim(),

  "packages/db/src/client.ts": `
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:password@localhost:5432/college_erp";

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
export type DB = typeof db;
`.trim(),

  "packages/db/src/index.ts": `
export * from "./client";
export * from "./schemas";
`.trim(),

  "packages/db/drizzle.config.ts": `
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schemas/**/*.ts",
  out: "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL ??
      "postgresql://postgres:password@localhost:5432/college_erp",
  },
  verbose: true,
  strict: true,
});
`.trim(),
};

Object.entries(schemas).forEach(([filePath, content]) => {
  const fullPath = path.resolve(filePath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("Written: " + filePath);
});

console.log("\nAll schema files written successfully!");
