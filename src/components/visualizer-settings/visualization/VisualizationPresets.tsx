import { Button } from "@/components/ui/button";
import { Sparkles, Music } from "lucide-react";
import type { VisualizerSettings } from "@/types/visualizer";
import { handleSettingChange } from "@/utils/visualizer-settings";

interface VisualizationPresetsProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function VisualizationPresets({ settings, onSettingChange }: VisualizationPresetsProps) {
  const handlePresetLoad = (preset: string) => {
    switch(preset) {
      case 'energetic':
        handleSettingChange("intensity", 0.8, settings, onSettingChange);
        handleSettingChange("speed", 0.7, settings, onSettingChange);
        handleSettingChange("barType", "particleBurst", settings, onSettingChange);
        handleSettingChange("glitchAmount", 0.3, settings, onSettingChange);
        handleSettingChange("zoomSpeed", 0.6, settings, onSettingChange);
        handleSettingChange("zoomIntensity", 0.7, settings, onSettingChange);
        break;
      case 'chill':
        handleSettingChange("intensity", 0.4, settings, onSettingChange);
        handleSettingChange("speed", 0.3, settings, onSettingChange);
        handleSettingChange("barType", "wave", settings, onSettingChange);
        handleSettingChange("glitchAmount", 0, settings, onSettingChange);
        handleSettingChange("zoomSpeed", 0.2, settings, onSettingChange);
        handleSettingChange("zoomIntensity", 0.3, settings, onSettingChange);
        break;
      case 'psychedelic':
        handleSettingChange("intensity", 1.0, settings, onSettingChange);
        handleSettingChange("speed", 0.9, settings, onSettingChange);
        handleSettingChange("barType", "ripple", settings, onSettingChange);
        handleSettingChange("glitchAmount", 0.5, settings, onSettingChange);
        handleSettingChange("zoomSpeed", 0.8, settings, onSettingChange);
        handleSettingChange("zoomIntensity", 0.9, settings, onSettingChange);
        break;
      case 'balanced':
        handleSettingChange("intensity", 0.6, settings, onSettingChange);
        handleSettingChange("speed", 0.5, settings, onSettingChange);
        handleSettingChange("barType", "circular", settings, onSettingChange);
        handleSettingChange("glitchAmount", 0.1, settings, onSettingChange);
        handleSettingChange("zoomSpeed", 0.4, settings, onSettingChange);
        handleSettingChange("zoomIntensity", 0.5, settings, onSettingChange);
        break;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      <Button 
        variant="outline"
        onClick={() => handlePresetLoad('energetic')}
        className="flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Energetic
      </Button>
      <Button 
        variant="outline"
        onClick={() => handlePresetLoad('chill')}
        className="flex items-center gap-2"
      >
        <Music className="w-4 h-4" />
        Chill
      </Button>
      <Button 
        variant="outline"
        onClick={() => handlePresetLoad('psychedelic')}
        className="flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Psychedelic
      </Button>
      <Button 
        variant="outline"
        onClick={() => handlePresetLoad('balanced')}
        className="flex items-center gap-2"
      >
        <Music className="w-4 h-4" />
        Balanced
      </Button>
    </div>
  );
}