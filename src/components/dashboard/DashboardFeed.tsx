"use client";

import { StoryRail } from "./stories/StoryRail";
import { CreatePost } from "./feed/CreatePost";
import { FeedPost, Post } from "./feed/FeedPost";

const posts: Post[] = [
  {
    id: 1,
    user: {
      name: "Mudreh Kumbirai",
      username: "@Muhadrehh",
      avatar: "https://i.pravatar.cc/150?u=5",
      verified: true
    },
    time: "1 hr ago",
    type: "image",
    content: "In some cases you may see a third-party client name, which indicates the Tweet came from a non-Twitter application.",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?q=80&w=1000&auto=format&fit=crop",
    likes: 1240,
    comments: 45,
    shares: 12
  },
  {
    id: 2,
    user: {
      name: "Design Team",
      username: "@designers",
      avatar: "https://github.com/shadcn.png",
      verified: true
    },
    time: "2 hrs ago",
    type: "poll",
    content: "Which tool do you use for prototyping?",
    poll: {
      question: "Which tool do you use for prototyping?",
      options: [
        { label: "Figma", votes: 450, percentage: 70 },
        { label: "Adobe XD", votes: 120, percentage: 20 },
        { label: "Sketch", votes: 60, percentage: 10 },
      ],
      totalVotes: 630
    },
    likes: 340,
    comments: 89,
    shares: 5
  },
   {
    id: 3,
    user: {
      name: "Campus Events",
      username: "@events_hq",
      avatar: "https://i.pravatar.cc/150?u=8",
      verified: true
    },
    time: "4 hrs ago",
    type: "event",
    content: "Join us for the annual tech hackathon! 🚀",
    event: {
      title: "Spring Hackathon 2026",
      date: "Sat, Mar 15 • 10:00 AM",
      location: "Student Center Hall B",
      attendees: 142
    },
    likes: 850,
    comments: 120,
    shares: 200
  },
  {
    id: 4,
    user: {
      name: "Sarah Chen",
      username: "@sarah_writes",
      avatar: "https://i.pravatar.cc/150?u=9",
    },
    time: "6 hrs ago",
    type: "article",
    content: "Just published my thoughts on the future of AI in education.",
    article: {
      title: "The AI Classroom: A New Era",
      summary: "How artificial intelligence is reshaping personalized learning and what it means for students and teachers alike.",
      readTime: "5 min read"
    },
    likes: 420,
    comments: 34,
    shares: 18
  }
];

export function DashboardFeed() {
  return (
    <div className="flex flex-col gap-8 h-full max-w-2xl mx-auto w-full">
        <StoryRail />
        <CreatePost />
        
        <div className="space-y-6">
            {posts.map((post) => (
                <FeedPost key={post.id} post={post} />
            ))}
        </div>
    </div>
  );
}
