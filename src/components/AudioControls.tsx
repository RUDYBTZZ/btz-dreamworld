import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Play, Pause, Upload } from "lucide-react";

interface AudioControlsProps {
  onAudioLoad: (audioElement: HTMLAudioElement) => void;
}

const AudioControls = ({ onAudioLoad }: AudioControlsProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  return (
    <div className="controls-panel">
      <div
        className={`upload-zone mb-4 ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
        <p>Drag and drop your audio file here</p>
        <p className="text-sm text-muted-foreground">or click to select a file</p>
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
      
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlayPause}
          disabled={!audioRef.current?.src}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Slider
          defaultValue={[100]}
          max={100}
          step={1}
          className="w-full"
          onValueChange={(value) => {
            if (audioRef.current) {
              audioRef.current.volume = value[0] / 100;
            }
          }}
        />
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default AudioControls;