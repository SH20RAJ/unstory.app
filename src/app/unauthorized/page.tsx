import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stackServerApp } from "@/stack/server";

export default async function UnauthorizedPage() {
  const user = await stackServerApp.getUser();
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-black text-white text-center">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[#09090b] border border-white/10 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          
          <h1 className="text-2xl font-bold mb-3">Unauthorized Domain</h1>
          
          {user ? (
            <p className="text-muted-foreground mb-6">
                Your email <span className="text-foreground font-semibold">{user.primaryEmail}</span> does not belong to an onboarded college. 
                <br className="mb-2"/>
                Unstory is exclusively for students with valid institute email addresses.
            </p>
          ) : (
            <p className="text-muted-foreground mb-6">
                Unstory is exclusively for students. Please sign in with your official institute email address. Gmail and personal domains are not allowed.
            </p>
          )}

          <div className="flex flex-col gap-3">
              <Link href="/colleges-onboarded" className="w-full">
                <Button variant="outline" className="w-full">Browse Onboarded Colleges</Button>
              </Link>
              <Link href="/" className="w-full">
                <Button className="w-full bg-[#FFE500] text-black hover:bg-[#FFE500]/90">Return to Home</Button>
              </Link>
              
              {user && (
                 <a href={stackServerApp.urls.signOut} className="text-sm text-red-400 mt-4 hover:underline">
                     Sign Out
                 </a>
              )}
          </div>
      </div>
    </div>
  );
}
