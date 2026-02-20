"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateProfile } from "@/actions/user";
import { User, College } from "@/db/schema";
import { Loader2, GraduationCap } from "lucide-react";

export function OnboardingForm({ user, college }: { user: User, college: College | null | undefined }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const socialLinks = (user.socialLinks as { portfolio?: string, github?: string, linkedin?: string }) || {};

  const [formData, setFormData] = useState({
    nickname: user.nickname || user.name || "",
    avatar: user.avatar || "",
    bio: user.bio || "",
    interests: user.interests ? user.interests.join(", ") : "",
    portfolio: socialLinks.portfolio || "",
    github: socialLinks.github || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const interestsArray = formData.interests
      .split(",")
      .map(i => i.trim())
      .filter(i => i.length > 0);

    const result = await updateProfile({
      nickname: formData.nickname,
      avatar: formData.avatar,
      bio: formData.bio,
      interests: interestsArray.length > 0 ? interestsArray : undefined,
      socialLinks: {
        portfolio: formData.portfolio,
        github: formData.github,
      }
    });

    setLoading(false);

    if (result.success) {
      router.push(`/@${user.username}`);
      router.refresh(); // Ensure the profile page gets fresh data
    } else {
      alert("Error updating profile. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="nickname">Nickname / Display Name</Label>
        <Input 
          id="nickname" 
          name="nickname" 
          value={formData.nickname} 
          onChange={handleChange} 
          placeholder="What should we call you?" 
          required 
          className="bg-[#18181b] border-white/10"
        />
        <p className="text-xs text-muted-foreground">Your real name ({user.name}) cannot be changed.</p>
      </div>

      {college && (
          <div className="space-y-2">
            <Label>College Affiliation</Label>
            <div className="flex items-center gap-3 bg-[#18181b] border border-white/10 rounded-md p-3 select-none">
                <GraduationCap className="h-5 w-5 text-[#FFE500]" />
                <span className="text-sm font-medium">{college.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">Assigned automatically via your registered email address.</p>
          </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="avatar">Profile Picture URL (DP)</Label>
        <Input 
          id="avatar" 
          name="avatar" 
          value={formData.avatar} 
          onChange={handleChange} 
          placeholder="https://example.com/my-photo.jpg" 
          className="bg-[#18181b] border-white/10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea 
          id="bio" 
          name="bio" 
          value={formData.bio} 
          onChange={handleChange} 
          placeholder="Tell us about yourself..." 
          className="bg-[#18181b] border-white/10 min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests">Interests (comma separated)</Label>
        <Input 
          id="interests" 
          name="interests" 
          value={formData.interests} 
          onChange={handleChange} 
          placeholder="React, AI, Photography, Chess" 
          className="bg-[#18181b] border-white/10"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="portfolio">Featured Link / Portfolio (Pro Media)</Label>
            <Input 
              id="portfolio" 
              name="portfolio" 
              value={formData.portfolio} 
              onChange={handleChange} 
              placeholder="https://yourwebsite.com" 
              className="bg-[#18181b] border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub Profile</Label>
            <Input 
              id="github" 
              name="github" 
              value={formData.github} 
              onChange={handleChange} 
              placeholder="https://github.com/username" 
              className="bg-[#18181b] border-white/10"
            />
          </div>
      </div>

      <Button type="submit" disabled={loading} className="w-full bg-[#FFE500] text-black hover:bg-[#FFE500]/90 font-bold mt-4">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {user.onboarded ? "Save Changes" : "Complete Setup"}
      </Button>
    </form>
  );
}
