"use client";

import { addSecretCrush } from "@/actions/dating";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

interface CrushButtonProps {
  crushId: string;
}

export function CrushButton({ crushId }: CrushButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCrush = async () => {
    setLoading(true);
    try {
      const result = await addSecretCrush(crushId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className="bg-white/10 hover:bg-white/20 text-white rounded-full h-10 w-10 hover:text-pink-400 transition-colors"
      onClick={handleCrush}
      disabled={loading}
    >
      <Heart className={`h-5 w-5 ${loading ? "animate-pulse" : ""}`} />
    </Button>
  );
}
