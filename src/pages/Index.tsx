import { MainLayout } from "@/components/layout/MainLayout";
import AudioVisualizer from "@/components/AudioVisualizer";
import AudioControls from "@/components/AudioControls";
import { AudioContextProvider, useAudioContextState } from "@/components/audio/AudioContextProvider";
import { VisualizerSettingsProvider, useVisualizerSettings } from "@/components/visualizer/VisualizerSettingsProvider";

const VisualizerContent = () => {
  const { audioContext, audioSource, setAudioSource } = useAudioContextState();
  const { settings, background, updateSettings, updateBackground } = useVisualizerSettings();

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
    <MainLayout
      background={background}
      visualizerSettings={settings}
      onSettingsChange={updateSettings}
      onBackgroundChange={updateBackground}
    >
      <main className="flex-1 w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 z-0">
          <AudioVisualizer 
            audioContext={audioContext} 
            audioSource={audioSource}
            settings={settings}
          />
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 z-50 max-w-2xl mx-auto mb-8">
          <AudioControls 
            onAudioLoad={handleAudioLoad}
            settings={settings}
            onSettingsChange={updateSettings}
          />
        </div>
      </main>
    </MainLayout>
  );
};

const Index = () => {
  return (
    <AudioContextProvider>
      <VisualizerSettingsProvider>
        <VisualizerContent />
      </VisualizerSettingsProvider>
    </AudioContextProvider>
  );
};

export default Index;