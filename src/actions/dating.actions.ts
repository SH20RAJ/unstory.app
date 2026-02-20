"use server";

import { db } from "@/db/drizzle";
// import { datingProfiles } from "@/db/schema";
// import { ne } from "drizzle-orm";

export async function getDatingProfiles(currentUserId: string | undefined | null) {
  let profiles = [];
  if (currentUserId) {
      profiles = await db.query.datingProfiles.findMany({
          // where: ne(datingProfiles.userId, currentUserId),
      });
  } else {
      profiles = await db.query.datingProfiles.findMany();
  }
  return profiles;
}
