import type { Metadata } from "next";

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
    <div className="flex min-h-screen bg-black text-white selection:bg-[#FFE500] selection:text-black">
      <main className="flex-1 w-full bg-[#09090b]">
        {children}
      </main>
    </div>
  );
}
