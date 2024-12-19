import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Wand2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { VisualizerSettings } from "@/types/visualizer";

interface EffectsTabContentProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function EffectsTabContent({ settings, onSettingChange }: EffectsTabContentProps) {
  const { toast } = useToast();

  const handleEffectChange = (key: keyof VisualizerSettings, value: number) => {
    onSettingChange(key, value);
    toast({
      title: "Effect Updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} has been adjusted`,
    });
  };

  const randomizeEffects = () => {
    const randomValue = () => Math.random();
    
    handleEffectChange("intensity", randomValue());
    handleEffectChange("speed", randomValue());
    handleEffectChange("glitchAmount", randomValue() * 0.5);
    handleEffectChange("zoomSpeed", randomValue());
    handleEffectChange("zoomIntensity", randomValue());
    
    toast({
      title: "Effects Randomized",
      description: "New random effect settings applied",
    });
  };

  const applyIntenseEffects = () => {
    handleEffectChange("intensity", 0.8);
    handleEffectChange("speed", 0.7);
    handleEffectChange("glitchAmount", 0.3);
    handleEffectChange("zoomSpeed", 0.6);
    handleEffectChange("zoomIntensity", 0.7);
    
    toast({
      title: "Intense Effects Applied",
      description: "Maximum impact settings enabled",
    });
  };

  return (
    <div className="space-y-6">
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
            onClick={applyIntenseEffects}
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Max Impact
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Bass Intensity</label>
          <span className="text-xs text-muted-foreground">{settings.intensity.toFixed(2)}</span>
        </div>
        <Slider
          value={[settings.intensity]}
          onValueChange={([value]) => handleEffectChange("intensity", value)}
          min={0}
          max={1}
          step={0.01}
          className="py-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Animation Speed</label>
          <span className="text-xs text-muted-foreground">{settings.speed.toFixed(2)}</span>
        </div>
        <Slider
          value={[settings.speed]}
          onValueChange={([value]) => handleEffectChange("speed", value)}
          min={0}
          max={1}
          step={0.01}
          className="py-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Glitch Amount</label>
          <span className="text-xs text-muted-foreground">{settings.glitchAmount.toFixed(2)}</span>
        </div>
        <Slider
          value={[settings.glitchAmount]}
          onValueChange={([value]) => handleEffectChange("glitchAmount", value)}
          min={0}
          max={1}
          step={0.01}
          className="py-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Zoom Speed</label>
          <span className="text-xs text-muted-foreground">{settings.zoomSpeed.toFixed(2)}</span>
        </div>
        <Slider
          value={[settings.zoomSpeed]}
          onValueChange={([value]) => handleEffectChange("zoomSpeed", value)}
          min={0}
          max={1}
          step={0.01}
          className="py-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Zoom Intensity</label>
          <span className="text-xs text-muted-foreground">{settings.zoomIntensity.toFixed(2)}</span>
        </div>
        <Slider
          value={[settings.zoomIntensity]}
          onValueChange={([value]) => handleEffectChange("zoomIntensity", value)}
          min={0}
          max={1}
          step={0.01}
          className="py-2"
        />
      </div>
    </div>
  );
}