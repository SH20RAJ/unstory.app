"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, College } from "@/db/schema";
import { UserPlus, Sparkles, MapPin } from "lucide-react";

interface ConnectClientProps {
    suggestedUsers: (User & { collegeData?: College | null })[];
}

export function ConnectClient({ suggestedUsers }: ConnectClientProps) {

  return (
    <>
        <div className="max-w-2xl mx-auto w-full pb-20 px-4 pt-4">
            <div className="flex items-center justify-between mb-6">
                 <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Discover</h1>
                    <p className="text-white/50 text-sm">Find people with similar interests</p>
                 </div>
                 <Button variant="outline" size="icon" className="rounded-full border-white/10 hover:bg-white/5 text-white">
                    <Sparkles className="h-4 w-4" />
                 </Button>
            </div>

            <div className="space-y-6">
                {/* Featured / Trending Section could go here */}

                {/* List */}
                <div className="bg-[#121212] border border-white/5 rounded-3xl overflow-hidden">
                    <div className="p-4 border-b border-white/5">
                        <h2 className="font-semibold text-white">Suggested for you</h2>
                    </div>
                    <div>
                        {suggestedUsers.map((person) => (
                            <div key={person.id} className="flex items-center justify-between p-4 hover:bg-white/2 transition-colors border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12 border border-white/10">
                                        <AvatarImage src={person.avatar || undefined} />
                                        <AvatarFallback>{person.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-white text-sm">{person.nickname || person.name}</span>
                                        <div className="flex items-center gap-1 text-xs text-white/40">
                                            <span>@{person.username || 'user'}</span>
                                            {person.collegeData && (
                                              <>
                                                <span>•</span>
                                                <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {person.collegeData.name}</span>
                                              </>
                                            )}
                                        </div>
                                       {person.bio && <p className="text-xs text-white/60 mt-0.5 line-clamp-1 max-w-[200px]">{person.bio}</p>}
                                    </div>
                                </div>
                                <Button size="sm" className="rounded-full bg-white text-black hover:bg-white/90 gap-2 h-8 px-4 font-medium text-xs">
                                    <UserPlus className="h-3 w-3" />
                                    Connect
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
