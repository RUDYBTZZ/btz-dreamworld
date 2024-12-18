import { useEffect, useState } from "react";
import AudioVisualizer from "@/components/AudioVisualizer";
import AudioControls from "@/components/AudioControls";
import BackgroundControls from "@/components/BackgroundControls";
import VisualizerControls from "@/components/VisualizerControls";

const Index = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);
  const [background, setBackground] = useState('#9f7aea');
  const [visualizerSettings, setVisualizerSettings] = useState({
    intensity: 0.5,
    speed: 0.5,
    glitchAmount: 0,
    barType: 'default'
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

  const handleVisualizerSettingsChange = (newSettings: typeof visualizerSettings) => {
    setVisualizerSettings(newSettings);
    console.log("Visualizer settings updated:", newSettings);
  };

  return (
    <div 
      className="min-h-screen transition-all duration-300"
      style={{ 
        background: background,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <AudioVisualizer 
        audioContext={audioContext} 
        audioSource={audioSource} 
        settings={visualizerSettings}
      />
      <AudioControls onAudioLoad={handleAudioLoad} />
      <BackgroundControls onBackgroundChange={setBackground} />
      <VisualizerControls 
        settings={visualizerSettings}
        onSettingsChange={handleVisualizerSettingsChange}
      />
    </div>
  );
};

export default Index;