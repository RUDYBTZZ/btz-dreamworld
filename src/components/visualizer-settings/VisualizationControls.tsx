import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { VisualizerSettings } from "@/types/visualizer";
import { handleSettingChange } from "@/utils/visualizer-settings";
import { useToast } from "@/hooks/use-toast";

interface VisualizationControlsProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string | boolean) => void;
}

export function VisualizationControls({ settings, onSettingChange }: VisualizationControlsProps) {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Visualization Type</label>
        <Select
          value={settings.barType}
          onValueChange={(value) => {
            handleSettingChange("barType", value, settings, onSettingChange);
            toast({
              title: "Visualization Updated",
              description: `Switched to ${value} visualization`,
            });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select visualization type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Bars</SelectItem>
            <SelectItem value="circular">Circular Bars</SelectItem>
            <SelectItem value="wave">Wave Form</SelectItem>
            <SelectItem value="blocks">3D Blocks</SelectItem>
            <SelectItem value="particles">Particle System</SelectItem>
            <SelectItem value="particleBurst">Particle Burst</SelectItem>
            <SelectItem value="ripple">Ripple Effect</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
    </div>
  );
}