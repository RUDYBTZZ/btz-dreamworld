import React from 'react';
import { useToast } from "@/hooks/use-toast";

export const usePlaylistControls = (
  setIsShuffle: React.Dispatch<React.SetStateAction<boolean>>,
  setIsRepeat: React.Dispatch<React.SetStateAction<boolean>>,
  playlist: string[],
  setPlaylist: (playlist: string[]) => void
) => {
  const { toast } = useToast();

  const toggleShuffle = () => {
    setIsShuffle((prev: boolean) => {
      const newState = !prev;
      toast({
        title: newState ? "Shuffle enabled" : "Shuffle disabled",
        description: newState ? "Tracks will play in random order" : "Tracks will play in sequence",
      });
      return newState;
    });
  };

  const toggleRepeat = () => {
    setIsRepeat((prev: boolean) => {
      const newState = !prev;
      toast({
        title: newState ? "Repeat enabled" : "Repeat disabled",
        description: newState ? "Current track will repeat" : "Playlist will continue to next track",
      });
      return newState;
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
    toast({
      title: "Coming soon",
      description: "Playlist view will be implemented in the next update.",
    });
  };

  return {
    toggleShuffle,
    toggleRepeat,
    savePlaylist,
    loadPlaylist,
    togglePlaylist
  };
};