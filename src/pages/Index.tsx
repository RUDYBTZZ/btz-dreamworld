import { useEffect, useState } from "react";
import AudioVisualizer from "@/components/AudioVisualizer";
import AudioControls from "@/components/AudioControls";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

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

  return (
    <SidebarProvider>
      <div 
        className="min-h-screen transition-all duration-300 flex flex-col w-full"
        style={{ 
          background: background,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <AppSidebar 
          settings={visualizerSettings}
          onSettingsChange={setVisualizerSettings}
          background={background}
          onBackgroundChange={setBackground}
        />
        
        <main className="flex-1 relative mt-20 mb-32">
          <AudioVisualizer 
            audioContext={audioContext} 
            audioSource={audioSource}
            settings={visualizerSettings}
          />
        </main>

        <footer className="fixed bottom-0 left-0 right-0 z-50">
          <AudioControls onAudioLoad={handleAudioLoad} />
        </footer>
      </div>
    </SidebarProvider>
  );
};

export default Index;