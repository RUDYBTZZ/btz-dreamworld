import { Button } from "@/components/ui/button";
import { Music2, Sparkles } from "lucide-react";
import type { VisualizerSettings } from "@/types/visualizer";
import { handleSettingChange } from "@/utils/visualizer-settings";

interface EffectsPresetsProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function EffectsPresets({ settings, onSettingChange }: EffectsPresetsProps) {
  const applyPreset = (preset: string) => {
    switch(preset) {
      case 'subtle':
        handleSettingChange("intensity", 0.3, settings, onSettingChange);
        handleSettingChange("speed", 0.4, settings, onSettingChange);
        handleSettingChange("glitchAmount", 0.1, settings, onSettingChange);
        handleSettingChange("zoomSpeed", 0.2, settings, onSettingChange);
        handleSettingChange("zoomIntensity", 0.3, settings, onSettingChange);
        break;
      case 'moderate':
        handleSettingChange("intensity", 0.6, settings, onSettingChange);
        handleSettingChange("speed", 0.5, settings, onSettingChange);
        handleSettingChange("glitchAmount", 0.2, settings, onSettingChange);
        handleSettingChange("zoomSpeed", 0.4, settings, onSettingChange);
        handleSettingChange("zoomIntensity", 0.5, settings, onSettingChange);
        break;
      case 'intense':
        handleSettingChange("intensity", 0.9, settings, onSettingChange);
        handleSettingChange("speed", 0.8, settings, onSettingChange);
        handleSettingChange("glitchAmount", 0.4, settings, onSettingChange);
        handleSettingChange("zoomSpeed", 0.7, settings, onSettingChange);
        handleSettingChange("zoomIntensity", 0.8, settings, onSettingChange);
        break;
      case 'extreme':
        handleSettingChange("intensity", 1.0, settings, onSettingChange);
        handleSettingChange("speed", 1.0, settings, onSettingChange);
        handleSettingChange("glitchAmount", 0.5, settings, onSettingChange);
        handleSettingChange("zoomSpeed", 0.9, settings, onSettingChange);
        handleSettingChange("zoomIntensity", 1.0, settings, onSettingChange);
        break;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2 mb-6">
      <Button 
        variant="outline"
        onClick={() => applyPreset('subtle')}
        className="flex items-center gap-2"
      >
        <Music2 className="w-4 h-4" />
        Subtle
      </Button>
      <Button 
        variant="outline"
        onClick={() => applyPreset('moderate')}
        className="flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Moderate
      </Button>
      <Button 
        variant="outline"
        onClick={() => applyPreset('intense')}
        className="flex items-center gap-2"
      >
        <Music2 className="w-4 h-4" />
        Intense
      </Button>
      <Button 
        variant="outline"
        onClick={() => applyPreset('extreme')}
        className="flex items-center gap-2"
      >
        <Sparkles className="w-4 h-4" />
        Extreme
      </Button>
    </div>
  );
}