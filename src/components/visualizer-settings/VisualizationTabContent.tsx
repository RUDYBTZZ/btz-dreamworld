import { VisualizationControls } from "./visualization/VisualizationControls";
import { VisualizationPresets } from "./visualization/VisualizationPresets";
import { VisualizationQuickActions } from "./visualization/VisualizationQuickActions";
import type { VisualizerSettings } from "@/types/visualizer";

interface VisualizationTabContentProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function VisualizationTabContent({ settings, onSettingChange }: VisualizationTabContentProps) {
  return (
    <div className="space-y-6">
      <VisualizationQuickActions 
        settings={settings}
        onSettingChange={onSettingChange}
      />
      <VisualizationPresets 
        settings={settings}
        onSettingChange={onSettingChange}
      />
      <VisualizationControls 
        settings={settings}
        onSettingChange={onSettingChange}
      />
    </div>
  );
}