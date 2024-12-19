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
    <div className="space-y-6">
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
            <label className="text-sm font-medium">Bass Response</label>
            <span className="text-xs text-muted-foreground">{settings.bassResponse.toFixed(2)}</span>
          </div>
          <Slider
            value={[settings.bassResponse]}
            onValueChange={([value]) => handleSettingChange("bassResponse", value, settings, onSettingChange)}
            min={0}
            max={1}
            step={0.01}
            className="py-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Snare Response</label>
            <span className="text-xs text-muted-foreground">{settings.snareResponse.toFixed(2)}</span>
          </div>
          <Slider
            value={[settings.snareResponse]}
            onValueChange={([value]) => handleSettingChange("snareResponse", value, settings, onSettingChange)}
            min={0}
            max={1}
            step={0.01}
            className="py-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Particle Count</label>
            <span className="text-xs text-muted-foreground">{settings.particleCount}</span>
          </div>
          <Slider
            value={[settings.particleCount]}
            onValueChange={([value]) => handleSettingChange("particleCount", value, settings, onSettingChange)}
            min={10}
            max={1000}
            step={10}
            className="py-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Particle Size</label>
            <span className="text-xs text-muted-foreground">{settings.particleSize}</span>
          </div>
          <Slider
            value={[settings.particleSize]}
            onValueChange={([value]) => handleSettingChange("particleSize", value, settings, onSettingChange)}
            min={1}
            max={10}
            step={0.5}
            className="py-2"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="shape-rotation">Shape Rotation</Label>
          <Switch
            id="shape-rotation"
            checked={settings.shapeRotation}
            onCheckedChange={(checked) => handleSettingChange("shapeRotation", checked, settings, onSettingChange)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Text Alignment</label>
          <Select
            value={settings.textAlignment}
            onValueChange={(value: 'left' | 'center' | 'right') => handleSettingChange("textAlignment", value, settings, onSettingChange)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select text alignment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="center">Center</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}