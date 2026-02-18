import { Button } from "@/components/ui/button";
import { stackClientApp } from "../../stack/client";
import { StackTheme } from "@stackframe/stack";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-lg font-bold">Unistory</span>
        </div>
        <nav className="flex flex-col gap-4 px-2 py-4">
          <Button variant="ghost" className="justify-start">
            Home
          </Button>
          <Button variant="ghost" className="justify-start">
            Events
          </Button>
          <Button variant="ghost" className="justify-start">
            Create (+)
          </Button>
          <Button variant="ghost" className="justify-start">
            Connect
          </Button>
          <Button variant="ghost" className="justify-start">
            Profile
          </Button>
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
         <Button variant="ghost" size="icon">H</Button>
         <Button variant="ghost" size="icon">E</Button>
         <Button variant="default" size="icon" className="rounded-full shadow-lg">+</Button>
         <Button variant="ghost" size="icon">C</Button>
         <Button variant="ghost" size="icon">P</Button>
       </nav>
    </div>
  );
}
