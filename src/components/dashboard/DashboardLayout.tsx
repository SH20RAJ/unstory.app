import { ProfileSidebar } from "./ProfileSidebar";
import { ActivitySidebar } from "./ActivitySidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  showRightSidebar?: boolean;
}

export function DashboardLayout({ children, showRightSidebar = true }: DashboardLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-[#09090b] flex flex-col font-sans">
       <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 lg:p-8 flex-1">
           
           {/* Left Column - Profile (3 cols) */}
           <div className="hidden lg:block lg:col-span-3 sticky top-24 h-fit">
               <ProfileSidebar />
           </div>

           {/* Center Column - Feed/Content (6 cols or 9 if no right sidebar) */}
           <div className={`col-span-1 ${showRightSidebar ? 'lg:col-span-6' : 'lg:col-span-9'}`}>
               {children}
           </div>

           {/* Right Column - Activity (3 cols) */}
           {showRightSidebar && (
               <div className="hidden xl:block xl:col-span-3 sticky top-24 h-fit">
                   <ActivitySidebar />
               </div>
           )}
       </div>
    </div>
  );
}
