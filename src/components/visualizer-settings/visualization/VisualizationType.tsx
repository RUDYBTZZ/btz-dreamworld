import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  BarChart3, 
  Circle, 
  Waves, 
  Box, 
  Sparkles, 
  Zap, 
  Droplets 
} from "lucide-react";
import type { VisualizerSettings } from "@/types/visualizer";
import { handleSettingChange } from "@/utils/visualizer-settings";
import { useToast } from "@/hooks/use-toast";

interface VisualizationTypeProps {
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
    icon: Waves,
    subtypes: [
      { value: 'sine', label: 'Sine Wave', description: 'Smooth, natural oscillation' },
      { value: 'square', label: 'Square Wave', description: 'Sharp, digital-style transitions' },
      { value: 'sawtooth', label: 'Sawtooth Wave', description: 'Linear ramping pattern' },
      { value: 'triangle', label: 'Triangle Wave', description: 'Smooth triangular pattern' }
    ]
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
    icon: Droplets
  }
];

export function VisualizationType({ settings, onSettingChange }: VisualizationTypeProps) {
  const { toast } = useToast();

  const handleWaveTypeChange = (type: string) => {
    onSettingChange('waveType', type);
    toast({
      title: "Wave Type Updated",
      description: `Switched to ${type} wave pattern`,
    });
  };

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
                  {type.value === 'wave' && settings.barType === 'wave' && type.subtypes && (
                    <div className="pl-8 mt-2 space-y-2">
                      {type.subtypes.map(subtype => (
                        <div
                          key={subtype.value}
                          className={`
                            flex items-center gap-2 p-2 rounded-md cursor-pointer
                            ${settings.waveType === subtype.value ? 'bg-accent' : 'hover:bg-accent/50'}
                          `}
                          onClick={() => handleWaveTypeChange(subtype.value)}
                        >
                          <div className="text-sm font-medium">{subtype.label}</div>
                          <p className="text-xs text-muted-foreground">{subtype.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
