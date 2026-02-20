import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle2 } from "lucide-react";
import { db } from "@/db/drizzle";
import { notifications } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { stackServerApp } from "@/stack/server";

interface ActivityItem {
    id: string;
    avatar: string;
    user: string;
    action: string | null;
    time: string;
    type: string;
    highlight: boolean;
    isGroup: boolean;
}

export async function ActivitySidebar() {
  const user = await stackServerApp.getUser();
  let activities: ActivityItem[] = [];

  if (user) {
      const recentNotifs = await db.query.notifications.findMany({
          where: eq(notifications.userId, user.id),
          orderBy: [desc(notifications.createdAt)],
          limit: 6
      });

      activities = recentNotifs.map(n => ({
          id: n.id.toString(),
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${n.id}`,
          user: n.title || "System",
          action: n.message,
          time: new Date(n.createdAt).toLocaleDateString(),
          type: n.type,
          highlight: !n.read,
          isGroup: false,
      }));
  }

  // Fallback if no notifications yet
  if (activities.length === 0) {
      activities = [{
          id: "welcome",
          avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=welcome",
          user: "Welcome to Unstory!",
          action: "Start connecting with your campus.",
          time: "Just now",
          type: "system",
          highlight: true,
          isGroup: false
      }];
  }

  return (
    <div className="flex flex-col h-full bg-[#121212] rounded-[32px] p-6 border border-white/5">
        <h3 className="text-white text-lg font-medium mb-6">Recent activity</h3>
        
        <div className="space-y-1 relative">
             {/* Timeline Line (Conceptual) */}
             <div className="absolute left-6 top-4 bottom-4 w-px bg-white/5" />

             {activities.map((item) => (
                 <div key={item.id} className="relative flex flex-col gap-3 p-4 rounded-2xl bg-[#1A1A1A] border border-white/5 hover:bg-[#202020] transition-colors mb-4 last:mb-0">
                     <div className="flex items-start justify-between">
                         <div className="flex items-start gap-3">
                             <div className="relative">
                                <Avatar className="h-10 w-10 border border-white/10">
                                    <AvatarImage src={item.avatar} />
                                    <AvatarFallback>{item.user[0]}</AvatarFallback>
                                </Avatar>
                                {item.highlight && <div className="absolute -top-1 -right-1 h-4 w-4 bg-[#FFE500] rounded-full border-2 border-[#1A1A1A] flex items-center justify-center"><CheckCircle2 className="h-2 w-2 text-black" /></div>}
                                {item.isGroup && <div className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 rounded-full border-2 border-[#1A1A1A]" />}
                             </div>
                             <div>
                                 <p className="text-white font-medium text-sm leading-none pt-1">{item.user}</p>
                                 <p className="text-white/40 text-xs mt-1">
                                    {item.action} {item.time && `• ${item.time}`}
                                 </p>
                             </div>
                         </div>
                     </div>
                 </div>
             ))}
        </div>
    </div>
  );
}
