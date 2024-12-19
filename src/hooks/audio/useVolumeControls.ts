export const useVolumeControls = (
  audioRef: React.RefObject<HTMLAudioElement>,
  setIsMuted: (muted: boolean) => void,
  setVolume: (volume: number) => void
) => {
  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !audioRef.current.muted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
    
    if (newMutedState) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = Number(audioRef.current.dataset.previousVolume || 1);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      audioRef.current.dataset.previousVolume = String(newVolume / 100);
      if (newVolume === 0) {
        setIsMuted(true);
      } else if (audioRef.current.muted) {
        setIsMuted(false);
      }
    }
  };

  return {
    toggleMute,
    handleVolumeChange
  };
};