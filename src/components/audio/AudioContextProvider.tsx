import React, { createContext, useContext, useState, useEffect } from 'react';

interface AudioContextState {
  audioContext: AudioContext | null;
  audioSource: MediaElementAudioSourceNode | null;
  setAudioSource: (source: MediaElementAudioSourceNode | null) => void;
}

const AudioContextStateContext = createContext<AudioContextState | undefined>(undefined);

export const useAudioContextState = () => {
  const context = useContext(AudioContextStateContext);
  if (!context) {
    throw new Error('useAudioContextState must be used within an AudioContextProvider');
  }
  return context;
};

export const AudioContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    console.log("Initializing audio context");
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);

    return () => {
      console.log("Cleaning up audio context");
      ctx.close();
    };
  }, []);

  return (
    <AudioContextStateContext.Provider value={{ audioContext, audioSource, setAudioSource }}>
      {children}
    </AudioContextStateContext.Provider>
  );
};