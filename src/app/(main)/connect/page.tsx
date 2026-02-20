import { ConnectClient } from "@/components/connect/ConnectClient";
import { Metadata } from "next";
import { stackServerApp } from "@/stack/server";
import { db } from "@/db/drizzle";
import { users, colleges } from "@/db/schema";
import { ne } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Connect | Unstory",
  description: "Discover new people and make connections.",
};

export default async function ConnectPage() {
  const stackUser = await stackServerApp.getUser();
  
  // If not logged in we still show users, but maybe we exclude stackUser.id if present
  let rawUsers = [];
  
  if (stackUser) {
       rawUsers = await db.query.users.findMany({
          where: ne(users.id, stackUser.id),
          limit: 20
      });
  } else {
       rawUsers = await db.query.users.findMany({
          limit: 20
      });
  }
  
  // We need to fetch college relationships manually or via query
  const allColleges = await db.select().from(colleges);
  
  const mappedUsers = rawUsers.map(user => {
      const collegeData = allColleges.find(c => c.id === user.collegeId) || null;
      return { ...user, collegeData };
  });

  return <ConnectClient suggestedUsers={mappedUsers} />;
}
