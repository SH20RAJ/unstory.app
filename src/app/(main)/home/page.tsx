import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getActivities } from "@/actions/activities";

interface Activity {
  id: string;
  title: string;
  location: string;
  time: string;
  description: string;
}

export default async function HomePage() {
  const activities = await getActivities();

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-6xl mx-auto w-full">
      {/* Active Now Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight">Active Now</h2>
          <span className="text-sm text-muted-foreground">See all</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
           {/* Placeholders for active users/stories */}
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="h-16 w-16 shrink-0 rounded-full bg-linear-to-tr from-primary/20 to-accent/20 border-2 border-background p-1 group-hover:from-primary group-hover:to-accent transition-all ring-2 ring-transparent group-hover:ring-primary/20">
                 <div className="h-full w-full rounded-full bg-muted/50" />
               </div>
               <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">User {i}</span>
             </div>
           ))}
        </div>
      </section>

      {/* Activity Feed */}
      <section>
        <h2 className="text-xl font-bold tracking-tight mb-6">Upcoming Activities</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {activities.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl border-muted bg-muted/5">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl mb-4">
                ✨
              </div>
              <h3 className="text-lg font-semibold mb-2">No activities yet</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Be the first to create an activity and gather your campus community!
              </p>
              <Button>Create Activity</Button>
            </div>
          ) : (
            activities.map((activity: Activity) => (
              <Card key={activity.id} className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                <div className="h-32 w-full bg-linear-to-br from-muted to-muted/50 relative">
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-xs font-medium border border-border/50">
                    {activity.time}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    Academic
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>📍 {activity.location}</span>
                  </div>
                  <p className="text-sm line-clamp-2 text-muted-foreground/80">
                    {activity.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2].map((i) => (
                        <div key={i} className="h-6 w-6 rounded-full border-2 border-background bg-muted" />
                      ))}
                      <div className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] text-muted-foreground">
                        +3
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 text-xs hover:bg-primary/10 hover:text-primary">
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
