import { Slider } from "@/components/ui/slider";
import type { VisualizerSettings } from "@/types/visualizer";

interface EffectsTabContentProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function EffectsTabContent({ settings, onSettingChange }: EffectsTabContentProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Bass Intensity</label>
        <Slider
          value={[settings.intensity]}
          onValueChange={([value]) => onSettingChange("intensity", value)}
          min={0}
          max={1}
          step={0.01}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Bass Speed</label>
        <Slider
          value={[settings.speed]}
          onValueChange={([value]) => onSettingChange("speed", value)}
          min={0}
          max={1}
          step={0.01}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Glitch Amount</label>
        <Slider
          value={[settings.glitchAmount]}
          onValueChange={([value]) => onSettingChange("glitchAmount", value)}
          min={0}
          max={1}
          step={0.01}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Zoom Speed</label>
        <Slider
          value={[settings.zoomSpeed || 0.5]}
          onValueChange={([value]) => onSettingChange("zoomSpeed", value)}
          min={0}
          max={1}
          step={0.01}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Zoom Intensity</label>
        <Slider
          value={[settings.zoomIntensity || 0.3]}
          onValueChange={([value]) => onSettingChange("zoomIntensity", value)}
          min={0}
          max={1}
          step={0.01}
        />
      </div>
    </div>
  );
}