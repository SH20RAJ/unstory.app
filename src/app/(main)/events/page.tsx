import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      <h1 className="text-2xl font-bold tracking-tight">Events</h1>
      
      <Tabs defaultValue="today" className="w-full">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="today" className="mt-6 flex flex-col gap-4">
          {[
            { title: "Robotics Workshop", time: "2:00 PM", location: "Lab 3" },
            { title: "Campus Jazz Night", time: "7:00 PM", location: "Auditorium" }
          ].map((event, i) => (
            <Card key={i} className="flex flex-row items-center p-4 gap-4">
              <div className="h-20 w-20 rounded-md bg-muted shrink-0" />
              <div className="flex flex-col gap-1">
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {event.time} • {event.location}
                </div>
                <Badge variant="secondary" className="w-fit mt-1">Happening Soon</Badge>
              </div>
              <div className="ml-auto">
                 <Badge>Join</Badge>
              </div>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="week">
          <p className="text-muted-foreground text-sm">Upcoming events for this week...</p>
        </TabsContent>
        <TabsContent value="clubs">
          <p className="text-muted-foreground text-sm">Browse events by club...</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
