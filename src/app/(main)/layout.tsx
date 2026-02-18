import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r border-border/40 bg-background/80 backdrop-blur-xl sm:flex transition-all duration-300">
        <div className="flex h-16 items-center border-b border-border/40 px-6">
          <span className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Unistory</span>
        </div>
        <nav className="flex flex-col gap-2 px-3 py-6">
          <Link href="/home">
            <Button variant="ghost" className="w-full justify-start text-base font-medium px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors">
              Home
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="ghost" className="w-full justify-start text-base font-medium px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors">
              Events
            </Button>
          </Link>
          <Link href="/create">
            <Button variant="outline" className="w-full justify-start text-base font-medium px-4 py-3 border-primary/20 text-primary hover:bg-primary/10 hover:text-primary transition-colors my-2 bg-primary/5">
              Create (+)
            </Button>
          </Link>
          <Link href="/connect">
            <Button variant="ghost" className="w-full justify-start text-base font-medium px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors">
              Connect
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="ghost" className="w-full justify-start text-base font-medium px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors">
              Chat
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" className="w-full justify-start">
              Profile
            </Button>
          </Link>
        </nav>
        <div className="mt-auto p-4 border-t">
          {/* User Profile / Stack Auth User Button could go here */}
        </div>
      </aside>
      
      <main className="flex flex-1 flex-col sm:pl-64">
        {children}
      </main>

       {/* Mobile Bottom Nav */}
       <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background px-4 sm:hidden">
         <Link href="/home">
           <Button variant="ghost" size="icon">H</Button>
         </Link>
         <Link href="/events">
           <Button variant="ghost" size="icon">E</Button>
         </Link>
         <Link href="/create">
           <Button variant="default" size="icon" className="rounded-full shadow-lg">+</Button>
         </Link>
         <Link href="/connect">
           <Button variant="ghost" size="icon">C</Button>
         </Link>
         <Link href="/chat">
           <Button variant="ghost" size="icon">M</Button>
         </Link>
         <Link href="/profile">
           <Button variant="ghost" size="icon">P</Button>
         </Link>
       </nav>
    </div>
  );
}
