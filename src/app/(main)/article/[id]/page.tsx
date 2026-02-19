"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Share2, Bookmark, MoreHorizontal, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ARTICLE_CONTENT } from "../../../../../db/articles";

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id;
  const article = ARTICLE_CONTENT; // In a real app, find by ID

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
                <Badge className="w-fit bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border-purple-500/20">{article.category}</Badge>
                
                <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                    {article.title}
                </h1>

                <div className="flex items-center justify-between py-6 border-y border-white/10">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={article.author.avatar} />
                            <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{article.author.name}</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>Published {article.author.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.author.readTime}</span>
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
                    src={article.coverImage} 
                    alt="Article Cover" 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <article className="prose prose-invert prose-lg max-w-none text-white/80" dangerouslySetInnerHTML={{ __html: article.content }} />

            {/* Bottom Actions */}
            <div className="mt-12 py-8 border-t border-white/10 flex items-center justify-between">
                <div className="flex gap-4">
                     <Button variant="outline" className="rounded-full gap-2 border-white/10 hover:bg-white/10 hover:text-white">
                         <Heart className="h-4 w-4" /> {article.stats.likes} Likes
                     </Button>
                     <Button variant="outline" className="rounded-full gap-2 border-white/10 hover:bg-white/10 hover:text-white">
                         <MessageCircle className="h-4 w-4" /> {article.stats.comments} Comments
                     </Button>
                </div>
            </div>
       </div>
    </DashboardLayout>
  );
}
