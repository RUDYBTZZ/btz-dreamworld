import { Button } from "@/components/ui/button";
import { Wand2, Zap } from "lucide-react";
import type { VisualizerSettings } from "@/types/visualizer";
import { randomValue, handleSettingChange } from "@/utils/visualizer-settings";
import { useToast } from "@/hooks/use-toast";

interface EffectsQuickActionsProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function EffectsQuickActions({ settings, onSettingChange }: EffectsQuickActionsProps) {
  const { toast } = useToast();

  const randomizeEffects = () => {
    handleSettingChange("intensity", randomValue(), settings, onSettingChange);
    handleSettingChange("speed", randomValue(), settings, onSettingChange);
    handleSettingChange("glitchAmount", randomValue() * 0.5, settings, onSettingChange);
    handleSettingChange("zoomSpeed", randomValue(), settings, onSettingChange);
    handleSettingChange("zoomIntensity", randomValue(), settings, onSettingChange);
    
    toast({
      title: "Effects Randomized",
      description: "New random effect settings applied",
    });
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-sm font-medium">Quick Actions</h3>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={randomizeEffects}
          className="flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Randomize
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            handleSettingChange("intensity", 1.0, settings, onSettingChange);
            handleSettingChange("speed", 0.8, settings, onSettingChange);
            handleSettingChange("glitchAmount", 0.4, settings, onSettingChange);
            handleSettingChange("zoomSpeed", 0.7, settings, onSettingChange);
            handleSettingChange("zoomIntensity", 0.8, settings, onSettingChange);
          }}
          className="flex items-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Max Impact
        </Button>
      </div>
    </div>
  );
}