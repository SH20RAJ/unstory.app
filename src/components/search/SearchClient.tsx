"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { FeedPost, Post } from "@/components/dashboard/feed/FeedPost";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserResult {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  collegeSafeName?: string;
}

interface CommunityResult {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  memberCount: number | null;
}

interface SearchResults {
  users: UserResult[];
  communities: CommunityResult[];
  posts: Post[];
}

interface SearchClientProps {
  initialQuery: string;
  initialResults: SearchResults;
}

export function SearchClient({ initialQuery, initialResults }: SearchClientProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full pt-4">
      <form onSubmit={handleSearch} className="flex gap-2 mb-8 px-4 md:px-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
          <Input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search communities, people, or hashtags..." 
            className="pl-10 bg-[#121212] border-white/10 text-white rounded-xl h-12 focus-visible:ring-1 focus-visible:ring-[#FFE500]/50 text-base"
          />
        </div>
        <Button 
          type="submit" 
          className="bg-[#FFE500] text-black hover:bg-[#FFE500]/90 font-bold h-12 px-6 rounded-xl"
        >
          Search
        </Button>
      </form>

      {!initialQuery && (
        <div className="text-center py-20 text-white/40">
          <p>Find your tribe, discover discussions, or explore hashtags.</p>
        </div>
      )}

      {initialQuery && (
        <div className="space-y-10 px-4 md:px-0">
          
          {/* People Section */}
          {initialResults.users.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-white font-bold text-xl border-b border-white/10 pb-2">People</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initialResults.users.map(user => (
                  <Link key={user.id} href={`/@${user.username}`}>
                    <div className="flex items-center gap-3 p-3 bg-[#121212] border border-white/5 rounded-2xl hover:border-white/20 transition-colors">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <span className="text-white font-bold text-sm truncate">{user.name}</span>
                          {user.verified && <span className="text-blue-500 text-[10px]">✓</span>}
                        </div>
                        <span className="text-white/40 text-xs truncate">@{user.username}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Communities Section */}
          {initialResults.communities.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-white font-bold text-xl border-b border-white/10 pb-2">Communities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initialResults.communities.map(comm => (
                  <Link key={comm.id} href={`/community/${comm.slug}`}>
                    <div className="flex items-center gap-3 p-3 bg-[#121212] border border-white/5 rounded-2xl hover:border-white/20 transition-colors">
                      <div className="h-12 w-12 rounded-xl bg-white/5 flex flex-shrink-0 items-center justify-center text-white font-bold overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        {comm.image ? <img src={comm.image} alt={comm.name} className="h-full w-full object-cover" /> : comm.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-sm truncate">{comm.name}</span>
                        <span className="text-white/40 text-xs">{comm.memberCount} members</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Posts Section */}
          {initialResults.posts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-white font-bold text-xl border-b border-white/10 pb-2">Posts</h2>
              <div className="space-y-4">
                {initialResults.posts.map(post => (
                   <FeedPost key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {initialResults.users.length === 0 && initialResults.communities.length === 0 && initialResults.posts.length === 0 && (
            <div className="text-center py-20 text-white/40">
              <p>No results found for &quot;{initialQuery}&quot;</p>
              <p className="text-sm mt-2">Try searching for something else like a hashtag or name.</p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
