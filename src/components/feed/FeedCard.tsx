import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

interface FeedCardProps {
  author: {
    name: string;
    username: string;
    university?: string;
    avatar?: string;
    time: string;
  };
  content: {
    text: string;
    image?: string;
  };
  metrics: {
    likes: number;
    comments: number;
  };
}

export function FeedCard({ author, content, metrics }: FeedCardProps) {
  return (
    <Card className="border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-colors duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border/50">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{author.name}</span>
                {author.university && (
                    <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
                        {author.university}
                    </span>
                )}
            </div>
            <span className="text-xs text-muted-foreground">@{author.username} • {author.time}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4 pb-4">
        <p className="text-sm leading-relaxed">{content.text}</p>
        
        {content.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/50 bg-muted/20">
             {/* Replace with actual Image when not using mock data mostly */}
             <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 flex items-center justify-center text-muted-foreground/30 font-medium">
               Image: {content.image}
             </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t border-border/30 pt-3 text-muted-foreground">
        <div className="flex gap-6">
          <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors group">
            <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>{metrics.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors group">
            <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>{metrics.comments}</span>
          </button>
        </div>
         <button className="flex items-center gap-2 text-sm hover:text-primary transition-colors group">
            <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </button>
      </CardFooter>
    </Card>
  );
}
