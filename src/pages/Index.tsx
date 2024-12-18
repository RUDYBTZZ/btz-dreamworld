import { useEffect, useState } from "react";
import AudioVisualizer from "@/components/AudioVisualizer";
import AudioControls from "@/components/AudioControls";

const Index = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioSource, setAudioSource] = useState<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    // Initialize AudioContext
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);

    return () => {
      ctx.close();
    };
  }, []);

  const handleAudioLoad = (audioElement: HTMLAudioElement) => {
    if (!audioContext) return;
    
    // Disconnect previous source if it exists
    if (audioSource) {
      audioSource.disconnect();
    }
    
    // Create and connect new audio source
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);
    setAudioSource(source);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/50">
      <AudioVisualizer audioContext={audioContext} audioSource={audioSource} />
      <AudioControls onAudioLoad={handleAudioLoad} />
    </div>
  );
};

export default Index;