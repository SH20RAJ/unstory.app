
import { pgTable, text, timestamp, boolean, integer, jsonb, serial } from "drizzle-orm/pg-core";

// --- Users ---
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Using text IDs from mock data/auth
  name: text("name").notNull(),
  username: text("username").unique().notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  college: text("college"),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// --- Communities ---
export const communities = pgTable("communities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  description: text("description"),
  image: text("image"),
  memberCount: integer("member_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Posts ---
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  type: text("type").notNull(), // 'text', 'image', 'video', 'event', 'poll', 'article'
  content: text("content"),
  mediaUrls: text("media_urls").array(), // For images/videos
  
  // JSONB columns for flexible data
  eventDetails: jsonb("event_details"),
  pollDetails: jsonb("poll_details"),
  articleDetails: jsonb("article_details"),
  
  // Metrics
  likesCount: integer("likes_count").default(0),
  commentsCount: integer("comments_count").default(0),
  sharesCount: integer("shares_count").default(0),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Dating Profiles ---
export const datingProfiles = pgTable("dating_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id), // Link to main user if needed, but mock data uses separate IDs
  name: text("name").notNull(),
  age: integer("age"),
  bio: text("bio"),
  university: text("university"),
  major: text("major"),
  images: text("images").array(),
  interests: text("interests").array(),
  distance: text("distance"), // "2 miles away" - ideally calculated, but storing string for now
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Colleges (Existing) ---
export const colleges = pgTable("colleges", {
  id: text("id").primaryKey(), 
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

export type User = typeof users.$inferSelect;
export type Post = typeof posts.$inferSelect;
export type Community = typeof communities.$inferSelect;
export type DatingProfile = typeof datingProfiles.$inferSelect;
export type College = typeof colleges.$inferSelect;
