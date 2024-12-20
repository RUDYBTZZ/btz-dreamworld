import React from 'react';
import type { VisualizerSettings } from "@/types/visualizer";
import { VisualizerSettingsModal } from "@/components/VisualizerSettingsModal";

interface MainLayoutProps {
  background: string;
  children: React.ReactNode;
  visualizerSettings: VisualizerSettings;
  onSettingsChange: (settings: VisualizerSettings) => void;
  onBackgroundChange: (color: string) => void;
}

export const MainLayout = ({
  background,
  children,
  visualizerSettings,
  onSettingsChange,
  onBackgroundChange,
}: MainLayoutProps) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative transition-all duration-300"
      style={{ 
        background: background,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <VisualizerSettingsModal 
        settings={visualizerSettings}
        onSettingsChange={onSettingsChange}
        background={background}
        onBackgroundChange={onBackgroundChange}
      />
      
      {children}
    </div>
  );
};