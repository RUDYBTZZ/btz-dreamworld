import type { VisualizerSettings } from "@/types/visualizer";
import { EffectsQuickActions } from "./effects/EffectsQuickActions";
import { EffectsPresets } from "./effects/EffectsPresets";
import { EffectsSliders } from "./effects/EffectsSliders";

interface EffectsTabContentProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function EffectsTabContent({ settings, onSettingChange }: EffectsTabContentProps) {
  return (
    <div className="space-y-6">
      <EffectsQuickActions settings={settings} onSettingChange={onSettingChange} />
      <EffectsPresets settings={settings} onSettingChange={onSettingChange} />
      <EffectsSliders settings={settings} onSettingChange={onSettingChange} />
    </div>
  );
}