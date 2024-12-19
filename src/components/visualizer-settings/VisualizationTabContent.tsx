import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import type { VisualizerSettings } from "@/types/visualizer";

interface VisualizationTabContentProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function VisualizationTabContent({ settings, onSettingChange }: VisualizationTabContentProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Visualization Type</label>
        <Select
          value={settings.barType}
          onValueChange={(value) => onSettingChange("barType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select visualization type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Bars</SelectItem>
            <SelectItem value="circular">Circular Bars</SelectItem>
            <SelectItem value="wave">Wave Bars</SelectItem>
            <SelectItem value="blocks">Block Bars</SelectItem>
            <SelectItem value="line">Line Bars</SelectItem>
            <SelectItem value="imagelogo">Image/Logo</SelectItem>
            <SelectItem value="3dtext">3D Text</SelectItem>
            <SelectItem value="cube">3D Cube</SelectItem>
            <SelectItem value="sphere">3D Sphere</SelectItem>
            <SelectItem value="ring">3D Ring</SelectItem>
            <SelectItem value="patterns">Patterns</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Size X (px)</label>
        <Slider
          value={[settings.sizeX || 500]}
          onValueChange={([value]) => onSettingChange("sizeX", value)}
          min={0}
          max={1000}
          step={1}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Size Y (px)</label>
        <Slider
          value={[settings.sizeY || 500]}
          onValueChange={([value]) => onSettingChange("sizeY", value)}
          min={0}
          max={1000}
          step={1}
        />
      </div>
    </div>
  );
}