import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, Upload, Volume2, VolumeX } from "lucide-react";

interface AudioControlsProps {
  onAudioLoad: (audioElement: HTMLAudioElement) => void;
}

const AudioControls = ({ onAudioLoad }: AudioControlsProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file (MP3, WAV, etc.)",
        variant: "destructive",
      });
      return;
    }

    const url = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      onAudioLoad(audioRef.current);
      toast({
        title: "Audio loaded",
        description: "Your audio file has been loaded successfully.",
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUploadClick = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
    
    if (newMutedState) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume / 100;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (isMuted) {
        setIsMuted(false);
      }
    }
  };

  return (
    <div className="controls-panel p-4">
      <div className="flex flex-col gap-4">
        <div
          className={`upload-zone flex items-center justify-center gap-2 ${isDragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleUploadClick}
        >
          <Upload className="w-6 h-6 text-primary" />
          <div className="flex flex-col">
            <p className="text-sm font-medium">Drop your audio file here</p>
            <p className="text-xs text-muted-foreground">or click to browse</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="audio/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
            }}
          />
        </div>

        <div className="flex items-center gap-4 bg-background/50 p-3 rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            disabled={!audioRef.current?.src}
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
            onClick={toggleMute}
            disabled={!audioRef.current?.src}
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
            onValueChange={handleVolumeChange}
          />
        </div>
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default AudioControls;
