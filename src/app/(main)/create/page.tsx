import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreateActivityPage() {
  return (
    <div className="max-w-xl mx-auto p-4 md:p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Activity</h1>
        <p className="text-muted-foreground">Start something new on campus.</p>
      </div>

      <form className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Activity Title</Label>
          <Input id="title" placeholder="e.g. Midnight Coding Session" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="study">Study Session</SelectItem>
              <SelectItem value="social">Social Hangout</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="event">Club Event</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" type="time" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="e.g. Library, Café" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="What's the plan?" />
        </div>

        <div className="pt-4">
          <Button size="lg" className="w-full">Create Activity</Button>
        </div>
      </form>
    </div>
  );
}
