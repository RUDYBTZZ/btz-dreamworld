import type { VisualizerSettings } from "@/types/visualizer";
import { VisualizationType } from "./VisualizationType";
import { SizeControls } from "./SizeControls";

interface VisualizationControlsProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string | boolean) => void;
}

export function VisualizationControls({ settings, onSettingChange }: VisualizationControlsProps) {
  return (
    <div className="space-y-6">
      <VisualizationType 
        settings={settings}
        onSettingChange={onSettingChange}
      />
      <SizeControls 
        settings={settings}
        onSettingChange={onSettingChange}
      />
    </div>
  );
}