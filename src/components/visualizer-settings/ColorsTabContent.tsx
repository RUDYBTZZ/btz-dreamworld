import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ColorPicker } from "./ColorPicker";
import type { VisualizerSettings } from "@/types/visualizer";

interface ColorsTabContentProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
  background: string;
  onBackgroundChange: (color: string) => void;
}

export function ColorsTabContent({ 
  settings, 
  onSettingChange, 
  background, 
  onBackgroundChange 
}: ColorsTabContentProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Color Scheme</label>
        <Select
          value={settings.colorScheme}
          onValueChange={(value) => onSettingChange("colorScheme", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select color scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default (#9f7aea)</SelectItem>
            <SelectItem value="neon">Neon</SelectItem>
            <SelectItem value="sunset">Sunset</SelectItem>
            <SelectItem value="monochrome">Monochrome</SelectItem>
            <SelectItem value="rainbow">Rainbow</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="glass">Glass</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ColorPicker 
        background={background}
        onBackgroundChange={onBackgroundChange}
      />
    </div>
  );
}