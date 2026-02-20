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
  if (!stackUser.id || !stackUser.primaryEmail) return { error: "no_email" };

  const emailDomain = stackUser.primaryEmail.split("@")[1];

  // Restrict to college domains
  const college = await db.query.colleges.findFirst({
    where: eq(colleges.emailDomain, emailDomain),
  });

  if (!college) {
    return { error: "unauthorized_domain" };
  }

  // Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, stackUser.id),
  });

  if (existingUser) {
    if (!existingUser.collegeId) {
      const [updated] = await db
        .update(users)
        .set({ collegeId: college.id, verified: true })
        .where(eq(users.id, stackUser.id))
        .returning();
      return { user: updated };
    }
    return { user: existingUser };
  }

  // Create user
  const baseUsername = stackUser.primaryEmail.split("@")[0];
  let username = baseUsername;

  const userWithUsername = await db.query.users.findFirst({
    where: eq(users.username, username),
  });
  if (userWithUsername) {
    username = `${baseUsername}_${Math.floor(Math.random() * 1000)}`;
  }

  const [newUser] = await db
    .insert(users)
    .values({
      id: stackUser.id,
      name: stackUser.displayName || baseUsername,
      username: username,
      avatar: stackUser.profileImageUrl,
      collegeId: college.id,
      verified: true,
      role: "Student",
    })
    .returning();

  return { user: newUser };
}
