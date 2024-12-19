import { Slider } from "@/components/ui/slider";
import type { VisualizerSettings } from "@/types/visualizer";
import { handleSettingChange } from "@/utils/visualizer-settings";

interface SizeControlsProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string | boolean) => void;
}

export function SizeControls({ settings, onSettingChange }: SizeControlsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Size X (px)</label>
          <span className="text-xs text-muted-foreground">{settings.sizeX}px</span>
        </div>
        <Slider
          value={[settings.sizeX]}
          onValueChange={([value]) => handleSettingChange("sizeX", value, settings, onSettingChange)}
          min={100}
          max={2000}
          step={10}
          className="py-2"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Size Y (px)</label>
          <span className="text-xs text-muted-foreground">{settings.sizeY}px</span>
        </div>
        <Slider
          value={[settings.sizeY]}
          onValueChange={([value]) => handleSettingChange("sizeY", value, settings, onSettingChange)}
          min={100}
          max={2000}
          step={10}
          className="py-2"
        />
      </div>
    </div>
  );
}