import { useToast } from "@/hooks/use-toast";

export const usePlaybackControls = (
  audioRef: React.RefObject<HTMLAudioElement>,
  setIsPlaying: (playing: boolean) => void,
  setProgress: (progress: number) => void,
  playlist: string[],
  currentTrackIndex: number,
  setCurrentTrackIndex: (index: number) => void,
  isShuffle: boolean
) => {
  const { toast } = useToast();

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

  return {
    togglePlayPause,
    playPreviousTrack,
    playNextTrack
  };
};