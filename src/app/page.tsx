import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex h-16 items-center justify-between px-6 border-b border-border/10">
        <div className="text-xl font-bold tracking-tight">Unistory</div>
        <nav className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 gap-8">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
          The Campus Operating System for <span className="text-primary">Real-World Connection</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
          A verified campus network for students to discover activities, connect based on shared interests, and build meaningful relationships.
        </p>
        <div className="flex gap-4">
           <Link href="/login">
            <Button size="lg" className="rounded-full px-8">
              Join Your Campus
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-8">
            Learn More
          </Button>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/10">
        <p>&copy; {new Date().getFullYear()} Unistory. Built for students.</p>
      </footer>
    </div>
  );
}
