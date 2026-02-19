"use client";

import { cn } from "@/lib/utils";

interface ChatLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ChatLayout({ children, className }: ChatLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] bg-[#09090b]", className)}>
      {children}
    </div>
  );
}
