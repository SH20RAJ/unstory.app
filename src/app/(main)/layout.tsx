import type { Metadata } from "next";
import { TopNav } from "@/components/dashboard/TopNav";
import { MobileNav } from "@/components/dashboard/MobileNav";

export const metadata: Metadata = {
  title: "Unistory | Dashboard",
  description: "Your campus interaction layer.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white selection:bg-[#FFE500] selection:text-black flex-col">
      <TopNav />
      <main className="flex-1 w-full bg-[#09090b] mb-16 md:mb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}
