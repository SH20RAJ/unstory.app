
import { pgTable, text, timestamp, boolean, integer, jsonb, serial, primaryKey } from "drizzle-orm/pg-core";

// --- Users ---
export const users = pgTable("users", {
  id: text("id").primaryKey(), // Using text IDs from mock data/auth
  name: text("name").notNull(),
  nickname: text("nickname"), // User-changeable display name
  username: text("username").unique(),
  avatar: text("avatar"),
  bio: text("bio"),
  onboarded: boolean("onboarded").default(false), // Tracks if user finished initial setup

  // Link to college
  collegeId: text("college_id").references(() => colleges.id),
  
  // Profile details
  banner: text("banner"),
  major: text("major"),
  year: text("year"), // e.g., "2026", "Freshman"
  role: text("role").default('Student'), // Student, Alumni, Faculty
  
  // Enhanced profile
  interests: text("interests").array(),
  socialLinks: jsonb("social_links"), // { github: "...", linkedin: "..." }
  
  metadata: jsonb("metadata"), // For future extensibility
  
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
// --- User Connections ---
export const follows = pgTable("follows", {
  followerId: text("follower_id").notNull().references(() => users.id),
  followingId: text("following_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.followerId, t.followingId] }),
}));

// --- Interactions ---
export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => posts.id),
  userId: text("user_id").notNull().references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const likes = pgTable("likes", {
  postId: integer("post_id").notNull().references(() => posts.id),
  userId: text("user_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.postId, t.userId] }),
}));

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id), // Receiver
  type: text("type").notNull(), // 'like', 'comment', 'follow', 'system'
  title: text("title"),
  message: text("message"),
  metadata: jsonb("metadata"), // Link to post, user, etc.
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- Stories ---
export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  mediaUrl: text("media_url").notNull(),
  type: text("type").default('image'),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Follow = typeof follows.$inferSelect;
export type Comment = typeof comments.$inferSelect;
export type Like = typeof likes.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
export type Story = typeof stories.$inferSelect;
