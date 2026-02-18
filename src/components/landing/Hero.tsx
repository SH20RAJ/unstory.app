import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background text-foreground pt-16">
      {/* Lamp Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-accent/20 blur-[80px] rounded-full pointer-events-none animate-pulse-glow delay-75" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-4 max-w-5xl mx-auto">
        
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm mb-4">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Now live on 3 campuses
        </div>

        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter bg-linear-to-br from-foreground to-foreground/50 bg-clip-text text-transparent pb-2">
          The <span className="italic">Quantum</span> <br />
          <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
            Campus Network
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
          Unistory connects you with the people, events, and opportunities that truly matter. 
          Stop scrolling, start living your real-world story.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link href="/login">
            <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 border-0 ring-offset-background">
              Join Your Campus
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-primary/20 hover:bg-primary/5 transition-all backdrop-blur-sm bg-background/50">
            Learn More
          </Button>
        </div>
        
        {/* Abstract Visual/Mockup Placeholder */}
        <div className="mt-16 relative w-full max-w-4xl h-64 md:h-96 rounded-t-3xl border border-white/10 bg-linear-to-b from-white/5 to-transparent backdrop-blur-md shadow-2xl overflow-hidden mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
             {/* Mock UI elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/20 text-9xl font-bold select-none">
              UNISTORY
            </div>
        </div>

      </div>
      
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
