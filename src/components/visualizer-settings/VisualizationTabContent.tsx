import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wand2, Zap, Sparkles, Music } from "lucide-react";
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
        onSettingChange("zoomSpeed", 0.6);
        onSettingChange("zoomIntensity", 0.7);
        break;
      case 'chill':
        onSettingChange("intensity", 0.4);
        onSettingChange("speed", 0.3);
        onSettingChange("barType", "wave");
        onSettingChange("glitchAmount", 0);
        onSettingChange("zoomSpeed", 0.2);
        onSettingChange("zoomIntensity", 0.3);
        break;
      case 'psychedelic':
        onSettingChange("intensity", 1.0);
        onSettingChange("speed", 0.9);
        onSettingChange("barType", "ripple");
        onSettingChange("glitchAmount", 0.5);
        onSettingChange("zoomSpeed", 0.8);
        onSettingChange("zoomIntensity", 0.9);
        break;
      case 'balanced':
        onSettingChange("intensity", 0.6);
        onSettingChange("speed", 0.5);
        onSettingChange("barType", "circular");
        onSettingChange("glitchAmount", 0.1);
        onSettingChange("zoomSpeed", 0.4);
        onSettingChange("zoomIntensity", 0.5);
        break;
    }
    
    toast({
      title: "Preset Applied",
      description: `${preset.charAt(0).toUpperCase() + preset.slice(1)} preset loaded successfully`,
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
    onSettingChange("zoomSpeed", randomValue());
    onSettingChange("zoomIntensity", randomValue());
    
    toast({
      title: "Settings Randomized",
      description: "New random visualization settings applied",
    });
  };

  const applyIntensePreset = () => {
    onSettingChange("intensity", 1.0);
    onSettingChange("speed", 0.9);
    onSettingChange("barType", "particleBurst");
    onSettingChange("glitchAmount", 0.4);
    onSettingChange("zoomSpeed", 0.8);
    onSettingChange("zoomIntensity", 0.9);
    
    toast({
      title: "Intense Preset Applied",
      description: "Maximum impact settings enabled",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium">Quick Actions</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={randomizeSettings}
            className="flex items-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            Randomize
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={applyIntensePreset}
            className="flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Max Impact
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        <Button 
          variant="outline"
          onClick={() => handlePresetLoad('energetic')}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Energetic
        </Button>
        <Button 
          variant="outline"
          onClick={() => handlePresetLoad('chill')}
          className="flex items-center gap-2"
        >
          <Music className="w-4 h-4" />
          Chill
        </Button>
        <Button 
          variant="outline"
          onClick={() => handlePresetLoad('psychedelic')}
          className="flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Psychedelic
        </Button>
        <Button 
          variant="outline"
          onClick={() => handlePresetLoad('balanced')}
          className="flex items-center gap-2"
        >
          <Music className="w-4 h-4" />
          Balanced
        </Button>
      </div>

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
            value={[settings.sizeY]}
            onValueChange={([value]) => onSettingChange("sizeY", value)}
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