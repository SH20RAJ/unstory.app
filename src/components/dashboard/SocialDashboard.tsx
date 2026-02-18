"use client";

import { ProfileSidebar } from "./ProfileSidebar";
import { ActivitySidebar } from "./ActivitySidebar";
import { DashboardFeed } from "./DashboardFeed";

export function SocialDashboard() {
  return (
    <div className="w-full min-h-screen bg-[#09090b] p-4 lg:p-8">
       <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Left Column - Profile (3 cols) */}
           <div className="hidden lg:block lg:col-span-3">
               <ProfileSidebar />
           </div>

           {/* Center Column - Feed (5-6 cols) */}
           <div className="col-span-1 lg:col-span-6">
               <DashboardFeed />
           </div>

           {/* Right Column - Activity (3 cols) */}
           <div className="hidden xl:block xl:col-span-3">
               <ActivitySidebar />
           </div>
       </div>
    </div>
  );
}
