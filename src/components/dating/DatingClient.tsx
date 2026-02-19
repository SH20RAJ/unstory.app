"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SwipeDeck } from "@/components/dating/SwipeDeck";
import { DATING_PROFILES } from "@db/dating";
import { Heart, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DatingClient() {
  return (
    <DashboardLayout>
       <div className="flex flex-col h-[calc(100vh-80px)] md:h-screen max-w-2xl mx-auto w-full px-4 py-6">
           {/* Header */}
           <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-2">
                   <div className="h-10 w-10 rounded-full bg-linear-to-tr from-[#FF6B6B] to-[#FF8E53] flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <Heart className="h-5 w-5 text-white fill-white" />
                   </div>
                   <div>
                       <h1 className="text-2xl font-bold text-white">Campus Dating</h1>
                       <p className="text-xs text-white/50">Find connections nearby</p>
                   </div>
               </div>
               <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5 text-white">
                   <SlidersHorizontal className="h-4 w-4" />
               </Button>
           </div>

           {/* Swipe Area */}
           <div className="flex-1 flex flex-col justify-center pb-20">
               <SwipeDeck profiles={DATING_PROFILES} />
           </div>
       </div>
    </DashboardLayout>
  );
}
