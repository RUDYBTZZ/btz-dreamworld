import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useAudioPlayer = (onAudioLoad: (audioElement: HTMLAudioElement) => void) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [progress, setProgress] = useState(0);
  const [hasAudio, setHasAudio] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const value = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(value) ? 0 : value);
    };

    const handleTrackEnd = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else if (playlist.length > 0) {
        playNextTrack();
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleTrackEnd);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleTrackEnd);
    };
  }, [isRepeat, playlist]);

  const handleAudioLoad = (file: File) => {
    const url = URL.createObjectURL(file);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      onAudioLoad(audioRef.current);
      setHasAudio(true);
      setPlaylist([...playlist, url]);
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

  const playPreviousTrack = () => {
    if (playlist.length === 0) return;
    
    let newIndex;
    if (isShuffle) {
      newIndex = Math.floor(Math.random() * playlist.length);
    } else {
      newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    }
    
    setCurrentTrackIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = playlist[newIndex];
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playNextTrack = () => {
    if (playlist.length === 0) return;
    
    let newIndex;
    if (isShuffle) {
      newIndex = Math.floor(Math.random() * playlist.length);
    } else {
      newIndex = (currentTrackIndex + 1) % playlist.length;
    }
    
    setCurrentTrackIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = playlist[newIndex];
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
    toast({
      title: !isShuffle ? "Shuffle enabled" : "Shuffle disabled",
      description: !isShuffle ? "Tracks will play in random order" : "Tracks will play in sequence",
    });
  };

  const toggleRepeat = () => {
    setIsRepeat(!isRepeat);
    toast({
      title: !isRepeat ? "Repeat enabled" : "Repeat disabled",
      description: !isRepeat ? "Current track will repeat" : "Playlist will continue to next track",
    });
  };

  const savePlaylist = () => {
    const playlistData = JSON.stringify(playlist);
    localStorage.setItem('audioPlaylist', playlistData);
    toast({
      title: "Playlist saved",
      description: "Your playlist has been saved successfully.",
    });
  };

  const loadPlaylist = () => {
    const savedPlaylist = localStorage.getItem('audioPlaylist');
    if (savedPlaylist) {
      const loadedPlaylist = JSON.parse(savedPlaylist);
      setPlaylist(loadedPlaylist);
      toast({
        title: "Playlist loaded",
        description: "Your saved playlist has been loaded successfully.",
      });
    }
  };

  const togglePlaylist = () => {
    // This function would be implemented when we add the playlist UI component
    toast({
      title: "Coming soon",
      description: "Playlist view will be implemented in the next update.",
    });
  };

  return {
    audioRef,
    isPlaying,
    isMuted,
    volume,
    progress,
    hasAudio,
    isRepeat,
    isShuffle,
    handleAudioLoad,
    togglePlayPause,
    toggleMute,
    handleVolumeChange,
    playPreviousTrack,
    playNextTrack,
    toggleShuffle,
    toggleRepeat,
    togglePlaylist,
    savePlaylist,
    loadPlaylist,
  };
};