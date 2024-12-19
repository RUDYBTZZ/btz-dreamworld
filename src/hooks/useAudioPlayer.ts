import { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useAudioPlayer = (onAudioLoad: (audioElement: HTMLAudioElement) => void) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  const handleAudioLoad = (file: File) => {
    const url = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      onAudioLoad(audioRef.current);
      setHasAudio(true);
      toast({
        title: "Audio loaded",
        description: "Your audio file has been loaded successfully.",
      });
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

  return {
    audioRef,
    isPlaying,
    isMuted,
    volume,
    hasAudio,
    handleAudioLoad,
    togglePlayPause,
    toggleMute,
    handleVolumeChange,
  };
};