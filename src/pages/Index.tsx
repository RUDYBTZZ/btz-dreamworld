import { useEffect, useState } from "react";
import AudioVisualizer from "@/components/AudioVisualizer";
import AudioControls from "@/components/AudioControls";
import { VisualizerSettingsModal } from "@/components/VisualizerSettingsModal";
import type { VisualizerSettings } from "@/types/visualizer";

const Index = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);
  const [background, setBackground] = useState('#9f7aea');
  const [visualizerSettings, setVisualizerSettings] = useState<VisualizerSettings>({
    intensity: 0.5,
    speed: 0.5,
    glitchAmount: 0,
    barType: 'default',
    sizeX: 500,
    sizeY: 500,
    colorScheme: 'default',
    waveType: 'sine',
    zoomSpeed: 0.5,
    zoomIntensity: 0.3,
    bassResponse: 0.5,
    snareResponse: 0.5,
    particleCount: 100,
    particleSize: 2,
    particleSpeed: 0.5,
    textSize: 32,
    textAlignment: 'center',
    shapeRotation: true,
    shapeColor: '#ffffff',
    backgroundColor: '#000000',
    backgroundOpacity: 1,
    backgroundPosX: 0,
    backgroundPosY: 0,
    backgroundScaleX: 1,
    backgroundScaleY: 1,
    imageBorderRadius: 30,
    enableLowpass: true,
    enableHighpass: true,
    lowpassFreq: 20,
    highpassFreq: 410,
    smoothingTimeConstant: 0.1,
    shape3DType: 'cube',
    textContent: '3D TEXT',
    textColor: '#9f7aea',
    bassResponseIntensity: 0.5,
    animationSpeed: 0.5
  });

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    console.log("Audio context initialized");

    return () => {
      ctx.close();
      console.log("Audio context closed");
    };
  }, []);

  const handleAudioLoad = (audioElement: HTMLAudioElement) => {
    if (!audioContext) return;
    
    if (audioSource) {
      audioSource.disconnect();
    }
    
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
    setAudioSource(source);
    console.log("New audio source connected");
  };

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
        onSettingsChange={setVisualizerSettings}
        background={background}
        onBackgroundChange={setBackground}
      />
      
      <main className="flex-1 w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <AudioVisualizer 
            audioContext={audioContext} 
            audioSource={audioSource}
            settings={visualizerSettings}
          />
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 z-50 max-w-2xl mx-auto mb-8">
          <AudioControls 
            onAudioLoad={handleAudioLoad}
            settings={visualizerSettings}
            onSettingsChange={setVisualizerSettings}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;