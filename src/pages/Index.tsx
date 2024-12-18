import { useEffect, useState } from "react";
import AudioVisualizer from "@/components/AudioVisualizer";
import AudioControls from "@/components/AudioControls";
import BackgroundControls from "@/components/BackgroundControls";

const Index = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);
  const [background, setBackground] = useState('#9f7aea');

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);

    return () => {
      ctx.close();
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
      <AudioVisualizer audioContext={audioContext} audioSource={audioSource} />
      <AudioControls onAudioLoad={handleAudioLoad} />
      <BackgroundControls onBackgroundChange={setBackground} />
    </div>
  );
};

export default Index;