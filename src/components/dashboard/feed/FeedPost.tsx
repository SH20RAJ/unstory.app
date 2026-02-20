"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Heart, 
  MessageCircle, 
  Share2,
  Calendar,
  MapPin,
  FileText,
  Flag,
  Bookmark
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { toggleLikePost } from "@/actions/posts.actions";

export type PostType = 'text' | 'image' | 'video' | 'poll' | 'event' | 'article';

export interface Post {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
    collegeSafeName?: string; // e.g., "BIT Mesra"
  };
  time: string;
  type: PostType;
  content: string;
  image?: string;
  poll?: {
    question: string;
    options: { label: string; votes: number; percentage: number }[];
    totalVotes: number;
  };
  event?: {
    title: string;
    date: string;
    location: string;
    attendees: number;
  };
  article?: {
    title: string;
    summary: string;
    readTime: string;
  };
  likes: number;
  comments: number;
  shares: number;
}

interface FeedPostProps {
  post: Post;
  isDetailedView?: boolean;
}

export function FeedPost({ post, isDetailedView = false }: FeedPostProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Optimistic UI update
    const wasLiked = isLiked;
    setIsLiked(!wasLiked);
    setLikesCount(prev => wasLiked ? prev - 1 : prev + 1);

    try {
        const result = await toggleLikePost(post.id);
        if (result.liked !== !wasLiked) {
            // Revert on mismatch (rare)
            setIsLiked(result.liked);
            setLikesCount(prev => result.liked ? prev + 1 : prev - 1);
        }
    } catch {
        // Revert on failure
        setIsLiked(wasLiked);
        setLikesCount(prev => wasLiked ? prev + 1 : prev - 1);
        toast.error("Failed to like post.");
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    toast.success("Link copied to clipboard!");
  };
  
  const handleSave = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsSaved(!isSaved);
      toast.success(isSaved ? "Removed from Saved" : "Post Saved");
  };

  const navigateToPost = () => {
      if (!isDetailedView) {
          router.push(`/post/${post.id}`);
      }
  };

  const navigateToProfile = (e: React.MouseEvent) => {
      e.stopPropagation();
      // Using a generic profile route for now, can be /profile/[username]
      router.push(`/@${post.user.username}`);
  };

  const renderContentWithHashtags = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(#[a-zA-Z0-9_]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('#')) {
        const query = encodeURIComponent(part);
        return (
          <Link 
            key={i} 
            href={`/search?q=${query}`}
            onClick={(e) => e.stopPropagation()} 
            className="text-[#FFE500] hover:underline"
          >
            {part}
          </Link>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div 
        className={cn(
            "bg-[#121212] rounded-[32px] p-6 border border-white/5 space-y-4 transition-colors",
            !isDetailedView && "hover:border-white/10 cursor-pointer"
        )}
        onClick={navigateToPost}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 group" onClick={navigateToProfile}>
          <Avatar className="h-10 w-10 border border-white/10 transition-transform group-hover:scale-105">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm hover:underline underline-offset-4 decoration-[#FFE500]">{post.user.name}</span>
              {post.user.verified && (
                <span className="bg-blue-500/20 text-blue-500 text-[10px] px-1.5 rounded-full">✓</span>
              )}
            </div>
            <div className="flex items-center text-white/40 text-xs gap-1">
               <span>@{post.user.username}</span>
               <span>•</span>
               <span className="text-[#FFE500]">{post.time}</span>
               {post.user.collegeSafeName && (
                   <>
                    <span>•</span>
                    <span className="text-white/30 truncate max-w-[100px]">{post.user.collegeSafeName}</span>
                   </>
               )}
            </div>
          </div>
        </div>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white/40 hover:text-white" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="h-5 w-5"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-white">
                <DropdownMenuItem onClick={handleSave} className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                    <Bookmark className="h-4 w-4 mr-2" />
                    {isSaved ? "Unsave" : "Save"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toast.error("Report submitted") }} className="cursor-pointer text-red-500 hover:text-red-400 hover:bg-red-500/10 focus:bg-red-500/10">
                    <Flag className="h-4 w-4 mr-2" />
                    Report
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
        {renderContentWithHashtags(post.content)}
      </div>

      {/* Media / Type Content */}
      {post.type === 'image' && post.image && (
        <div className="relative rounded-[24px] overflow-hidden aspect-video bg-[#1A1A1A] group">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: `url(${post.image})` }} 
          />
        </div>
      )}

      {post.type === 'poll' && post.poll && (
        <div className="space-y-3 pt-2" onClick={(e) => e.stopPropagation()}>
          {post.poll.options.map((option, idx) => (
            <div key={idx} className="relative group cursor-pointer" onClick={(e) => { e.stopPropagation(); toast.success(`Voted for ${option.label}`); }}>
              <div className="flex items-center justify-between text-sm text-white mb-1 px-1">
                <span>{option.label}</span>
                <span className="text-white/50">{option.percentage}%</span>
              </div>
              <div className="h-10 w-full bg-[#1A1A1A] rounded-xl overflow-hidden relative border border-white/5 group-hover:border-white/10 transition-colors">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#FFE500]/20" 
                  style={{ width: `${option.percentage}%` }} 
                />
              </div>
            </div>
          ))}
          <div className="text-xs text-white/40 px-1">
            {post.poll.totalVotes} votes • 12 hours left
          </div>
        </div>
      )}

      {post.type === 'event' && post.event && (
        <div className="rounded-[24px] bg-[#1A1A1A] p-1 border border-white/5 overflow-hidden group">
          <div className="relative h-32 bg-linear-to-r from-blue-600 to-purple-600 rounded-t-[20px] p-6 flex flex-col justify-between group-hover:brightness-110 transition-all">
            <div className="flex justify-between items-start">
              <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-bold uppercase tracking-wider">
                Event
              </div>
            </div>
            <h3 className="text-white text-xl font-bold">{post.event.title}</h3>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <Calendar className="h-4 w-4 text-[#FFE500]" />
                {post.event.date}
              </div>
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <MapPin className="h-3 w-3" />
                {post.event.location}
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-white/90 rounded-xl font-bold h-10 px-6" onClick={(e) => { e.stopPropagation(); toast.success("Registered for event!"); }}>
              Join
            </Button>
          </div>
        </div>
      )}

      {post.type === 'article' && post.article && (
        <div className="flex gap-4 p-4 rounded-[24px] bg-[#1A1A1A] border border-white/5 hover:bg-[#202020] transition-colors cursor-pointer group">
          <div className="h-24 w-24 bg-[#252525] rounded-xl shrink-0 flex items-center justify-center">
            <FileText className="h-8 w-8 text-white/20 group-hover:text-[#FFE500] transition-colors" />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <div className="text-[#FFE500] text-xs font-medium uppercase tracking-wider">Article</div>
            <h3 className="text-white font-bold leading-tight group-hover:underline decoration-[#FFE500] underline-offset-4">
              {post.article.title}
            </h3>
            <p className="text-white/50 text-xs line-clamp-2">{post.article.summary}</p>
            <span className="text-white/30 text-[10px] mt-1">{post.article.readTime}</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button 
            size="icon" 
            variant="ghost" 
            className={cn(
                "rounded-full h-10 w-10 transition-colors",
                isLiked ? "text-red-500 bg-red-500/10 hover:bg-red-500/20" : "text-white/40 hover:text-red-500 hover:bg-red-500/10"
            )}
            onClick={handleLike}
          >
            <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
          </Button>
          <span className="text-white/40 text-xs flex items-center mr-3 font-medium min-w-[20px]">{likesCount}</span>

          <Button 
            size="icon" 
            variant="ghost" 
            className="text-white/40 hover:text-blue-500 hover:bg-blue-500/10 rounded-full h-10 w-10 transition-colors"
            onClick={navigateToPost}
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
          <span className="text-white/40 text-xs flex items-center mr-3 font-medium min-w-[20px]">{post.comments}</span>

          <Button 
            size="icon" 
            variant="ghost" 
            className="text-white/40 hover:text-green-500 hover:bg-green-500/10 rounded-full h-10 w-10 transition-colors"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
