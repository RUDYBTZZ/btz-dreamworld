import { Button } from "@/components/ui/button";
import { Wand2, Zap } from "lucide-react";
import type { VisualizerSettings } from "@/types/visualizer";
import { randomValue, handleSettingChange } from "@/utils/visualizer-settings";
import { useToast } from "@/hooks/use-toast";

interface VisualizationQuickActionsProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function VisualizationQuickActions({ settings, onSettingChange }: VisualizationQuickActionsProps) {
  const { toast } = useToast();
  const visualTypes = ["default", "circular", "wave", "blocks", "particles", "particleBurst", "ripple"];

  const randomizeSettings = () => {
    const randomType = visualTypes[Math.floor(Math.random() * visualTypes.length)];
    
    handleSettingChange("intensity", randomValue(), settings, onSettingChange);
    handleSettingChange("speed", randomValue(), settings, onSettingChange);
    handleSettingChange("barType", randomType, settings, onSettingChange);
    handleSettingChange("glitchAmount", randomValue() * 0.5, settings, onSettingChange);
    handleSettingChange("zoomSpeed", randomValue(), settings, onSettingChange);
    handleSettingChange("zoomIntensity", randomValue(), settings, onSettingChange);
    
    toast({
      title: "Settings Randomized",
      description: "New random visualization settings applied",
    });
  };

  const applyIntensePreset = () => {
    handleSettingChange("intensity", 1.0, settings, onSettingChange);
    handleSettingChange("speed", 0.9, settings, onSettingChange);
    handleSettingChange("barType", "particleBurst", settings, onSettingChange);
    handleSettingChange("glitchAmount", 0.4, settings, onSettingChange);
    handleSettingChange("zoomSpeed", 0.8, settings, onSettingChange);
    handleSettingChange("zoomIntensity", 0.9, settings, onSettingChange);
    
    toast({
      title: "Intense Preset Applied",
      description: "Maximum impact settings enabled",
    });
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-sm font-medium">Quick Actions</h3>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={randomizeSettings}
          className="flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Randomize
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={applyIntensePreset}
          className="flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Max Impact
        </Button>
      </div>
    </div>
  );
}