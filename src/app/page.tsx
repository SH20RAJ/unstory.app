import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/landing/Hero";

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
      
      <Hero />
      
      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid gap-12 md:grid-cols-3">
        <div className="flex flex-col gap-4 text-center items-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
            🎉
          </div>
          <h3 className="text-xl font-semibold">Discover Events</h3>
          <p className="text-muted-foreground">
            Find out what&apos;s happening on campus today. From club meetings to study sessions.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-center items-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
          <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center text-accent text-2xl">
            🤝
          </div>
          <h3 className="text-xl font-semibold">Connect Authentically</h3>
          <p className="text-muted-foreground">
            Meet people who share your major, hobbies, and interests. No swipes, just connection.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-center items-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
            💬
          </div>
          <h3 className="text-xl font-semibold">Real-time Chat</h3>
          <p className="text-muted-foreground">
            Coordinate with your groups and friends instantly. Never miss a beat.
          </p>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/10">
        <p>&copy; {new Date().getFullYear()} Unistory. Built for students.</p>
      </footer>
    </div>
  );
}
