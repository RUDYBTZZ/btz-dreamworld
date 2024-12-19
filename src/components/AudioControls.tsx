import React from 'react';
import AudioUploader from './audio/AudioUploader';
import PlaybackControls from './audio/PlaybackControls';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';

interface AudioControlsProps {
  onAudioLoad: (audioElement: HTMLAudioElement) => void;
}

const AudioControls = ({ onAudioLoad }: AudioControlsProps) => {
  const {
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
  } = useAudioPlayer(onAudioLoad);

  return (
    <div className="controls-panel p-4">
      <div className="flex flex-col gap-4">
        {!hasAudio && (
          <AudioUploader onAudioLoad={handleAudioLoad} />
        )}

        <PlaybackControls
          isPlaying={isPlaying}
          isMuted={isMuted}
          volume={volume}
          progress={progress}
          isRepeat={isRepeat}
          isShuffle={isShuffle}
          onPlayPause={togglePlayPause}
          onMuteToggle={toggleMute}
          onVolumeChange={handleVolumeChange}
          onPrevious={playPreviousTrack}
          onNext={playNextTrack}
          onShuffle={toggleShuffle}
          onRepeat={toggleRepeat}
          onPlaylistToggle={togglePlaylist}
          onPlaylistSave={savePlaylist}
          onPlaylistLoad={loadPlaylist}
          disabled={!audioRef.current?.src}
        />
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default AudioControls;