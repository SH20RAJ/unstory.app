"use client";

import { FeedPost, Post } from "@/components/dashboard/feed/FeedPost";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";



interface PostClientProps {
    post: Post;
}

export function PostClient({ post }: PostClientProps) {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#09090b] flex flex-col font-sans">
      
      <div className="max-w-2xl mx-auto w-full p-4 md:p-8">
        <Button 
            variant="ghost" 
            className="mb-6 text-white/60 hover:text-white pl-0 gap-2"
            onClick={() => router.back()}
        >
            <ArrowLeft className="h-4 w-4" /> Back to Feed
        </Button>

        <FeedPost post={post} isDetailedView={true} />

        <div className="mt-8 border-t border-white/5 pt-8">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#FFE500]" />
                Comments ({post.comments})
            </h3>
            
            <div className="flex gap-4 mb-8">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>RM</AvatarFallback>
                </Avatar>
                <div className="flex-1 gap-2 flex flex-col">
                    <Textarea 
                        placeholder="Write a comment..." 
                        className="bg-[#121212] border-white/5 text-white min-h-[80px] rounded-xl focus-visible:ring-1 focus-visible:ring-[#FFE500]/50"
                    />
                    <div className="flex justify-end">
                        <Button className="bg-[#FFE500] text-black hover:bg-[#FFE500]/90 font-bold rounded-full px-6">Reply</Button>
                    </div>
                </div>
            </div>

            {/* Mock Comments */}
            <div className="space-y-6">
                 {[1, 2, 3].map((i) => (
                     <div key={i} className="flex gap-4">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 10}`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="text-white font-bold text-sm">User {i}</span>
                                 <span className="text-white/30 text-xs">2h ago</span>
                             </div>
                             <p className="text-white/80 text-sm">This is such a great initiative! Can&apos;t wait to see everyone there. 🔥</p>
                        </div>
                     </div>
                 ))}
            </div>
        </div>
      </div>
    </div>
  );
}
