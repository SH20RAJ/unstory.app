"use client";


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, UserPlus, Bell, Zap } from "lucide-react";
export interface NotificationUI {
    id: string;
    type: string;
    content: string;
    time: string;
    read: boolean;
    user?: {
        name: string;
        avatar: string;
    };
}

interface NotificationsClientProps {
    notices: NotificationUI[];
}

export function NotificationsClient({ notices }: NotificationsClientProps) {
  return (
    <>
       <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-white">Mark all as read</Button>
          </div>

          <div className="flex flex-col gap-4">
              {notices.map((notif) => (
                  <div 
                      key={notif.id} 
                      className={`flex items-start gap-4 p-4 rounded-xl border border-white/5 transition-colors ${notif.read ? 'bg-transparent' : 'bg-white/5'}`}
                  >
                      {/* Icon */}
                      <div className="mt-1 shrink-0">
                          {notif.type === 'like' && <div className="h-8 w-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500"><Heart className="h-4 w-4 fill-current" /></div>}
                          {notif.type === 'comment' && <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><MessageCircle className="h-4 w-4 fill-current" /></div>}
                          {notif.type === 'connection' && <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><UserPlus className="h-4 w-4" /></div>}
                          {notif.type === 'system' && <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500"><Zap className="h-4 w-4 fill-current" /></div>}
                          {notif.type === 'crush' && <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500"><Heart className="h-4 w-4 fill-current" /></div>}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                             {notif.user && (
                                 <Avatar className="h-6 w-6">
                                     <AvatarImage src={notif.user.avatar} />
                                     <AvatarFallback>{notif.user.name[0]}</AvatarFallback>
                                 </Avatar>
                             )}
                             <span className="text-sm">
                                 {notif.user && <span className="font-bold text-white mr-1">{notif.user.name}</span>}
                                 <span className="text-white/70">{notif.content}</span>
                             </span>
                          </div>
                          
                          {notif.type === 'connection' && (
                              <div className="flex gap-2 mt-2">
                                  <Button size="sm" className="bg-white text-black hover:bg-white/90 rounded-full h-8 px-4 text-xs font-bold">Accept</Button>
                                  <Button size="sm" variant="ghost" className="text-white/60 hover:text-white rounded-full h-8 px-4 text-xs bg-white/5 hover:bg-white/10">Delete</Button>
                              </div>
                          )}
                      </div>

                      {/* Time & Dot */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-xs text-white/30">{notif.time}</span>
                          {!notif.read && <div className="h-2 w-2 rounded-full bg-[#FFE500]" />}
                      </div>
                  </div>
              ))}
          </div>

          {notices.length === 0 && (
               <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                   <Bell className="h-12 w-12 mb-4" />
                   <p>No new notifications</p>
               </div>
          )}
       </div>
    </>
  );
}
