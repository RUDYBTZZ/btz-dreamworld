import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wand2 } from "lucide-react";
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
        onSettingChange("glitchAmount", 0.3);
        break;
      case 'chill':
        onSettingChange("intensity", 0.4);
        onSettingChange("speed", 0.3);
        onSettingChange("barType", "wave");
        onSettingChange("glitchAmount", 0);
        break;
      case 'balanced':
        onSettingChange("intensity", 0.6);
        onSettingChange("speed", 0.5);
        onSettingChange("barType", "circular");
        onSettingChange("glitchAmount", 0.1);
        break;
      case 'psychedelic':
        onSettingChange("intensity", 1.0);
        onSettingChange("speed", 0.9);
        onSettingChange("barType", "ripple");
        onSettingChange("glitchAmount", 0.5);
        break;
    }
    toast({
      title: "Preset Loaded",
      description: `${preset.charAt(0).toUpperCase() + preset.slice(1)} preset applied successfully`,
    });
  };

  const randomizeSettings = () => {
    const randomValue = () => Math.random();
    const visualTypes = ["default", "circular", "wave", "blocks", "particles", "particleBurst", "ripple"];
    const randomType = visualTypes[Math.floor(Math.random() * visualTypes.length)];
    
    onSettingChange("intensity", randomValue());
    onSettingChange("speed", randomValue());
    onSettingChange("barType", randomType);
    onSettingChange("glitchAmount", randomValue() * 0.5);
    
    toast({
      title: "Settings Randomized",
      description: "New random visualization settings applied",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Visualization Type</label>
        <Select
          value={settings.barType}
          onValueChange={(value) => {
            onSettingChange("barType", value);
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
            <SelectItem value="wave">Wave Bars</SelectItem>
            <SelectItem value="blocks">Block Bars</SelectItem>
            <SelectItem value="particles">Particles</SelectItem>
            <SelectItem value="particleBurst">Particle Burst</SelectItem>
            <SelectItem value="ripple">Ripple</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Quick Presets</label>
          <Button 
            variant="outline" 
            size="sm"
            onClick={randomizeSettings}
            className="flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Randomize
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handlePresetLoad('energetic')}
          >
            Energetic
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handlePresetLoad('chill')}
          >
            Chill
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handlePresetLoad('balanced')}
          >
            Balanced
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handlePresetLoad('psychedelic')}
          >
            Psychedelic
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Size X (px)</label>
          <span className="text-xs text-muted-foreground">{settings.sizeX}px</span>
        </div>
        <Slider
          value={[settings.sizeX || 500]}
          onValueChange={([value]) => onSettingChange("sizeX", value)}
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
          value={[settings.sizeY || 500]}
          onValueChange={([value]) => onSettingChange("sizeY", value)}
          min={100}
          max={2000}
          step={10}
          className="py-2"
        />
      </div>
    </div>
  );
}