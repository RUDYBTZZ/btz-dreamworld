import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (value: number[]) => void;
  disabled: boolean;
}

const PlaybackControls = ({
  isPlaying,
  isMuted,
  volume,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
  disabled
}: PlaybackControlsProps) => {
  return (
    <div className="flex items-center gap-4 bg-background/50 p-3 rounded-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPlayPause}
        disabled={disabled}
        className="hover:bg-primary/20"
      >
        {isPlaying ? 
          <Pause className="h-5 w-5" /> : 
          <Play className="h-5 w-5" />
        }
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onMuteToggle}
        disabled={disabled}
        className="hover:bg-primary/20"
      >
        {isMuted ? 
          <VolumeX className="h-5 w-5" /> : 
          <Volume2 className="h-5 w-5" />
        }
      </Button>
      
      <Slider
        defaultValue={[volume]}
        max={100}
        step={1}
        className="w-full max-w-[200px]"
        onValueChange={onVolumeChange}
      />
    </div>
  );
};

export default PlaybackControls;