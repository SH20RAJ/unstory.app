"use client";

import { StoryRail } from "./stories/StoryRail";
import { CreatePost } from "./feed/CreatePost";
import { FeedPost, Post } from "./feed/FeedPost";

import { POSTS } from "@db/posts";

export function DashboardFeed() {
  return (
    <div className="flex flex-col gap-8 h-full max-w-2xl mx-auto w-full">
        <StoryRail />
        <CreatePost />
        
        <div className="space-y-6">
            {POSTS.map((post) => (
                <FeedPost key={post.id} post={post as any} />
            ))}
        </div>
    </div>
  );
}
