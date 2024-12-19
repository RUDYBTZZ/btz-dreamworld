import { useAudioState } from './audio/useAudioState';
import { usePlaylistState } from './audio/usePlaylistState';
import { usePlaybackControls } from './audio/usePlaybackControls';
import { useVolumeControls } from './audio/useVolumeControls';
import { usePlaylistControls } from './audio/usePlaylistControls';
import { useToast } from "@/hooks/use-toast";

export const useAudioPlayer = (onAudioLoad: (audioElement: HTMLAudioElement) => void) => {
  const {
    isPlaying, setIsPlaying,
    isMuted, setIsMuted,
    volume, setVolume,
    progress, setProgress,
    hasAudio, setHasAudio,
    audioRef
  } = useAudioState();

  const {
    isRepeat, setIsRepeat,
    isShuffle, setIsShuffle,
    playlist, setPlaylist,
    currentTrackIndex, setCurrentTrackIndex
  } = usePlaylistState();

  const { togglePlayPause, playPreviousTrack, playNextTrack } = usePlaybackControls(
    audioRef,
    setIsPlaying,
    setProgress,
    playlist,
    currentTrackIndex,
    setCurrentTrackIndex,
    isShuffle
  );

  const { toggleMute, handleVolumeChange } = useVolumeControls(
    audioRef,
    setIsMuted,
    setVolume
  );

  const {
    toggleShuffle,
    toggleRepeat,
    savePlaylist,
    loadPlaylist,
    togglePlaylist
  } = usePlaylistControls(
    setIsShuffle,
    setIsRepeat,
    playlist,
    setPlaylist
  );

  const { toast } = useToast();

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