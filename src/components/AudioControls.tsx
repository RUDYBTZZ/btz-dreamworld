import React from 'react';
import AudioUploader from './audio/AudioUploader';
import PlaybackControls from './audio/PlaybackControls';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EffectsControls } from './visualizer-settings/effects/EffectsControls';
import type { VisualizerSettings } from '@/types/visualizer';

interface AudioControlsProps {
  onAudioLoad: (audioElement: HTMLAudioElement) => void;
  settings: VisualizerSettings;
  onSettingsChange: (settings: VisualizerSettings) => void;
}

const AudioControls = ({ onAudioLoad, settings, onSettingsChange }: AudioControlsProps) => {
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

  const handleSettingChange = (key: keyof VisualizerSettings, value: number | string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="controls-panel p-4">
      <div className="flex flex-col gap-4">
        {!hasAudio && (
          <AudioUploader onAudioLoad={handleAudioLoad} />
        )}

        <div className="flex items-center justify-between">
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

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="ml-2 hover:bg-white/5"
              >
                <Sparkles className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Glitch & Effects</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <EffectsControls
                  settings={settings}
                  onSettingChange={handleSettingChange}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
};

export default AudioControls;