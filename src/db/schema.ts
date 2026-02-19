
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const colleges = pgTable("colleges", {
  id: text("id").primaryKey(), // Aishe_Code
  name: text("name").notNull(),
  state: text("state").notNull(),
  district: text("district").notNull(),
  website: text("website"),
  emailDomain: text("email_domain"),
  yearEstablished: text("year_established"),
  location: text("location"),
  slug: text("slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type College = typeof colleges.$inferSelect;
export type NewCollege = typeof colleges.$inferInsert;
