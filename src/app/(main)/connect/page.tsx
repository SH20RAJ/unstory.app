import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { USERS, CURRENT_USER } from "@db/users";
import { UserPlus, Sparkles, MapPin } from "lucide-react";

export default function ConnectPage() {
  const suggestedUsers = USERS.filter(u => u.id !== CURRENT_USER?.id);

  return (
    <DashboardLayout>
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
                        {suggestedUsers.map((person, i) => (
                            <div key={person.id} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12 border border-white/10">
                                        <AvatarImage src={person.avatar} />
                                        <AvatarFallback>{person.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-white text-sm">{person.name}</span>
                                        <div className="flex items-center gap-1 text-xs text-white/40">
                                            <span>@{person.username}</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-0.5"><MapPin className="h-3 w-3" /> {person.college}</span>
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
    </DashboardLayout>
  );
}
