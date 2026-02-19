"use client";

import { useState, useEffect, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Heart, Send } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Mock Story Data
export interface Story {
    id: string;
    user: {
        name: string;
        avatar: string;
    };
    media: string;
    type: 'image' | 'video';
    duration: number; // seconds
    viewed?: boolean;
    time: string;
}

interface StoryViewerProps {
    stories: Story[];
    initialStoryIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

export function StoryViewer({ stories, initialStoryIndex = 0, isOpen, onClose }: StoryViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentStory = stories[currentIndex];

    // Reset when opening
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialStoryIndex);
            setProgress(0);
        }
    }, [isOpen, initialStoryIndex]);

    // Progress Timer
    useEffect(() => {
        if (!isOpen || isPaused) return;

        const duration = currentStory.duration * 1000;
        const intervalTime = 50; // Update every 50ms
        const step = (intervalTime / duration) * 100;

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    handleNext();
                    return 0;
                }
                return prev + step;
            });
        }, intervalTime);

        return () => clearInterval(timer);
    }, [isOpen, isPaused, currentIndex, currentStory]);

    const handleNext = useCallback(() => {
        if (currentIndex < stories.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setProgress(0);
        } else {
            onClose();
        }
    }, [currentIndex, stories.length, onClose]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setProgress(0);
        }
    }, [currentIndex]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            {/* Background Blur (Desktop) */}
            <div className="absolute inset-0 hidden md:block opacity-30 blur-3xl scale-110">
                 <Image src={currentStory.media} alt="" fill className="object-cover" />
            </div>

            {/* Main Content */}
            <div className="relative w-full h-full md:w-[400px] md:h-[85vh] md:rounded-2xl overflow-hidden bg-black shadow-2xl flex flex-col">
                
                {/* Media */}
                <div className="absolute inset-0">
                    <Image 
                        src={currentStory.media} 
                        alt="Story" 
                        fill 
                        className="object-cover pointer-events-none"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
                </div>

                {/* Top Controls */}
                <div className="relative z-10 pt-4 px-4 flex flex-col gap-2">
                    {/* Progress Bars */}
                    <div className="flex gap-1 h-0.5 w-full">
                        {stories.map((story, idx) => (
                            <div key={story.id} className="h-full flex-1 bg-white/30 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-white transition-all duration-100 ease-linear"
                                    style={{ 
                                        width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%' 
                                    }} 
                                />
                            </div>
                        ))}
                    </div>

                    {/* Header */}
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 border border-white/20">
                                <AvatarImage src={currentStory.user.avatar} />
                                <AvatarFallback>{currentStory.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-semibold text-white leading-none">{currentStory.user.name}</p>
                                <p className="text-xs text-white/70">{currentStory.time}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                                onClick={onClose}
                            >
                                <X className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Navigation Overlay Areas */}
                <div className="absolute inset-0 flex z-0">
                    <div 
                        className="w-1/3 h-full cursor-pointer" 
                        onClick={handlePrev} 
                        onMouseDown={() => setIsPaused(true)}
                        onMouseUp={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    />
                    <div 
                        className="w-2/3 h-full cursor-pointer" 
                        onClick={handleNext}
                        onMouseDown={() => setIsPaused(true)}
                        onMouseUp={() => setIsPaused(false)}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                    />
                </div>

                {/* Bottom Interactions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex items-center gap-4">
                    <div className="flex-1 relative">
                        <input 
                            type="text" 
                            placeholder="Send message..." 
                            className="w-full bg-transparent border border-white/40 rounded-full py-3 px-5 text-white placeholder:text-white/60 focus:outline-none focus:border-white focus:ring-1 focus:ring-white/50 transition-all font-medium"
                        />
                    </div>
                    <Button size="icon" variant="ghost" className="rounded-full h-12 w-12 hover:bg-white/10 text-white">
                        <Heart className="h-7 w-7" />
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-full h-12 w-12 hover:bg-white/10 text-white -rotate-45">
                        <Send className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
