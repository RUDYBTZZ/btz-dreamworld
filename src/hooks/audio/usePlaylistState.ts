import { useState } from 'react';

export const usePlaylistState = () => {
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  return {
    isRepeat,
    setIsRepeat,
    isShuffle,
    setIsShuffle,
    playlist,
    setPlaylist,
    currentTrackIndex,
    setCurrentTrackIndex
  };
};