import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Lamp Effect (CSS-based for simplicity if framer-motion is heavy, but using minimal motion here) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 bg-accent/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center px-4">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter bg-linear-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
          The Campus <br />
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Operating System
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground">
          A verified network for real-world connection. Discover activities, find your tribe, and build meaningful relationships on campus.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login">
            <Button size="lg" className="rounded-full px-8 text-lg h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105">
              Join Your Campus
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-12 border-primary/20 hover:bg-primary/5 transition-all">
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
