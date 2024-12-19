import { Slider } from "@/components/ui/slider";
import type { VisualizerSettings } from "@/types/visualizer";
import { handleSettingChange } from "@/utils/visualizer-settings";

interface EffectsSlidersProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function EffectsSliders({ settings, onSettingChange }: EffectsSlidersProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Bass Intensity</label>
          <span className="text-xs text-muted-foreground">{settings.intensity.toFixed(2)}</span>
        </div>
        <Slider
          value={[settings.intensity]}
          onValueChange={([value]) => handleSettingChange("intensity", value, settings, onSettingChange)}
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
          onValueChange={([value]) => handleSettingChange("speed", value, settings, onSettingChange)}
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
          onValueChange={([value]) => handleSettingChange("glitchAmount", value, settings, onSettingChange)}
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
          onValueChange={([value]) => handleSettingChange("zoomSpeed", value, settings, onSettingChange)}
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
          onValueChange={([value]) => handleSettingChange("zoomIntensity", value, settings, onSettingChange)}
          min={0}
          max={1}
          step={0.01}
          className="py-2"
        />
      </div>
    </div>
  );
}