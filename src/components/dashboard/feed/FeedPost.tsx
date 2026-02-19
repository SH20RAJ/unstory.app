"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Heart, 
  MessageCircle, 
  Send,
  Share2,
  Calendar,
  MapPin,
  FileText
} from "lucide-react";
import { cn } from "@/lib/utils";

export type PostType = 'text' | 'image' | 'video' | 'poll' | 'event' | 'article';

export interface Post {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
    verified?: boolean;
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
}

export function FeedPost({ post }: FeedPostProps) {
  return (
    <div className="bg-[#121212] rounded-[32px] p-6 border border-white/5 space-y-4 hover:border-white/10 transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.user.avatar} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-sm">{post.user.name}</span>
              {post.user.verified && (
                <span className="bg-blue-500/20 text-blue-500 text-[10px] px-1.5 rounded-full">✓</span>
              )}
            </div>
            <span className="text-white/40 text-xs">
              {post.user.username} • <span className="text-[#FFE500]">{post.time}</span>
            </span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-white/40 hover:text-white">
          <MoreVertical className="h-5 w-5"/>
        </Button>
      </div>

      {/* Content */}
      <p className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>

      {/* Media / Type Content */}
      {post.type === 'image' && post.image && (
        <div className="relative rounded-[24px] overflow-hidden aspect-video bg-[#1A1A1A] group cursor-pointer">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: `url(${post.image})` }} 
          />
        </div>
      )}

      {post.type === 'poll' && post.poll && (
        <div className="space-y-3 pt-2">
          {post.poll.options.map((option, idx) => (
            <div key={idx} className="relative group cursor-pointer">
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
        <div className="rounded-[24px] bg-[#1A1A1A] p-1 border border-white/5 overflow-hidden">
          <div className="relative h-32 bg-linear-to-r from-blue-600 to-purple-600 rounded-t-[20px] p-6 flex flex-col justify-between">
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
            <Button className="bg-white text-black hover:bg-white/90 rounded-xl font-bold h-10 px-6">
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
        <div className="flex gap-4">
          <Button size="icon" variant="ghost" className="text-white/40 hover:text-red-500 hover:bg-red-500/10 rounded-full h-10 w-10 transition-colors">
            <Heart className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-white/40 hover:text-blue-500 hover:bg-blue-500/10 rounded-full h-10 w-10 transition-colors">
            <MessageCircle className="h-5 w-5" />
          </Button>
          <Button size="icon" variant="ghost" className="text-white/40 hover:text-green-500 hover:bg-green-500/10 rounded-full h-10 w-10 transition-colors">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-white/40 text-xs">
          <span>{post.likes} likes</span>
          <span>•</span>
          <span>{post.comments} comments</span>
        </div>
      </div>
    </div>
  );
}
