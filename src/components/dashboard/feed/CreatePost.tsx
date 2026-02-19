"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
  Image as ImageIcon, 
  Video, 
  BarChart2, 
  Calendar, 
  Smile,
  MapPin,
  Globe,
  ChevronDown,
  X,
  Plus,
  Loader2,
  Users,
  GraduationCap
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { CURRENT_USER } from "@db/users";

export function CreatePost() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Feature States
  const [media, setMedia] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [visibility, setVisibility] = useState<'everyone' | 'connections' | 'campus'>('everyone');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const visibilityOptions = {
    everyone: { label: 'Everyone', icon: Globe, color: 'text-blue-400' },
    connections: { label: 'Connections', icon: Users, color: 'text-green-400' },
    campus: { label: 'Campus Only', icon: GraduationCap, color: 'text-yellow-400' }
  };

  const CurrentIcon = visibilityOptions[visibility].icon;

  const handleFocus = () => setIsExpanded(true);

  const handleMediaClick = (type: 'image' | 'video') => {
    if (fileInputRef.current) {
        fileInputRef.current.accept = type === 'image' ? "image/*" : "video/*";
        fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setIsExpanded(true);
    }
  };

  const removeMedia = () => {
    setMedia(null);
    setMediaPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const togglePoll = () => {
    setShowPoll(!showPoll);
    setIsExpanded(true);
  };

  const addPollOption = () => {
    if (pollOptions.length < 4) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const updatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const removePoll = () => {
      setShowPoll(false);
      setPollOptions(["", ""]);
  };

  const toggleLocation = () => {
      setShowLocation(!showLocation);
      if (showLocation) setLocation("");
      setIsExpanded(true);
  };

  const addEmoji = (emoji: string) => {
      setContent(prev => prev + emoji);
      setShowEmoji(false);
  };

  const handlePost = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Post created successfully!");
      
      // Reset State
      setContent("");
      setMedia(null);
      setMediaPreview(null);
      setShowPoll(false);
      setPollOptions(["", ""]);
      setDate(undefined);
      setLocation("");
      setShowLocation(false);
      setIsExpanded(false);
      setIsLoading(false);
  };

  const isPostDisabled = !content.trim() && !media && (!showPoll || pollOptions.every(o => !o.trim()));

  const emojis = ["😀", "😂", "🥰", "😎", "🤔", "😭", "🔥", "❤️", "👍", "🎉"];

  return (
    <div className={cn(
        "bg-[#121212] rounded-[32px] border border-white/5 transition-all duration-200 overflow-visible relative z-20", // overflow-visible for popovers
        isExpanded ? "ring-1 ring-white/10 shadow-2xl" : "hover:border-white/10"
    )}>
      <div className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={CURRENT_USER?.avatar} />
            <AvatarFallback>{CURRENT_USER?.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-4">
            {/* Input Area */}
            <div className="relative">
                <Textarea 
                    placeholder="Tell your campus about your thoughts..." 
                    className="min-h-[40px] w-full bg-transparent border-0 text-white placeholder:text-white/20 focus-visible:ring-0 text-md p-4 resize-none leading-relaxed"
                    onFocus={handleFocus}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={isExpanded ? 3 : 1}
                />
            </div>

            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
            />
            
            {/* Expanded Content & Previews */}
            {isExpanded && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200 space-y-4">
                    
                    {/* Media Preview */}
                    {mediaPreview && (
                        <div className="relative rounded-xl overflow-hidden bg-black/40 border border-white/10 inline-block max-h-60">
                            <img src={mediaPreview} alt="Preview" className="max-h-60 w-auto object-contain" />
                            <Button 
                                size="icon" 
                                variant="destructive" 
                                className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-80 hover:opacity-100"
                                onClick={removeMedia}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    )}

                    {/* Poll Creator */}
                    {showPoll && (
                        <div className="bg-[#1A1A1A] rounded-xl p-3 border border-white/5 space-y-2 relative">
                            <Button size="icon" variant="ghost" className="absolute top-2 right-2 h-6 w-6 text-white/40 hover:text-white" onClick={removePoll}>
                                <X className="h-3 w-3" />
                            </Button>
                            <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-2">Poll Options</p>
                            {pollOptions.map((option, idx) => (
                                <Input 
                                    key={idx}
                                    placeholder={`Option ${idx + 1}`}
                                    className="bg-[#222] border-white/5 text-white h-9 text-sm"
                                    value={option}
                                    onChange={(e) => updatePollOption(idx, e.target.value)}
                                />
                            ))}
                            {pollOptions.length < 4 && (
                                <Button variant="ghost" size="sm" className="text-[#FFE500] hover:text-[#FFE500] hover:bg-white/5 h-8 text-xs" onClick={addPollOption}>
                                    <Plus className="h-3 w-3 mr-1" /> Add Option
                                </Button>
                            )}
                        </div>
                    )}

                    {/* Location Input */}
                    {showLocation && (
                        <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full px-3 py-1 w-fit border border-white/5 animate-in fade-in zoom-in-95">
                            <MapPin className="h-3 w-3 text-[#FFE500]" />
                            <input 
                                className="bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-white/30 h-6 w-40"
                                placeholder="Add location..."
                                autoFocus
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <Button size="icon" variant="ghost" className="h-4 w-4 rounded-full text-white/40 hover:text-white" onClick={() => setShowLocation(false)}>
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    )}
                    
                    {/* Schedule Badge */}
                    {date && (
                         <div className="flex items-center gap-2 bg-[#1A1A1A] rounded-full px-3 py-1 w-fit border border-white/5">
                            <Calendar className="h-3 w-3 text-yellow-500" />
                            <span className="text-white text-sm">{format(date, "PPP")}</span>
                            <Button size="icon" variant="ghost" className="h-4 w-4 rounded-full text-white/40 hover:text-white" onClick={() => setDate(undefined)}>
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    )}

                    <div className="h-px w-full bg-white/5 my-3" />

                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-1 -ml-2">
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-green-500 hover:bg-white/5 rounded-full" onClick={() => handleMediaClick('image')}>
                                 <ImageIcon className="h-4 w-4" />
                             </Button>
                             <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500 hover:bg-white/5 rounded-full" onClick={() => handleMediaClick('video')}>
                                 <Video className="h-4 w-4" />
                             </Button>
                             <Button variant="ghost" size="icon" className={cn("h-8 w-8 hover:bg-white/5 rounded-full transition-colors", showPoll ? "text-[#FFE500] bg-white/5" : "text-red-500")} onClick={togglePoll}>
                                 <BarChart2 className="h-4 w-4" />
                             </Button>
                             
                             <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className={cn("h-8 w-8 hover:bg-white/5 rounded-full", date ? "text-[#FFE500]" : "text-yellow-500")}>
                                        <Calendar className="h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-[#1A1A1A] border-white/10 text-white" align="start">
                                    <CalendarComponent
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                        className="rounded-md border border-white/5"
                                    />
                                </PopoverContent>
                             </Popover>

                             <Popover open={showEmoji} onOpenChange={setShowEmoji}>
                                <PopoverTrigger asChild>
                                     <Button variant="ghost" size="icon" className="h-8 w-8 text-white/40 hover:text-white hover:bg-white/5 rounded-full">
                                         <Smile className="h-4 w-4" />
                                     </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-2 bg-[#1A1A1A] border-white/10" align="start">
                                    <div className="grid grid-cols-5 gap-1">
                                        {emojis.map(e => (
                                            <button key={e} onClick={() => addEmoji(e)} className="text-xl hover:bg-white/10 p-1 rounded-md transition-colors">{e}</button>
                                        ))}
                                    </div>
                                </PopoverContent>
                             </Popover>

                             <Button variant="ghost" size="icon" className={cn("h-8 w-8 hover:text-white hover:bg-white/5 rounded-full", showLocation ? "text-[#FFE500]" : "text-white/40")} onClick={toggleLocation}>
                                 <MapPin className="h-4 w-4" />
                             </Button>
                         </div>

                         <div className="flex items-center gap-3">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 rounded-full text-white/60 hover:text-white hover:bg-white/5 gap-2 px-3 text-xs border border-white/5 bg-white/5"
                                    >
                                        <CurrentIcon className={cn("h-3 w-3", visibilityOptions[visibility].color)} />
                                        {visibilityOptions[visibility].label}
                                        <ChevronDown className="h-3 w-3 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-white w-[200px]">
                                    <DropdownMenuItem onClick={() => setVisibility('everyone')} className="gap-3 cursor-pointer hover:bg-white/5 focus:bg-white/5 py-2">
                                        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                                            <Globe className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">Everyone</span>
                                            <span className="text-[10px] text-white/40">Visible to anyone on Unstory</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setVisibility('connections')} className="gap-3 cursor-pointer hover:bg-white/5 focus:bg-white/5 py-2">
                                        <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                                            <Users className="h-4 w-4 text-green-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">Connections</span>
                                            <span className="text-[10px] text-white/40">Only your connections</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setVisibility('campus')} className="gap-3 cursor-pointer hover:bg-white/5 focus:bg-white/5 py-2">
                                        <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                            <GraduationCap className="h-4 w-4 text-yellow-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">Campus Only</span>
                                            <span className="text-[10px] text-white/40">Students from your college</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                             </DropdownMenu>

                             <Button 
                                className={cn(
                                    "rounded-full h-8 px-6 font-bold transition-all",
                                    !isPostDisabled
                                        ? "bg-[#FFE500] text-black hover:bg-[#FFE500]/90" 
                                        : "bg-white/10 text-white/40 hover:bg-white/20"
                                )}
                                disabled={isPostDisabled || isLoading}
                                onClick={handlePost}
                             >
                                 {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
                             </Button>
                         </div>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Collapsed Footer Actions (Only shown when collapsed) */}
      {!isExpanded && (
          <div className="flex gap-2 p-2 pt-0 pl-16">
            <Button variant="ghost" onClick={() => handleMediaClick('image')} className="flex-1 bg-transparent hover:bg-white/5 text-white/40 hover:text-green-500 rounded-xl h-8 gap-2 font-normal text-xs justify-start px-3 transition-colors">
              <ImageIcon className="h-3.5 w-3.5" /> Photo
            </Button>
            <Button variant="ghost" onClick={() => handleMediaClick('video')} className="flex-1 bg-transparent hover:bg-white/5 text-white/40 hover:text-blue-500 rounded-xl h-8 gap-2 font-normal text-xs justify-start px-3 transition-colors">
              <Video className="h-3.5 w-3.5" /> Video
            </Button>
            <Button variant="ghost" onClick={togglePoll} className="flex-1 bg-transparent hover:bg-white/5 text-white/40 hover:text-red-500 rounded-xl h-8 gap-2 font-normal text-xs justify-start px-3 transition-colors">
              <BarChart2 className="h-3.5 w-3.5" /> Poll
            </Button>
             <Popover>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="flex-1 bg-transparent hover:bg-white/5 text-white/40 hover:text-yellow-500 rounded-xl h-8 gap-2 font-normal text-xs justify-start px-3 transition-colors">
                        <Calendar className="h-3.5 w-3.5" /> Event
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#1A1A1A] border-white/10 text-white" align="start">
                    <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={(d) => { setDate(d); setIsExpanded(true); }}
                        initialFocus
                        className="rounded-md border border-white/5"
                    />
                </PopoverContent>
            </Popover>
          </div>
      )}
    </div>
  );
}
