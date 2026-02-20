
import { db } from "../db/drizzle";
import { users, colleges } from "../db/schema";
import { eq, sql } from "drizzle-orm";

interface StackUser {
  id: string;
  primaryEmail?: string | null;
  displayName?: string | null;
  profileImageUrl?: string | null;
}

export async function syncUser(stackUser: StackUser) {
  if (!stackUser.id || !stackUser.primaryEmail) return null;

  // Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, stackUser.id),
  });

  if (existingUser) {
    return existingUser;
  }

  // New user: Try to find college from email domain
  const emailDomain = stackUser.primaryEmail.split('@')[1];
  let collegeId = null;

  if (emailDomain) {
    const college = await db.query.colleges.findFirst({
      where: eq(colleges.emailDomain, emailDomain),
    });
    if (college) {
      collegeId = college.id;
    }
  }

  // Create user
  // Username generation: email prefix + random string if needed, or just unique id
  const baseUsername = stackUser.primaryEmail.split('@')[0];
  let username = baseUsername;
  
  // Simple check to ensure uniqueness (in a real app, we'd retry)
  const userWithUsername = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (userWithUsername) {
      username = `${baseUsername}_${Math.floor(Math.random() * 1000)}`;
  }

  const [newUser] = await db.insert(users).values({
    id: stackUser.id,
    name: stackUser.displayName || baseUsername,
    username: username,
    avatar: stackUser.profileImageUrl,
    // bio: "",
    collegeId: collegeId,
    verified: !!collegeId, // verified if college found
    role: 'Student',
  }).returning();

  return newUser;
}
