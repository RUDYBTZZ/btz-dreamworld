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
    hasAudio,
    handleAudioLoad,
    togglePlayPause,
    toggleMute,
    handleVolumeChange,
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
          onPlayPause={togglePlayPause}
          onMuteToggle={toggleMute}
          onVolumeChange={handleVolumeChange}
          disabled={!audioRef.current?.src}
        />
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default AudioControls;