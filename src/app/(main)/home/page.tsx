import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex flex-col gap-6 p-4 md:p-8">
      {/* Active Now Section */}
      <section>
        <h2 className="text-xl font-semibold tracking-tight mb-4">Active Now</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
           {/* Placeholders for active users/stories */}
           {[1, 2, 3, 4, 5].map((i) => (
             <div key={i} className="h-16 w-16 shrink-0 rounded-full bg-muted animate-pulse" />
           ))}
        </div>
      </section>

      {/* Activity Feed */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center py-10">No activities yet. Create one!</p>
        ) : (
          activities.map((activity: Activity) => (
            <Card key={activity.id}>
              <CardHeader>
                <CardTitle>{activity.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{activity.location} • {activity.time}</p>
                <p className="text-sm mt-2">{activity.description}</p>
                <div className="mt-4 flex gap-2">
                   <div className="h-8 w-8 rounded-full bg-muted" />
                   <div className="h-8 w-8 rounded-full bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>
    </div>
  );
}
