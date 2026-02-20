"use client";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, UserPlus, MapPin, Link as LinkIcon, Calendar, Edit3 } from "lucide-react";
import { FeedPost } from "@/components/dashboard/feed/FeedPost";
import { User, College } from "@/db/schema";
import Link from "next/link";

const USER_POSTS = [
    {
      id: 1,
      user: { name: "Tanya Sharma", username: "tanyaux", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", verified: true, collegeSafeName: "BIT Mesra" },
      time: "2h ago",
      type: "event",
      content: "Hey everyone! The GDSC Solution Challenge kickoff is happening this Friday at the CAT Hall. Don't miss out! 🚀 #Google #DeveloperStudentClubs",
      event: { title: "Solution Challenge Kickoff 2024", date: "Fri, Feb 24 • 5:00 PM", location: "CAT Hall, Main Building", attendees: 142 },
      likes: 234, comments: 45, shares: 12
    },
];

interface PublicProfileClientProps {
    user: User;
    college: College | null | undefined;
    isCurrentUser: boolean;
}

export function PublicProfileClient({ user, college, isCurrentUser }: PublicProfileClientProps) {
  const displayName = user.nickname || user.name;
  const usernameStr = user.username || 'user';
  const socialLinks = user.socialLinks as { github?: string; linkedin?: string; portfolio?: string } || {};

  return (
    <DashboardLayout>
       <div className="flex flex-col gap-6">
          {/* Profile Header */}
          <div className="relative mb-12">
              {/* Banner */}
              <div className="h-48 w-full bg-linear-to-r from-pink-500/20 to-purple-500/20 rounded-t-2xl border-x border-t border-white/5 overflow-hidden">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   {user.banner && <img src={user.banner} alt="Banner" className="w-full h-full object-cover" />}
              </div>
              
              <div className="px-6 flex flex-col md:flex-row items-end md:items-end gap-6 -mt-16">
                  <Avatar className="h-32 w-32 border-4 border-[#09090b] shadow-xl">
                      <AvatarImage src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${usernameStr}`} />
                      <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 pb-2">
                       <h1 className="text-3xl font-bold flex items-center gap-2">
                           {displayName} 
                           {(user.role === 'Student' || !user.role) && <Badge variant="secondary" className="bg-[#FFE500] text-black hover:bg-[#FFE500]/90">Student</Badge>}
                       </h1>
                       <p className="text-muted-foreground text-lg">@{usernameStr.toLowerCase()} • {user.major || 'Major Not Set'} {user.year ? `'${user.year.slice(-2)}` : ''} {college ? `• ${college.name}` : ''}</p>
                  </div>

                  <div className="flex gap-3 pb-2">
                      {isCurrentUser ? (
                          <Link href="/onboarding">
                             <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/10 hover:text-white">
                                 <Edit3 className="h-4 w-4 mr-2" /> Edit Profile
                             </Button>
                          </Link>
                      ) : (
                          <>
                            <Button className="bg-[#FFE500] text-black hover:bg-[#FFE500]/80 font-bold rounded-full">
                                <UserPlus className="h-4 w-4 mr-2" /> Connect
                            </Button>
                            <Button variant="outline" className="rounded-full border-white/20 hover:bg-white/10 hover:text-white">
                                <MessageCircle className="h-4 w-4" />
                            </Button>
                          </>
                      )}
                  </div>
              </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
              {/* Sidebar Info */}
              <div className="md:col-span-1 flex flex-col gap-4">
                  <Card className="bg-[#09090b] border-white/5">
                      <CardHeader><CardTitle className="text-lg">About</CardTitle></CardHeader>
                      <CardContent className="space-y-4 text-sm text-muted-foreground">
                          <p>{user.bio || "No bio provided."}</p>
                          
                          {college?.location && (
                              <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4 shrink-0" />
                                  <span>{college.location}</span>
                              </div>
                          )}
                          {socialLinks.github && (
                              <div className="flex items-center gap-2">
                                  <LinkIcon className="h-4 w-4 shrink-0" />
                                  <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">GitHub</a>
                              </div>
                          )}
                          {socialLinks.portfolio && (
                              <div className="flex items-center gap-2">
                                  <LinkIcon className="h-4 w-4 shrink-0" />
                                  <a href={socialLinks.portfolio} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">Portfolio</a>
                              </div>
                          )}
                          <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 shrink-0" />
                              <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                          </div>
                      </CardContent>
                  </Card>

                   <Card className="bg-[#09090b] border-white/5">
                      <CardHeader><CardTitle className="text-lg">Interests</CardTitle></CardHeader>
                      <CardContent className="flex flex-wrap gap-2">
                          {(user.interests || []).map(tag => (
                              <Badge key={tag} variant="outline" className="border-white/10 bg-white/5">{tag}</Badge>
                          ))}
                          {(!user.interests || user.interests.length === 0) && (
                              <span className="text-sm text-muted-foreground">No interests added.</span>
                          )}
                      </CardContent>
                  </Card>
              </div>

              {/* Feed */}
              <div className="md:col-span-2 flex flex-col gap-6">
                  <div className="flex gap-4 border-b border-white/5 pb-4">
                      <button className="font-bold text-[#FFE500] border-b-2 border-[#FFE500] pb-4 -mb-4.5 px-2">Posts</button>
                      <button className="font-medium text-muted-foreground hover:text-white transition-colors px-2">Media</button>
                      <button className="font-medium text-muted-foreground hover:text-white transition-colors px-2">Events</button>
                  </div>

                  {USER_POSTS.map(post => (
                      <FeedPost key={post.id} post={post as unknown as Parameters<typeof FeedPost>[0]['post']} />
                  ))}
                  
                  <div className="py-8 text-center text-muted-foreground">
                      No more posts to show.
                  </div>
              </div>
          </div>
       </div>
    </DashboardLayout>
  );
}
