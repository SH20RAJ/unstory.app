"use client";

import { FeedPost, Post } from "@/components/dashboard/feed/FeedPost";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";


import { useState } from "react";
import { addComment } from "@/actions/posts.actions";
import { toast } from "sonner";

export interface CommentType {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  time: string;
}

interface PostClientProps {
    post: Post;
    initialComments: CommentType[];
}

export function PostClient({ post, initialComments }: PostClientProps) {
  const router = useRouter();
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = async () => {
    if (!newComment.trim()) return;
    try {
        setIsSubmitting(true);
        await addComment(post.id, newComment);
        
        // Optimistic UI update or refresh
        setComments(prev => [
            {
               id: Date.now(),
               user: {
                   name: "You",
                   username: "you",
                   avatar: "https://github.com/shadcn.png",
                   verified: false
               },
               content: newComment,
               time: "Just now"
            },
            ...prev
        ]);
        setNewComment("");
        toast.success("Comment added!");
    } catch {
        toast.error("Failed to add comment.");
    } finally {
        setIsSubmitting(false);
    }
  };

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
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..." 
                        className="bg-[#121212] border-white/5 text-white min-h-[80px] rounded-xl focus-visible:ring-1 focus-visible:ring-[#FFE500]/50"
                        disabled={isSubmitting}
                    />
                    <div className="flex justify-end">
                        <Button 
                          onClick={handleReply}
                          disabled={!newComment.trim() || isSubmitting}
                          className="bg-[#FFE500] text-black hover:bg-[#FFE500]/90 font-bold rounded-full px-6"
                        >
                          Reply
                        </Button>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
                 {comments.length === 0 && (
                     <div className="text-center text-white/40 py-8">No comments yet. Be the first!</div>
                 )}
                 {comments.map((comment) => (
                     <div key={comment.id} className="flex gap-4">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.user.avatar} />
                            <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                             <div className="flex items-center gap-2 mb-1">
                                 <span className="text-white font-bold text-sm">{comment.user.name}</span>
                                 {comment.user.verified && <span className="text-blue-500 text-[10px]">✓</span>}
                                 <span className="text-white/30 text-xs">@{comment.user.username} • {comment.time}</span>
                             </div>
                             <p className="text-white/80 text-sm">{comment.content}</p>
                        </div>
                     </div>
                 ))}
            </div>
        </div>
      </div>
    </div>
  );
}
