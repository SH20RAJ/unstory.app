"use server";

import { db } from "@/db/drizzle";
import { datingProfiles, users } from "@/db/schema";
import { eq, ne } from "drizzle-orm";

export async function getDatingProfiles(currentUserId: string | undefined | null) {
  const query = db.select({
      profile: datingProfiles,
      username: users.username,
  })
  .from(datingProfiles)
  .leftJoin(users, eq(datingProfiles.userId, users.id));

  if (currentUserId) {
      query.where(ne(datingProfiles.userId, currentUserId));
  }

  const results = await query;
  return results.map(r => ({
      ...r.profile,
      username: r.username
  }));
}
