import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Wand2, 
  BarChart3, 
  Circle, 
  Waves, 
  Box, 
  Sparkles, 
  Zap, 
  Ripple 
} from "lucide-react";
import type { VisualizerSettings } from "@/types/visualizer";
import { handleSettingChange } from "@/utils/visualizer-settings";
import { useToast } from "@/hooks/use-toast";

interface VisualizationControlsProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string | boolean) => void;
}

const visualizationTypes = [
  {
    value: "default",
    label: "Default Bars",
    description: "Classic audio bars that react to sound frequencies",
    icon: BarChart3
  },
  {
    value: "circular",
    label: "Circular Bars",
    description: "Bars arranged in a circular pattern for an immersive experience",
    icon: Circle
  },
  {
    value: "wave",
    label: "Wave Form",
    description: "Smooth wave animation that follows the audio rhythm",
    icon: Waves
  },
  {
    value: "blocks",
    label: "3D Blocks",
    description: "Three-dimensional blocks that pulse with the music",
    icon: Box
  },
  {
    value: "particles",
    label: "Particle System",
    description: "Dynamic particle effects that dance to the beat",
    icon: Sparkles
  },
  {
    value: "particleBurst",
    label: "Particle Burst",
    description: "Explosive particle effects synchronized with bass",
    icon: Zap
  },
  {
    value: "ripple",
    label: "Ripple Effect",
    description: "Mesmerizing ripples that spread with sound waves",
    icon: Ripple
  }
];

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
              description: `Switched to ${visualizationTypes.find(v => v.value === value)?.label}`,
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select visualization type" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[300px]">
              {visualizationTypes.map((type, index) => (
                <div key={type.value}>
                  {index > 0 && <Separator className="my-2" />}
                  <SelectItem 
                    value={type.value}
                    className="focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="flex items-start gap-3 py-1">
                      <type.icon className="w-5 h-5 mt-0.5 text-muted-foreground" />
                      <div className="space-y-1">
                        <div className="font-medium">{type.label}</div>
                        <p className="text-xs text-muted-foreground">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </SelectItem>
                </div>
              ))}
            </ScrollArea>
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