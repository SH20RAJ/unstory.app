import { getRemainingCrushCount, getSecretCrushes } from "@/actions/dating";
import { ProfileCard } from "@/components/feed/ProfileCard";
import { MOCK_PROFILES } from "@/lib/mock-data";
import { Heart } from "lucide-react";

export default async function DatingPage() {
    const crushes = await getSecretCrushes();
    const remaining = await getRemainingCrushCount();

    // Map crush IDs to profiles (using mock data for info)
    // In a real app, we would fetch these profiles from DB
    const crushedProfiles = crushes.map((crush: { crush_id: string }) => {
        // Find by ID or Name (fallback since we used name as ID in ProfileCard previously)
        // Adjust logic to match how we stored it. 
        // In ProfileCard we passed `profile.name` as ID.
        return MOCK_PROFILES.find(p => p.name === crush.crush_id) || {
            name: crush.crush_id,
            age: 0,
            university: "Unknown",
            major: "Unknown",
            bio: "Profile not found",
            interests: [],
            image: "bg-gray-500"
        };
    });

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-4xl mx-auto w-full">
      
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent w-fit">
            Secret Crushes
        </h1>
        <p className="text-muted-foreground">
            Add up to 5 people securely. If they add you back, it&apos;s a match! 🤫
        </p>
      </div>

      <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border/50">
          <div className="h-12 w-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500">
              <Heart className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
              <span className="font-semibold text-lg">{remaining} slots remaining</span>
              <span className="text-xs text-muted-foreground">Use them wisely!</span>
          </div>
      </div>

      {crushedProfiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {crushedProfiles.map((profile, i) => (
                  <ProfileCard key={i} profile={profile} />
              ))}
          </div>
      ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
              <Heart className="h-16 w-16 text-muted-foreground/20 mb-4" />
              <h3 className="text-xl font-semibold">No crushes yet</h3>
              <p className="text-sm">Go to Connect or Home to find people!</p>
          </div>
      )}

    </div>
  );
}
