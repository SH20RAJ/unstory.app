import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Calendar, Heart, MessageCircle, Search, Users } from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const features = [
    {
      title: "Campus Feed",
      description: "Stay updated with real-time campus activities, stories, and social posts. No algorithms, just real connections.",
      icon: Activity,
      link: "/home",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Events Discovery",
      description: "Never miss out on club meetings, workshops, or parties. Filter by date, type, or popularity.",
      icon: Calendar,
      link: "/events",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Secret Crush (Dating)",
      description: "Discreetly add up to 5 users as secret crushes. If they add you back, it's a match! 💘",
      icon: Heart,
      link: "/dating",
      color: "text-pink-500",
      bg: "bg-pink-500/10"
    },
    {
      title: "Smart Connect",
      description: "Find people with shared interests, classes, or mutual friends. Soft social discovery over swiping.",
      icon: Users,
      link: "/connect",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "Direct Chat",
      description: "Chat instantly with matches or connections. Context-driven conversations starting from shared activities.",
      icon: MessageCircle,
      link: "/chat",
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Search Anything",
      description: "Powerful search for people, clubs, events, and activities across the entire campus.",
      icon: Search,
      link: "/search",
      color: "text-slate-500",
      bg: "bg-slate-500/10"
    }
  ];

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 max-w-5xl mx-auto w-full">
      
      <div className="flex flex-col gap-4 text-center items-center py-8">
        <Badge variant="outline" className="px-3 py-1 rounded-full text-sm font-medium border-primary/20 bg-primary/5 text-primary">
            Unstory Features
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Everything you need for campus life.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
            From finding events to making real connections, Unstory is the operating layer for your college experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-border/40 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all duration-300 hover:shadow-lg group">
            <CardHeader>
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-base leading-relaxed">
                {feature.description}
              </CardDescription>
              <Link href={feature.link} className="inline-block w-full">
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors border-primary/20">
                    Explore {feature.title}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

       <div className="mt-12 p-8 rounded-3xl bg-linear-to-br from-primary/5 via-accent/5 to-background border border-border/50 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to jump in?</h2>
            <p className="text-muted-foreground mb-6">Join thousands of students connecting on Unstory today.</p>
            <div className="flex justify-center gap-4">
                <Link href="/home">
                    <Button size="lg" className="rounded-full px-8">Go to Feed</Button>
                </Link>
                <Link href="/create">
                    <Button size="lg" variant="outline" className="rounded-full px-8">Create Event</Button>
                </Link>
            </div>
       </div>

    </div>
  );
}
