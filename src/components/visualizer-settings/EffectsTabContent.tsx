import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Wand2, Zap, Sparkles, Music2 } from "lucide-react";
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

  const applyPreset = (preset: string) => {
    switch(preset) {
      case 'subtle':
        handleEffectChange("intensity", 0.3);
        handleEffectChange("speed", 0.4);
        handleEffectChange("glitchAmount", 0.1);
        handleEffectChange("zoomSpeed", 0.2);
        handleEffectChange("zoomIntensity", 0.3);
        break;
      case 'moderate':
        handleEffectChange("intensity", 0.6);
        handleEffectChange("speed", 0.5);
        handleEffectChange("glitchAmount", 0.2);
        handleEffectChange("zoomSpeed", 0.4);
        handleEffectChange("zoomIntensity", 0.5);
        break;
      case 'intense':
        handleEffectChange("intensity", 0.9);
        handleEffectChange("speed", 0.8);
        handleEffectChange("glitchAmount", 0.4);
        handleEffectChange("zoomSpeed", 0.7);
        handleEffectChange("zoomIntensity", 0.8);
        break;
      case 'extreme':
        handleEffectChange("intensity", 1.0);
        handleEffectChange("speed", 1.0);
        handleEffectChange("glitchAmount", 0.5);
        handleEffectChange("zoomSpeed", 0.9);
        handleEffectChange("zoomIntensity", 1.0);
        break;
    }
    
    toast({
      title: `${preset.charAt(0).toUpperCase() + preset.slice(1)} Preset Applied`,
      description: "Effect settings have been updated",
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
            onClick={() => applyPreset('extreme')}
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Max Impact
          </Button>
        </div>
      </div>

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
          <Zap className="w-4 h-4" />
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

      <div className="space-y-4">
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
    </div>
  );
}