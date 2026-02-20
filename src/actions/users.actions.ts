"use server";

import { db } from "@/db/drizzle";
import { users, colleges } from "@/db/schema";
import { ne } from "drizzle-orm";

export async function getSuggestedUsers(currentUserId: string | undefined | null) {
  let rawUsers = [];
  
  if (currentUserId) {
       rawUsers = await db.query.users.findMany({
          where: ne(users.id, currentUserId),
          limit: 20
      });
  } else {
       rawUsers = await db.query.users.findMany({
          limit: 20
      });
  }
  
  // Fetch college relationships
  const allColleges = await db.select().from(colleges);
  
  const mappedUsers = rawUsers.map(user => {
      const collegeData = allColleges.find(c => c.id === user.collegeId) || null;
      return { ...user, collegeData };
  });

  return mappedUsers;
}
