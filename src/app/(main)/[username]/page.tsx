import { PublicProfileClient } from "@/components/profile/PublicProfileClient";
import { Metadata } from "next";
import { db } from "@/db/drizzle";
import { users, colleges } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { stackServerApp } from "@/stack/server";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decodedName = decodeURIComponent(username).replace('@', '');
  return {
    title: `${decodedName} | Unstory`,
    description: `View ${decodedName}'s profile on Unstory.`,
  };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params;
  const decodedName = decodeURIComponent(username).replace('@', '');

  const profileUser = await db.query.users.findFirst({
      where: eq(users.username, decodedName),
      with: {
          collegeId: false // we can fetch college info using db.query if relations are set, or separately
      }
  });

  if (!profileUser) return notFound();

  let collegeData = null;
  if (profileUser.collegeId) {
       collegeData = await db.query.colleges.findFirst({
           where: eq(colleges.id, profileUser.collegeId)
       });
  }

  const stackUser = await stackServerApp.getUser();
  const isCurrentUser = stackUser?.id === profileUser.id;

  return <PublicProfileClient user={profileUser} college={collegeData} isCurrentUser={isCurrentUser} />;
}
