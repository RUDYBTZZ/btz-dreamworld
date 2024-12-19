import { useEffect, useState } from "react";
import AudioVisualizer from "@/components/AudioVisualizer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
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
    zoomSpeed: 0.5,
    zoomIntensity: 0.3
  });

  console.log("Rendering Index with settings:", visualizerSettings);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    console.log("Audio context initialized");

    return () => {
      ctx.close();
      console.log("Audio context closed");
    };
  }, []);

  return (
    <SidebarProvider>
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
        
        <AppSidebar 
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
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;