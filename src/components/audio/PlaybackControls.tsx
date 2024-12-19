import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Settings2
} from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  progress: number;
  isRepeat?: boolean;
  isShuffle?: boolean;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (value: number[]) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onShuffle?: () => void;
  onRepeat?: () => void;
  onPlaylistToggle?: () => void;
  disabled: boolean;
}

const PlaybackControls = ({
  isPlaying,
  isMuted,
  volume,
  progress,
  isRepeat,
  isShuffle,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
  onPrevious,
  onNext,
  onShuffle,
  onRepeat,
  onPlaylistToggle,
  disabled
}: PlaybackControlsProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-white/10">
      <Progress value={progress} className="w-full h-1 rounded-none bg-white/5" />
      
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        <div className="text-sm text-muted-foreground w-24">
          00:00 / 00:00
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShuffle}
            disabled={disabled}
            className={`hover:bg-white/5 ${isShuffle ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Shuffle className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={disabled}
            className="hover:bg-white/5"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onPlayPause}
            disabled={disabled}
            className="h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 text-primary"
          >
            {isPlaying ? 
              <Pause className="h-6 w-6" /> : 
              <Play className="h-6 w-6" />
            }
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            disabled={disabled}
            className="hover:bg-white/5"
          >
            <SkipForward className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onRepeat}
            disabled={disabled}
            className={`hover:bg-white/5 ${isRepeat ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Repeat className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-4 w-24">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMuteToggle}
            disabled={disabled}
            className="hover:bg-white/5"
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
            className="w-[80px]"
            onValueChange={onVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;