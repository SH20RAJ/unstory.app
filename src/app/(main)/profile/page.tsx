import { ProfileClient } from "@/components/profile/ProfileClient";
import { Metadata } from "next";
import { stackServerApp } from "@/stack/server";
import { syncUser } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { colleges } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const metadata: Metadata = {
  title: "Profile | Unstory",
  description: "View and manage your student profile.",
};

export default async function ProfilePage() {
  const stackUser = await stackServerApp.getUser();
  
  let dbUser = null;
  let collegeData = null;

  if (stackUser) {
    const result = await syncUser(stackUser);
    
    if (result && 'user' in result && result.user) {
        dbUser = result.user;
        if (dbUser.collegeId) {
            collegeData = await db.query.colleges.findFirst({
                where: eq(colleges.id, dbUser.collegeId)
            });
        }
    }
  }

  return (
    <DashboardLayout>
      <ProfileClient user={dbUser} college={collegeData} />
    </DashboardLayout>
  );
}
