import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createActivity } from "@/actions/activities";

export default function CreateActivityPage() {
  return (
    <div className="max-w-xl mx-auto p-4 md:p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Create Activity</h1>
        <p className="text-muted-foreground">Start something new on campus.</p>
      </div>

      <form action={createActivity} className="flex flex-col gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Activity Title</Label>
          <Input id="title" name="title" placeholder="e.g. Midnight Coding Session" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select name="type" required>
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
            <Input id="date" name="date" type="date" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input id="time" name="time" type="time" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" placeholder="e.g. Library, Café" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="What's the plan?" />
        </div>

        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full">Create Activity</Button>
        </div>
      </form>
    </div>
  );
}
