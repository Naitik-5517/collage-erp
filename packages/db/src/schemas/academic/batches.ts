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