"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, College } from "@/db/schema";

interface ProfileClientProps {
    user: User | null | undefined;
    college: College | null | undefined;
}

export function ProfileClient({ user, college }: ProfileClientProps) {
  if (!user) {
      return (
          <>
              <div className="flex items-center justify-center h-[50vh]">
                  <p className="text-muted-foreground">Please log in to view your profile.</p>
              </div>
          </>
      )
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
             <AvatarImage src={user.avatar || "https://github.com/shadcn.png"} />
             <AvatarFallback>{user.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center md:items-start gap-2 pt-2 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">
                {user.major || "Student"} • {college?.name || "University"} {user.year ? `'${user.year.slice(-2)}` : ""}
            </p>
            <div className="flex gap-2 mt-2 flex-wrap justify-center md:justify-start">
               {user.interests?.map((interest, i) => (
                   <Badge key={i} variant="secondary">{interest}</Badge>
               ))}
               {!user.interests?.length && <Badge variant="outline">No interests added</Badge>}
            </div>
            <div className="flex gap-4 mt-4">
               <div className="text-center">
                 <span className="block font-bold">12</span>
                 <span className="text-xs text-muted-foreground">Activities</span>
               </div>
               <div className="text-center">
                 <span className="block font-bold">48</span>
                 <span className="text-xs text-muted-foreground">Connections</span>
               </div>
            </div>
          </div>
          <div className="ml-auto mt-4 md:mt-0">
            <Button variant="outline">Edit Profile</Button>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>My Clubs</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge variant="outline" className="px-3 py-1">Robotics Club</Badge>
              <Badge variant="outline" className="px-3 py-1">Literary Society</Badge>
              <Badge variant="outline" className="px-3 py-1">GDSC</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">React Workshop</p>
                    <p className="text-xs text-muted-foreground">Tomorrow, 4 PM</p>
                  </div>
                  <Badge>Attending</Badge>
               </div>
               <div className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">Football Match</p>
                    <p className="text-xs text-muted-foreground">Saturday, 9 AM</p>
                  </div>
                  <Badge variant="outline">Maybe</Badge>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
