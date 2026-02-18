import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CrushButton } from "@/components/dating/CrushButton";

interface ProfileCardProps {
  profile: {
    name: string;
    age: number;
    university?: string;
    major: string;
    bio: string;
    interests: string[];
    image?: string; // Color or image url fallback
  };
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="group relative overflow-hidden aspect-3/4 border-0 rounded-3xl bg-muted/20">
      {/* Background Image / Placeholder */}
      <div className={`absolute inset-0 bg-linear-to-b ${profile.image || 'from-primary/20 to-background'} z-0 transition-transform duration-500 group-hover:scale-105`} />
      <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/40 to-transparent z-10" />

      <div className="relative z-20 h-full flex flex-col justify-end p-6">
        <div className="flex flex-wrap gap-2 mb-3">
            {profile.university && (
                <Badge variant="outline" className="bg-primary/20 border-primary/30 text-white backdrop-blur-md text-xs font-semibold">
                    {profile.university}
                </Badge>
            )}
            {profile.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} variant="secondary" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-0 text-white text-xs font-normal">
                    {interest}
                </Badge>
            ))}
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-1">
          {profile.name}, {profile.age}
        </h3>
        <p className="text-white/80 text-sm font-medium mb-2">{profile.major}</p>
        <p className="text-white/60 text-sm line-clamp-2 mb-4">{profile.bio}</p>

        <div className="flex gap-3 w-full">
            <Button className="flex-1 rounded-full bg-white text-black hover:bg-white/90 font-bold border-0 h-10">
                Connect
            </Button>
            <Button size="icon" variant="outline" className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 h-10 w-10">
                👋
            </Button>
            {/* Secret Crush Button */}
             <div className="absolute top-4 right-4 z-30">
                 {/* Assuming we pass real ID, for now using name as ID mock */}
                <CrushButton crushId={profile.name} /> 
             </div>
        </div>
      </div>
    </Card>
  );
}
