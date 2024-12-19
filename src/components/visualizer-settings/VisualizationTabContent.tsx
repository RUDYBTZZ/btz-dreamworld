import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { VisualizerSettings } from "@/types/visualizer";

interface VisualizationTabContentProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
}

export function VisualizationTabContent({ settings, onSettingChange }: VisualizationTabContentProps) {
  const { toast } = useToast();

  const handlePresetLoad = (preset: string) => {
    switch(preset) {
      case 'energetic':
        onSettingChange("intensity", 0.8);
        onSettingChange("speed", 0.7);
        onSettingChange("barType", "particleBurst");
        break;
      case 'chill':
        onSettingChange("intensity", 0.4);
        onSettingChange("speed", 0.3);
        onSettingChange("barType", "wave");
        break;
      case 'balanced':
        onSettingChange("intensity", 0.6);
        onSettingChange("speed", 0.5);
        onSettingChange("barType", "circular");
        break;
    }
    toast({
      title: "Preset Loaded",
      description: `${preset.charAt(0).toUpperCase() + preset.slice(1)} preset applied successfully`,
    });
  };

  return (
    <div className="space-y-6">
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
            <SelectItem value="particles">Particles</SelectItem>
            <SelectItem value="particleBurst">Particle Burst</SelectItem>
            <SelectItem value="ripple">Ripple</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Quick Presets</label>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => handlePresetLoad('energetic')}
          >
            Energetic
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => handlePresetLoad('chill')}
          >
            Chill
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => handlePresetLoad('balanced')}
          >
            Balanced
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Size X (px)</label>
        <Slider
          value={[settings.sizeX || 500]}
          onValueChange={([value]) => onSettingChange("sizeX", value)}
          min={100}
          max={2000}
          step={10}
          className="py-2"
        />
        <p className="text-xs text-muted-foreground">Current: {settings.sizeX}px</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Size Y (px)</label>
        <Slider
          value={[settings.sizeY || 500]}
          onValueChange={([value]) => onSettingChange("sizeY", value)}
          min={100}
          max={2000}
          step={10}
          className="py-2"
        />
        <p className="text-xs text-muted-foreground">Current: {settings.sizeY}px</p>
      </div>
    </div>
  );
}