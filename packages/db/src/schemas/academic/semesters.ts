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