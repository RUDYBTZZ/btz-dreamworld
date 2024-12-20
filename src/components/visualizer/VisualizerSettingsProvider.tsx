import React, { createContext, useContext, useState } from 'react';
import type { VisualizerSettings } from "@/types/visualizer";

interface VisualizerSettingsContextType {
  settings: VisualizerSettings;
  background: string;
  updateSettings: (settings: VisualizerSettings) => void;
  updateBackground: (color: string) => void;
}

const VisualizerSettingsContext = createContext<VisualizerSettingsContextType | undefined>(undefined);

export const useVisualizerSettings = () => {
  const context = useContext(VisualizerSettingsContext);
  if (!context) {
    throw new Error('useVisualizerSettings must be used within a VisualizerSettingsProvider');
  }
  return context;
};

export const VisualizerSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [background, setBackground] = useState('#9f7aea');
  const [settings, setSettings] = useState<VisualizerSettings>({
    intensity: 0.5,
    speed: 0.5,
    glitchAmount: 0,
    barType: 'grid',
    sizeX: 500,
    sizeY: 500,
    patternDensity: '16x16',
    bassResponseIntensity: 0.5,
    waveType: 'sine',
    // Wave properties
    bassResponse: 0.5,
    snareResponse: 0.5,
    colorScheme: 'default',
    shapeColor: '#ffffff',
    backgroundColor: '#000000',
    backgroundOpacity: 1,
    backgroundPosX: 0,
    backgroundPosY: 0,
    backgroundScaleX: 1,
    backgroundScaleY: 1,
    // Animation properties
    zoomSpeed: 0.5,
    zoomIntensity: 0.3,
    particleCount: 100,
    particleSize: 2,
    particleSpeed: 0.5,
    particleLifetime: 300,
    motionBlur: 2,
    trailPersistence: 5,
    // Text properties
    textSize: 32,
    textAlignment: 'center',
    textContent: '3D TEXT',
    textColor: '#9f7aea',
    // Shape properties
    shape3DType: 'grid',
    shapeRotation: true,
    morphSpeed: 0.5,
    // Effect timings
    snareAttackTime: 5,
    snareDecayTime: 200,
    wavePropagationSpeed: 100,
    // Border properties
    imageBorderRadius: 30,
    // Audio processing
    enableLowpass: true,
    enableHighpass: true,
    lowpassFreq: 20,
    highpassFreq: 410,
    smoothingTimeConstant: 0.1,
    // Advanced features
    particleBurstIntensity: 0.5,
    galaxySwirl: false,
    galaxySwirlSpeed: 0.5,
    fluidSimulation: false,
    fluidViscosity: 0.5,
    fractalDepth: 3,
    fractalScale: 1.5,
    shaderType: 'none',
    bloomStrength: 1.5,
    bloomRadius: 0.75,
    enableVR: false,
    sceneMode: 'cosmic',
    aiMoodDetection: false
  });

  const updateSettings = (newSettings: VisualizerSettings) => {
    setSettings(newSettings);
  };

  const updateBackground = (color: string) => {
    setBackground(color);
  };

  return (
    <VisualizerSettingsContext.Provider value={{
      settings,
      background,
      updateSettings,
      updateBackground,
    }}>
      {children}
    </VisualizerSettingsContext.Provider>
  );
};
