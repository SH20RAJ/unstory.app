"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Users, GraduationCap, Calendar, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { FeedPost } from "@/components/dashboard/feed/FeedPost";

interface CollegeClientProps {
    college: {
        id: string;
        name: string;
        location: string | null;
        state: string;
        district: string;
        emailDomain: string | null;
        yearEstablished: string | null;
        website: string | null;
        stats: { students: number };
        enrolledUsers: Array<{
            id: string;
            name: string;
            username: string;
            avatar: string | null;
        }>;
        recentPosts: Array<{
            post: unknown;
            user: unknown;
        }>;
    };
}

// Helper to map DB post to UI Post
function mapToUIFeedPost(dbPost: Record<string, unknown>, dbUser: Record<string, unknown>, collegeName: string) {
    return {
        id: dbPost.id as number,
        user: {
            name: (dbUser.nickname || dbUser.name) as string,
            username: dbUser.username as string,
            avatar: (dbUser.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${dbUser.username}`) as string,
            verified: dbUser.verified as boolean,
            collegeSafeName: collegeName,
        },
        time: new Date(dbPost.createdAt as string).toLocaleDateString(),
        type: dbPost.type as "text" | "image" | "video" | "poll" | "event" | "article",
        content: (dbPost.content || "") as string,
        image: (dbPost.mediaUrls as string[])?.[0],
        likes: (dbPost.likesCount || 0) as number,
        comments: (dbPost.commentsCount || 0) as number,
        shares: (dbPost.sharesCount || 0) as number,
    };
}

export function CollegeClient({ college }: CollegeClientProps) {
  return (
    <DashboardLayout>
      <div className="flex flex-col h-full w-full max-w-4xl mx-auto pb-20">
        
        {/* Hero Section */}
        <div className="relative w-full h-64 md:h-80 rounded-b-[40px] overflow-hidden bg-zinc-900 border border-t-0 border-white/10 shrink-0">
             {/* ... */}
             <div className="absolute inset-0 bg-linear-to-b from-[#FFE500]/20 via-[#FFE500]/5 to-transparent mix-blend-overlay" />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
             
             <div className="absolute bottom-8 left-8 right-8 flex items-end gap-6">
                  {/* College Logo/Icon */}
                  <div className="h-24 w-24 md:h-32 md:w-32 rounded-3xl bg-[#121212] border-4 border-[#09090b] flex items-center justify-center shadow-2xl overflow-hidden relative shrink-0">
                      <div className="absolute inset-0 bg-linear-to-tr from-[#FFE500]/20 to-transparent" />
                      <GraduationCap className="h-10 w-10 text-white z-10" />
                  </div>
                  
                  {/* Title & Info */}
                  <div className="flex-1 pb-2 md:pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg mb-2">{college.name}</h1>
                          <div className="flex items-center gap-4 text-white/80 text-sm md:text-base font-medium">
                              <span className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                                  <MapPin className="h-4 w-4 text-[#FFE500]" /> {college.location || `${college.district}, ${college.state}`}
                              </span>
                              {college.emailDomain && (
                                  <span className="hidden md:flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                                      <Mail className="h-4 w-4 text-[#FFE500]" /> @{college.emailDomain}
                                  </span>
                              )}
                          </div>
                      </div>

                      <div className="flex gap-2">
                          <Button className="bg-white text-black hover:bg-gray-200 rounded-full font-bold px-6">Join Network</Button>
                      </div>
                  </div>
             </div>
        </div>

        {/* Two Column Layout below Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 px-4 md:px-0">
            
            {/* Left Sidebar (Info) */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                <div className="bg-[#121212] rounded-3xl border border-white/5 p-6 flex flex-col gap-5">
                    <h3 className="font-bold text-lg text-white">About</h3>
                    
                    {college.yearEstablished && (
                        <div className="flex items-center gap-3 text-white/70">
                            <Calendar className="h-5 w-5 text-white/40" />
                            <span>Established in <strong>{college.yearEstablished}</strong></span>
                        </div>
                    )}
                    
                    {college.website && (
                        <div className="flex items-center gap-3 text-white/70">
                            <Globe className="h-5 w-5 text-white/40" />
                            <a href={`https://${college.website}`} target="_blank" rel="noreferrer" className="text-[#FFE500] hover:underline">
                                {college.website}
                            </a>
                        </div>
                    )}

                    <div className="flex items-center gap-3 text-white/70">
                        <Users className="h-5 w-5 text-white/40" />
                        <span><strong>{college.stats?.students || 0}+</strong> Students on Unstory</span>
                    </div>
                </div>

                {/* Enrolled Users Preview */}
                {college.enrolledUsers?.length > 0 && (
                    <div className="bg-[#121212] rounded-3xl border border-white/5 p-6">
                        <h3 className="font-bold text-lg text-white mb-4">Current Students</h3>
                        <div className="flex flex-col gap-4">
                            {college.enrolledUsers.map((u) => (
                                <Link href={`/${u.username}`} key={u.id}>
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border border-white/10 group-hover:border-white/30 transition-colors">
                                                <AvatarImage src={u.avatar || undefined} />
                                                <AvatarFallback>{u.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-white text-sm font-semibold leading-tight group-hover:text-[#FFE500] transition-colors">{u.name}</span>
                                                <span className="text-white/40 text-xs">@{u.username}</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs text-white/50 group-hover:text-white bg-white/5">View</Button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Feed (Posts) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="bg-[#121212] rounded-full border border-white/5 p-2 flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Button className="rounded-full bg-white/10 text-white hover:bg-white/20 px-6 font-semibold shadow-none border-none">Campus Feed</Button>
                        <Button variant="ghost" className="rounded-full text-white/50 hover:text-white px-6">Announcements</Button>
                    </div>
                </div>

                {college.recentPosts?.length > 0 ? (
                    college.recentPosts.map((item) => (
                        <FeedPost key={(item.post as { id: number }).id} post={mapToUIFeedPost(item.post as Record<string, unknown>, item.user as Record<string, unknown>, college.name)} />
                    ))
                ) : (
                    <div className="py-20 text-center flex flex-col items-center justify-center opacity-40">
                        <MessageCircle className="h-12 w-12 mb-4 text-white/30" />
                        <h4 className="text-lg font-bold text-white mb-1">No posts yet</h4>
                        <p className="text-white/60">Be the first to post on the campus feed.</p>
                    </div>
                )}
            </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
