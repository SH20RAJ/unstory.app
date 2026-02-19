import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative flex min-h-[90vh] flex-col md:flex-row items-center justify-center overflow-hidden bg-background text-foreground pt-20 md:pt-0 px-4 md:px-12 gap-12">
      {/* Lamp Effect (Adjusted) */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-full max-w-3xl h-64 bg-primary/20 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-full max-w-lg h-32 bg-accent/20 blur-[80px] rounded-full pointer-events-none animate-pulse-glow delay-75" />

      {/* Left Content */}
      <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-2xl flex-1">
        
        {/* Badge */}
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Now live on 3 campuses
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-linear-to-br from-foreground to-foreground/50 bg-clip-text text-transparent pb-2">
          The <span className="italic">Quantum</span> <br />
          <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient">
            Campus Network
          </span>
        </h1>
        
        <p className="max-w-xl text-lg md:text-xl text-muted-foreground/80 leading-relaxed">
          Unistory connects you with the people, events, and opportunities that truly matter. 
          Stop scrolling, start living your real-world story.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Link href="/login">
            <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 border-0 ring-offset-background">
              Join Your Campus
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 border-primary/20 hover:bg-primary/5 transition-all backdrop-blur-sm bg-background/50">
            Learn More
          </Button>
        </div>
      </div>
      
      {/* Right Side Image */}
      <div className="relative flex-1 w-full max-w-xl md:max-w-none flex justify-center md:justify-end">
          <div className="relative w-full aspect-[4/5] md:aspect-square max-w-md md:max-w-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
             <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10" />
             <img 
               src="https://images.unsplash.com/photo-1761839258045-6ef373ab82a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
               alt="Campus Life" 
               className="object-cover w-full h-full scale-110 hover:scale-100 transition-transform duration-700"
             />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-3xl opacity-50" />
      </div>

      
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
