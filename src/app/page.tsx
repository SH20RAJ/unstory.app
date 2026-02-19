import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/landing/Hero";

import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  const user = await stackServerApp.getUser();
//   if (user) {
//     redirect("/home");
//   }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex h-16 items-center justify-between px-6 border-b border-border/10">
        <div className="text-xl font-bold tracking-tight">Unstory</div>
        <nav className="flex gap-4 items-center">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.displayName || user.primaryEmail}</span>
              <Link href="/home">
                <Button variant="ghost">Home</Button>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          )}
        </nav>
      </header>      
      <Hero />
      
      {/* Stats / Trusted By */}
      <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">Trusted by students from <span className="text-foreground font-bold">1,350+</span> colleges including</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholders for logos */}
                <div className="text-xl font-bold flex items-center gap-2"><span className="h-8 w-8 bg-current rounded-full"></span> Uni One</div>
                <div className="text-xl font-bold flex items-center gap-2"><span className="h-8 w-8 bg-current rounded-full"></span> Tech State</div>
                <div className="text-xl font-bold flex items-center gap-2"><span className="h-8 w-8 bg-current rounded-full"></span> Campus X</div>
                <div className="text-xl font-bold flex items-center gap-2"><span className="h-8 w-8 bg-current rounded-full"></span> Modern U</div>
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything you need to <span className="text-primary">thrive</span></h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Your campus life, upgraded. Discover, connect, and engage like never before.</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
            <div className="group relative p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">
                        🎉
                    </div>
                    <h3 className="text-xl font-bold mb-3">Discover Events</h3>
                    <p className="text-muted-foreground">
                        Find out what&apos;s happening on campus today. From exclusive club meetings to impromptu study sessions.
                    </p>
                </div>
            </div>
            <div className="group relative p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden">
                 <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="relative z-10">
                    <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent text-3xl mb-6 group-hover:scale-110 transition-transform">
                        🤝
                    </div>
                    <h3 className="text-xl font-bold mb-3">Connect Authentically</h3>
                    <p className="text-muted-foreground">
                        Meet people who share your major, hobbies, and vibe. No swiping, just real connections based on shared interests.
                    </p>
                </div>
            </div>
            <div className="group relative p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl mb-6 group-hover:scale-110 transition-transform">
                        💬
                    </div>
                    <h3 className="text-xl font-bold mb-3">Real-time Chat</h3>
                    <p className="text-muted-foreground">
                        Coordinate with your groups, flash mobs, and friends instantly. Never miss a beat of the campus pulse.
                    </p>
                </div>
            </div>
        </div>
      </section>
      
      {/* How it Works / Steps */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How Unstory works</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">Three simple steps to unlock your best campus life.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-linear-to-r from-transparent via-border to-transparent -z-10" />

                <div className="flex flex-col items-center text-center gap-4">
                    <div className="h-24 w-24 rounded-full bg-background border-4 border-muted flex items-center justify-center text-2xl font-bold shadow-lg z-10">1</div>
                    <h3 className="text-xl font-bold">Verify Identity</h3>
                    <p className="text-muted-foreground">Sign up with your .edu email to access your exclusive campus network.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                    <div className="h-24 w-24 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center text-2xl font-bold shadow-lg shadow-primary/10 z-10 text-primary">2</div>
                    <h3 className="text-xl font-bold">Choose Interests</h3>
                    <p className="text-muted-foreground">Select what you love—tech, hiking, jazz, or gaming—to curate your feed.</p>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                     <div className="h-24 w-24 rounded-full bg-background border-4 border-accent/20 flex items-center justify-center text-2xl font-bold shadow-lg shadow-accent/10 z-10 text-accent">3</div>
                    <h3 className="text-xl font-bold">Start Living</h3>
                    <p className="text-muted-foreground">Join activities, meet new people, and create memories offline.</p>
                </div>
            </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center relative">
             <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
             <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Ready to find your people?</h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                    Join thousands of students who are already using Unstory to make the most of their college years.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/login">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
                            Get Started Now
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border/10">
        <div className="flex justify-center gap-6 mb-4">
             <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
             <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
        </div>
        <p>&copy; {new Date().getFullYear()} Unstory. Built for students.</p>
      </footer>
    </div>
  );
}
