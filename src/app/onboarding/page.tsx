import { Metadata } from "next";
import { stackServerApp } from "@/stack/server";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { OnboardingForm } from "@/components/profile/OnboardingForm";

export const metadata: Metadata = {
  title: "Complete Your Profile | Unstory",
};

export default async function OnboardingPage() {
  const stackUser = await stackServerApp.getUser();
  if (!stackUser) redirect("/handler/sign-in");

  const dbUser = await db.query.users.findFirst({
      where: eq(users.id, stackUser.id)
  });

  if (!dbUser) {
      // User should exist by the time they reach here because layout.tsx calls syncUser
      // But just in case
      redirect("/");
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full p-8 rounded-2xl bg-[#09090b] border border-white/10 shadow-2xl">
         <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold mb-2">
                 {dbUser.onboarded ? "Edit Profile" : "Almost there!"}
             </h1>
             <p className="text-muted-foreground">
                 {dbUser.onboarded 
                     ? "Update your profile information and links." 
                     : "Let's personalize your Unstory profile before you dive in."}
             </p>
         </div>

         <OnboardingForm user={dbUser} />
      </div>
    </div>
  );
}
