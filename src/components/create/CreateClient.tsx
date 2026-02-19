"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Image as ImageIcon, 
  Type, 
  Calendar, 
  MapPin, 
  X, 
  Upload,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

type CreateType = "post" | "story" | "event";

export function CreateClient() {
  const [activeType, setActiveType] = useState<CreateType>("post");

  return (
    <div className="min-h-screen w-full bg-black text-white p-4 md:p-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create</h1>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10">
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Type Selection */}
      <div className="w-full max-w-2xl grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => setActiveType("post")}
          className={cn(
            "flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border transition-all duration-300",
            activeType === "post" 
              ? "bg-white text-black border-white" 
              : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
          )}
        >
          <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center transition-colors",
            activeType === "post" ? "bg-black/10" : "bg-white/10"
          )}>
            <Type className="h-6 w-6" />
          </div>
          <span className="font-medium">Post</span>
        </button>

        <button
          onClick={() => setActiveType("story")}
          className={cn(
            "flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border transition-all duration-300",
            activeType === "story" 
              ? "bg-[#FF5500] text-white border-[#FF5500]" 
              : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
          )}
        >
           <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center transition-colors",
            activeType === "story" ? "bg-white/20" : "bg-white/10"
          )}>
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="font-medium">Story</span>
        </button>

        <button
          onClick={() => setActiveType("event")}
          className={cn(
            "flex flex-col items-center justify-center gap-3 p-6 rounded-3xl border transition-all duration-300",
            activeType === "event" 
              ? "bg-[#7c3aed] text-white border-[#7c3aed]" 
              : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
          )}
        >
           <div className={cn(
            "h-12 w-12 rounded-full flex items-center justify-center transition-colors",
            activeType === "event" ? "bg-white/20" : "bg-white/10"
          )}>
            <Calendar className="h-6 w-6" />
          </div>
          <span className="font-medium">Event</span>
        </button>
      </div>

      {/* Main Form Content */}
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[40px] p-6 md:p-10 animate-in fade-in slide-in-from-bottom-8 duration-500">
        
        {activeType === "post" && (
          <div className="space-y-6">
            <div className="space-y-2">
                <Label className="text-lg font-medium">What&apos;s on your mind?</Label>
                <Textarea 
                    placeholder="Share your thoughts..." 
                    className="min-h-[150px] bg-black/20 border-white/10 resize-none text-lg placeholder:text-white/20 focus-visible:ring-white/20 rounded-2xl p-4" 
                />
            </div>
             <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-white/10 hover:bg-white/5 hover:text-white bg-transparent border-dashed">
                    <ImageIcon className="h-6 w-6 text-white/60" />
                    <span className="text-xs text-white/60">Add Photo</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-white/10 hover:bg-white/5 hover:text-white bg-transparent border-dashed">
                    <MapPin className="h-6 w-6 text-white/60" />
                    <span className="text-xs text-white/60">Add Location</span>
                </Button>
            </div>
            <Button className="w-full h-14 rounded-full text-lg font-bold bg-white text-black hover:bg-white/90 mt-4">
                Post
            </Button>
          </div>
        )}

        {activeType === "story" && (
            <div className="space-y-6 flex flex-col items-center justify-center py-12 text-center">
                 <div className="h-32 w-32 rounded-full bg-linear-to-tr from-[#FF5500] to-orange-400 flex items-center justify-center mb-6 shadow-2xl shadow-orange-500/20">
                    <Upload className="h-10 w-10 text-white" />
                 </div>
                 <h3 className="text-2xl font-bold">Upload to Story</h3>
                 <p className="text-white/40 max-w-xs">Share a moment that lasts for 24 hours. Photos and videos supported.</p>
                 <Button className="h-12 px-8 rounded-full bg-[#FF5500] hover:bg-[#FF5500]/90 text-white font-bold">
                    Select Media
                 </Button>
            </div>
        )}

        {activeType === "event" && (
             <div className="space-y-6">
                 <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Event Title</Label>
                         <Input placeholder="e.g. Campus Jazz Night" className="h-12 bg-black/20 border-white/10 rounded-xl" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input type="date" className="h-12 bg-black/20 border-white/10 rounded-xl" />
                        </div>
                         <div className="space-y-2">
                            <Label>Time</Label>
                            <Input type="time" className="h-12 bg-black/20 border-white/10 rounded-xl" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Location</Label>
                         <Input placeholder="e.g. Student Center" className="h-12 bg-black/20 border-white/10 rounded-xl" />
                    </div>
                 </div>
                 <Button className="w-full h-14 rounded-full text-lg font-bold bg-[#7c3aed] text-white hover:bg-[#7c3aed]/90 mt-4">
                    Create Event
                </Button>
             </div>
        )}

      </div>
    </div>
  );
}
