import { FeedCard } from "@/components/feed/FeedCard";
import { ProfileCard } from "@/components/feed/ProfileCard";
import { getActivities } from "@/actions/activities";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const activities = await getActivities();

  // Mock data for profiles and feed posts (until we have real data)
  const suggestedProfiles = [
    {
        name: "Aisha",
        age: 21,
        university: "Uni One",
        major: "Design",
        bio: "Looking for someone to explore art galleries with.",
        interests: ["Art", "Coffee", "UX"],
        image: "bg-linear-to-b from-purple-500 to-indigo-600"
    },
    {
        name: "Rohan",
        age: 22,
        university: "Tech State",
        major: "CS",
        bio: "Building the next unicorn. Need a gym buddy.",
        interests: ["Tech", "Gym", "Startups"],
        image: "bg-linear-to-b from-blue-500 to-cyan-600"
    },
     {
        name: "Priya",
        age: 20,
        university: "Campus X",
        major: "Psych",
        bio: "Love hiking and honest conversations.",
        interests: ["Nature", "Psychology", "Music"],
        image: "bg-linear-to-b from-pink-500 to-rose-600"
    },
    {
        name: "Caleb",
        age: 23,
        university: "Uni One",
        major: "Music",
        bio: "Jazz pianist looking for jam sessions.",
        interests: ["Jazz", "Piano", "Vinyl"],
        image: "bg-linear-to-b from-orange-500 to-red-600"
    },
    {
        name: "Maya",
        age: 19,
        university: "Modern U",
        major: "Bio",
        bio: "Pre-med student who needs coffee breaks.",
        interests: ["Medicine", "Volunteering", "Matcha"],
        image: "bg-linear-to-b from-green-500 to-emerald-600"
    },
    {
        name: "Leo",
        age: 21,
        university: "Tech State",
        major: "Physics",
        bio: "Trying to understand the universe and bake bread.",
        interests: ["Physics", "Baking", "Sci-Fi"],
        image: "bg-linear-to-b from-slate-500 to-zinc-600"
    }
  ];

  const feedPosts = [
    {
        id: 1,
        author: { name: "Campus Photography", username: "shutterbugs", university: "Uni One", time: "2h ago", avatar: "" },
        content: { text: "Sunset at the main quad was absolutely stunning today! 📸 Who else caught this view?", image: "Quad View" },
        metrics: { likes: 124, comments: 12 }
    },
    {
        id: 2,
        author: { name: "Student Gov", username: "sgov", university: "Tech State", time: "5h ago", avatar: "" },
        content: { text: "Don't forget to vote in the upcoming elections! Your voice matters. Polls open at 9AM in the Student Center.", image: undefined },
        metrics: { likes: 89, comments: 45 }
    },
    {
        id: 3,
        author: { name: "Confessions", username: "anon_confess", university: "Campus X", time: "Now", avatar: "" },
        content: { text: "Am I the only one who thinks the library elevator smells like vanilla latte? ☕️🤔", image: undefined },
        metrics: { likes: 342, comments: 88 }
    },
    {
        id: 4,
        author: { name: "Hiking Club", username: "hikers_united", university: "Modern U", time: "1d ago", avatar: "" },
        content: { text: "Weekend trip to Bear Mountain was a success! 🏔️ Next trip: Breakneck Ridge. Sign up link in bio.", image: "Mountain Group" },
        metrics: { likes: 256, comments: 34 }
    }
  ];


  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-4xl mx-auto w-full">
      
      {/* Stories / Active Now - Refined */}
      <section className="overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-4 min-w-max">
           <div className="flex flex-col items-center gap-2 cursor-pointer">
               <div className="h-16 w-16 rounded-full border-2 border-dashed border-primary/50 flex items-center justify-center bg-muted/20 hover:bg-muted/40 transition-colors">
                   <span className="text-xl font-light">+</span>
               </div>
               <span className="text-xs font-medium">Add Story</span>
           </div>
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
               <div className="h-16 w-16 shrink-0 rounded-full bg-linear-to-tr from-primary to-accent p-[2px] cursor-pointer hover:scale-105 transition-transform">
                 <div className="h-full w-full rounded-full bg-background border border-background" />
               </div>
               <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">User {i}</span>
             </div>
           ))}
        </div>
      </section>

      {/* Suggested Matches / Profiles */}
      <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-lg font-bold tracking-tight">Suggested for you</h2>
            <Button variant="link" className="text-primary text-xs">See all</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedProfiles.map((profile, i) => (
                  <ProfileCard key={i} profile={profile} />
              ))}
          </div>
      </section>

      {/* Feed */}
      <section className="space-y-6">
           <div className="flex items-center justify-between mb-2 px-2 pt-8 border-t border-border/40">
            <h2 className="text-lg font-bold tracking-tight">Campus Feed</h2>
            <span className="text-xs text-muted-foreground">Recent Activity</span>
          </div>
          
          {/* Mix of Activity Cards (from DB) and Social Posts */}
          
          {/* Example: Activity inserted into feed */}
          {activities.length > 0 && (
             <FeedCard 
                author={{ name: "Unistory Events", username: "events", university: "Uni One", time: "Just now", avatar: "" }}
                content={{ 
                    text: `Upcoming: ${activities[0].title} at ${activities[0].location}. ${activities[0].description}`,
                    image: "Event Poster"
                }}
                metrics={{ likes: 42, comments: 5 }}
             />
          )}

          {feedPosts.map((post) => (
              <FeedCard key={post.id} {...post} />
          ))}

      </section>
    </div>
  );
}
