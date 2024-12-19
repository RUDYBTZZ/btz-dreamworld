import React from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Repeat,
  List,
  Save,
  FolderOpen
} from "lucide-react";

interface PlaybackControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  progress: number;
  onPlayPause: () => void;
  onMuteToggle: () => void;
  onVolumeChange: (value: number[]) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onShuffle?: () => void;
  onRepeat?: () => void;
  onPlaylistToggle?: () => void;
  onPlaylistSave?: () => void;
  onPlaylistLoad?: () => void;
  disabled: boolean;
}

const PlaybackControls = ({
  isPlaying,
  isMuted,
  volume,
  progress,
  onPlayPause,
  onMuteToggle,
  onVolumeChange,
  onPrevious,
  onNext,
  onShuffle,
  onRepeat,
  onPlaylistToggle,
  onPlaylistSave,
  onPlaylistLoad,
  disabled
}: PlaybackControlsProps) => {
  return (
    <div className="flex flex-col gap-2 bg-background/50 p-3 rounded-lg">
      <Progress value={progress} className="w-full h-2" />
      
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            disabled={disabled}
            className="hover:bg-primary/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

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
            onClick={onNext}
            disabled={disabled}
            className="hover:bg-primary/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onShuffle}
            disabled={disabled}
            className="hover:bg-primary/20"
          >
            <Shuffle className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onRepeat}
            disabled={disabled}
            className="hover:bg-primary/20"
          >
            <Repeat className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
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
            className="w-[100px]"
            onValueChange={onVolumeChange}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPlaylistToggle}
            disabled={disabled}
            className="hover:bg-primary/20"
          >
            <List className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onPlaylistSave}
            disabled={disabled}
            className="hover:bg-primary/20"
          >
            <Save className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onPlaylistLoad}
            disabled={disabled}
            className="hover:bg-primary/20"
          >
            <FolderOpen className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControls;