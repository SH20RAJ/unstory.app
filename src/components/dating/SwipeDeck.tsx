"use client";

import { useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from "framer-motion";
import { DatingProfile } from "@/db/schema";
import { DatingCard } from "./DatingCard";
import { Button } from "@/components/ui/button";
import { X, Heart, RotateCcw } from "lucide-react";

interface SwipeDeckProps {
  profiles: DatingProfile[];
}

export function SwipeDeck({ profiles }: SwipeDeckProps) {
  const [index, setIndex] = useState(0);
  const [exitX, setExitX] = useState<number | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45]);
  // const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  // const opacity = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  
  // Visual indicators for swipe
  const crossOpacity = useTransform(x, [-100, -20], [1, 0]);
  const heartOpacity = useTransform(x, [20, 100], [0, 1]);

  const controls = useAnimation();

  const handleDragEnd = async (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitX(200);
      setIndex(index + 1);
    } else if (info.offset.x < -threshold) {
      setExitX(-200);
      setIndex(index + 1);
    } else {
      controls.start({ x: 0 });
    }
  };

  const handleLike = () => {
      setExitX(200);
      setTimeout(() => setIndex(index + 1), 200); // Wait for animation start
  };

  const handleNope = () => {
      setExitX(-200);
      setTimeout(() => setIndex(index + 1), 200);
  };

  // Reset for next card
  if (exitX !== null) {
      setTimeout(() => {
          x.set(0);
          setExitX(null);
      }, 200);
  }

  const currentProfile = profiles[index];

  if (index >= profiles.length) {
      return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="h-20 w-20 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Heart className="h-10 w-10 text-white/20" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">That&apos;s everyone!</h3>
              <p className="text-white/50 mb-8">Check back later for more people near your campus.</p>
              <Button 
                onClick={() => setIndex(0)}
                className="bg-[#FFE500] text-black hover:bg-[#FFE500]/90 rounded-full px-8"
              >
                  Start Over <RotateCcw className="ml-2 h-4 w-4" />
              </Button>
          </div>
      );
  }

  return (
    <div className="relative w-full h-full max-h-[600px] flex flex-col items-center">
        {/* Card Stack */}
        <div className="relative w-full h-full md:w-[400px]">
            {/* Background Card (Next in line) */}
            {profiles[index + 1] && (
                <div className="absolute inset-0 scale-95 translate-y-4 opacity-50 z-0">
                     <DatingCard profile={profiles[index + 1]} />
                </div>
            )}

            {/* Active Card */}
            <motion.div
                key={currentProfile.id}
                className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing touch-none"
                style={{ x, rotate }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={exitX !== null ? { x: exitX, opacity: 0 } : controls}
                transition={{ duration: 0.2 }}
            >
                 <DatingCard profile={currentProfile} />

                {/* Swipe Indicators */}
                 <motion.div style={{ opacity: heartOpacity }} className="absolute top-8 right-8 z-20 transform rotate-12 bg-green-500 text-white px-4 py-1 rounded-lg border-4 border-green-400 font-bold text-2xl tracking-widest shadow-xl">
                    LIKE
                 </motion.div>
                 <motion.div style={{ opacity: crossOpacity }} className="absolute top-8 left-8 z-20 transform -rotate-12 bg-red-500 text-white px-4 py-1 rounded-lg border-4 border-red-400 font-bold text-2xl tracking-widest shadow-xl">
                    NOPE
                 </motion.div>
            </motion.div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-6">
            <Button 
                size="icon" 
                className="h-14 w-14 rounded-full bg-[#1A1A1A] text-red-500 hover:bg-[#252525] border border-red-500/20 shadow-lg transition-transform hover:scale-110 active:scale-95"
                onClick={handleNope}
            >
                <X className="h-6 w-6" />
            </Button>
            
            <Button 
                size="icon" 
                className="h-12 w-12 rounded-full bg-[#1A1A1A] text-[#FFE500] hover:bg-[#252525] border border-[#FFE500]/20 shadow-lg transition-transform hover:scale-110 active:scale-95"
                onClick={() => setIndex(0)}
            >
                <RotateCcw className="h-5 w-5" />
            </Button>

            <Button 
                size="icon" 
                className="h-14 w-14 rounded-full bg-[#1A1A1A] text-green-500 hover:bg-[#252525] border border-green-500/20 shadow-lg transition-transform hover:scale-110 active:scale-95"
                onClick={handleLike}
            >
                <Heart className="h-6 w-6 fill-current" />
            </Button>
        </div>
    </div>
  );
}
