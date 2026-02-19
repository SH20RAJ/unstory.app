"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Share2, Bookmark, MoreHorizontal, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id;

  return (
    <DashboardLayout showRightSidebar={false}>
       <div className="max-w-3xl mx-auto w-full pb-20">
            {/* Back Nav */}
            <div className="mb-6">
                <Link href="/home">
                    <Button variant="ghost" size="sm" className="pl-0 gap-2 text-muted-foreground hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> Back to Feed
                    </Button>
                </Link>
            </div>

            {/* Header */}
            <header className="mb-8 flex flex-col gap-6">
                <Badge className="w-fit bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/20">Technology</Badge>
                
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    The Future of Campus Tech: How AI is Changing Student Life
                </h1>

                <div className="flex items-center justify-between py-6 border-y border-white/10">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">Alex Rivera</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>Published Feb 24, 2026</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
                            </p>
                        </div>
                    </div>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-full">
                            <Share2 className="h-5 w-5" />
                        </Button>
                         <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-full">
                            <Bookmark className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white rounded-full">
                            <MoreHorizontal className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Cover Image */}
            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-10 bg-white/5">
                <Image 
                    src="https://images.unsplash.com/photo-1531297461136-82087565c5da?w=1200&q=80" 
                    alt="Article Cover" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <article className="prose prose-invert prose-lg max-w-none text-white/80">
                <p className="lead text-xl text-white/90">
                    Artificial Intelligence isn't just a buzzword anymore—it's actively reshaping how we learn, connect, and organize our lives on campus. From personalized study plans to AI-driven social events, the landscape is shifting rapidly.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <h3>The Rise of Smart Campuses</h3>
                <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <blockquote>
                    "The integration of AI in daily student activities is the biggest leap since the smartphone." - Dr. Emily Chen, BIT Mesra
                </blockquote>
                <p>
                    Experience is key. When we look at how students interact with technology today, it's seamless. The barriers are dissolving.
                </p>
                <figure>
                     <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="Students working" className="rounded-xl w-full" />
                     <figcaption className="text-center text-sm text-muted-foreground mt-2">Students collaborating in a smart lab.</figcaption>
                </figure>
                <h3>What's Next?</h3>
                <p>
                    As we move forward, the question isn't if AI will be part of our lives, but how we shape it.
                </p>
            </article>

            {/* Bottom Actions */}
            <div className="mt-12 py-8 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-4">
                     <Button variant="outline" className="rounded-full gap-2 border-white/10 hover:bg-white/10 hover:text-white">
                         <Heart className="h-4 w-4" /> 1.2k Likes
                     </Button>
                     <Button variant="outline" className="rounded-full gap-2 border-white/10 hover:bg-white/10 hover:text-white">
                         <MessageCircle className="h-4 w-4" /> 142 Comments
                     </Button>
                </div>
            </div>
       </div>
    </DashboardLayout>
  );
}
