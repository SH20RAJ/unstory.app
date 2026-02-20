import type { Metadata } from "next";
import { TopNav } from "@/components/dashboard/TopNav";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { stackServerApp } from "@/stack/server";
import { syncUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Unstory | Dashboard",
  description: "Your campus interaction layer.",
};

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const stackUser = await stackServerApp.getUser();
  let dbUser = null;
  
  if (stackUser) {
      const result = await syncUser(stackUser);
      if (result && 'error' in result && result.error === "unauthorized_domain") {
          redirect("/unauthorized");
      }
      
      if (result && 'user' in result && result.user) {
          if (!result.user.onboarded) {
              redirect("/onboarding");
          }
          dbUser = result.user;
      }
  }

  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-[#FFE500] selection:text-black flex-col">
      <TopNav userAvatar={dbUser?.avatar || null} userName={dbUser?.nickname || dbUser?.name || "User"} />
      <main className="flex-1 w-full bg-[#09090b] mb-16 md:mb-0">
        {children}
      </main>
      <MobileNav userAvatar={dbUser?.avatar || null} userName={dbUser?.nickname || dbUser?.name || "User"} />
    </div>
  );
}
