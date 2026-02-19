import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function ConnectPage() {
  return (
    <DashboardLayout>
        <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight">Connect</h1>
        <p className="text-muted-foreground">People you may know from your classes and clubs.</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            {[
            { name: "Alex Chen", branch: "CS '26", mutual: "Shared Class: Algorithms" },
            { name: "Sarah Miller", branch: "Design '25", mutual: "Club: Photography" },
            { name: "Jordan Lee", branch: "Mech '26", mutual: "Event: Robowars" }
            ].map((person, i) => (
            <Card key={i}>
                <CardContent className="flex items-center gap-4 p-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}`} />
                    <AvatarFallback>{person.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold">{person.name}</span>
                    <span className="text-xs text-muted-foreground">{person.branch}</span>
                    <span className="text-xs text-primary mt-1">{person.mutual}</span>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">Connect</Button>
                </CardContent>
            </Card>
            ))}
        </div>
        </div>
    </DashboardLayout>
  );
}
