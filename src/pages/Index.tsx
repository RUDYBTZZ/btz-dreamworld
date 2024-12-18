import { useEffect, useState } from "react";
import AudioVisualizer from "@/components/AudioVisualizer";
import AudioControls from "@/components/AudioControls";
import BackgroundControls from "@/components/BackgroundControls";
import VisualizerControls from "@/components/VisualizerControls";
import MainNav from "@/components/MainNav";

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
      className="min-h-screen transition-all duration-300 flex flex-col"
      style={{ 
        background: background,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <MainNav />
      
      <main className="flex-1 relative mt-20 mb-32">
        <AudioVisualizer 
          audioContext={audioContext} 
          audioSource={audioSource}
          settings={visualizerSettings}
        />
        <VisualizerControls 
          settings={visualizerSettings}
          onSettingsChange={handleVisualizerSettingsChange}
        />
        <BackgroundControls onBackgroundChange={setBackground} />
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-50">
        <AudioControls onAudioLoad={handleAudioLoad} />
      </footer>
    </div>
  );
};

export default Index;