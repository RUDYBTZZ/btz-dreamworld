import { VisualizerSettings } from "@/types/visualizer";
import { toast } from "@/hooks/use-toast";

export const handleSettingChange = (
  key: keyof VisualizerSettings,
  value: number | string,
  settings: VisualizerSettings,
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void
) => {
  onSettingChange(key, value);
  toast({
    title: "Setting Updated",
    description: `${key.charAt(0).toUpperCase() + key.slice(1)} has been adjusted`,
  });
};

export const randomValue = () => Math.random();