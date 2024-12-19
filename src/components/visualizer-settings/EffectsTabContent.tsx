import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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

  return (
    <div className="space-y-6">
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