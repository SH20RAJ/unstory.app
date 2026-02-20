import { DatingClient } from "@/components/dating/DatingClient";
import { Metadata } from "next";
import { db } from "@/db/drizzle";
import { stackServerApp } from "@/stack/server";

export const metadata: Metadata = {
  title: "Dating | Unstory",
  description: "Find your match on campus.",
};

export default async function DatingPage() {
  const stackUser = await stackServerApp.getUser();
  
  let profiles = [];
  if (stackUser) {
      profiles = await db.query.datingProfiles.findMany({
          // where: notEq(datingProfiles.userId, stackUser.id),
      });
  } else {
      profiles = await db.query.datingProfiles.findMany();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <DatingClient profiles={profiles as any} />;
}
