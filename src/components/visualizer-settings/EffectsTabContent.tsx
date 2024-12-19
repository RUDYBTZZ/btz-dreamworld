import { EffectsControls } from "./effects/EffectsControls";
import { EffectsPresets } from "./effects/EffectsPresets";
import { EffectsQuickActions } from "./effects/EffectsQuickActions";
import type { VisualizerSettings } from "@/types/visualizer";

interface EffectsTabContentProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function EffectsTabContent({ settings, onSettingChange }: EffectsTabContentProps) {
  return (
    <div className="space-y-6">
      <EffectsQuickActions 
        settings={settings}
        onSettingChange={onSettingChange}
      />
      <EffectsPresets 
        settings={settings}
        onSettingChange={onSettingChange}
      />
      <EffectsControls 
        settings={settings}
        onSettingChange={onSettingChange}
      />
    </div>
  );
}