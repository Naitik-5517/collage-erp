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