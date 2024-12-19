import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { VisualizerSettings } from "@/types/visualizer";

interface EffectsControlsProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function EffectsControls({ settings, onSettingChange }: EffectsControlsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Intensity</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[settings.intensity]}
          onValueChange={(value) => onSettingChange("intensity", value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label>Speed</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[settings.speed]}
          onValueChange={(value) => onSettingChange("speed", value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label>Glitch Amount</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[settings.glitchAmount]}
          onValueChange={(value) => onSettingChange("glitchAmount", value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label>Zoom Speed</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[settings.zoomSpeed]}
          onValueChange={(value) => onSettingChange("zoomSpeed", value[0])}
        />
      </div>

      <div className="space-y-2">
        <Label>Zoom Intensity</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[settings.zoomIntensity]}
          onValueChange={(value) => onSettingChange("zoomIntensity", value[0])}
        />
      </div>
    </div>
  );
}