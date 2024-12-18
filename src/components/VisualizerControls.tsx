import { Sliders, AudioWaveform } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VisualizerSettings {
  intensity: number;
  speed: number;
  glitchAmount: number;
  barType: string;
}

interface VisualizerControlsProps {
  settings: VisualizerSettings;
  onSettingsChange: (settings: VisualizerSettings) => void;
}

const VisualizerControls = ({ settings, onSettingsChange }: VisualizerControlsProps) => {
  const handleSettingChange = (key: keyof VisualizerSettings, value: number | string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div className="fixed top-4 left-4 z-50 glass-panel p-4 space-y-4 w-64">
      <div className="flex items-center gap-2 mb-4">
        <AudioWaveform className="w-5 h-5" />
        <h3 className="font-semibold">Visualizer Controls</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Intensity
          </label>
          <Slider
            value={[settings.intensity]}
            onValueChange={([value]) => handleSettingChange("intensity", value)}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Speed
          </label>
          <Slider
            value={[settings.speed]}
            onValueChange={([value]) => handleSettingChange("speed", value)}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Glitch Amount
          </label>
          <Slider
            value={[settings.glitchAmount]}
            onValueChange={([value]) => handleSettingChange("glitchAmount", value)}
            min={0}
            max={1}
            step={0.01}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Visualization Type</label>
          <Select
            value={settings.barType}
            onValueChange={(value) => handleSettingChange("barType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select visualization type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Bars</SelectItem>
              <SelectItem value="circular">Circular</SelectItem>
              <SelectItem value="wave">Wave</SelectItem>
              <SelectItem value="blocks">Blocks</SelectItem>
              <SelectItem value="particles">Particles</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default VisualizerControls;