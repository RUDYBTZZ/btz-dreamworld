import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChromePicker } from 'react-color';
import { useState } from "react";
import { Palette, Wand2 } from "lucide-react";
import type { VisualizerSettings } from "@/types/visualizer";

const PRESET_GRADIENTS = [
  "linear-gradient(to right, #ee9ca7, #ffdde1)",
  "linear-gradient(to right, #243949 0%, #517fa4 100%)",
  "linear-gradient(to top, #e6b980 0%, #eacda3 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
  "linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)",
  "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
];

interface ColorsTabContentProps {
  settings: VisualizerSettings;
  onSettingChange: (key: keyof VisualizerSettings, value: number | string) => void;
  background: string;
  onBackgroundChange: (color: string) => void;
}

export function ColorsTabContent({ 
  settings, 
  onSettingChange,
  background,
  onBackgroundChange
}: ColorsTabContentProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const { toast } = useToast();

  const handleColorSchemeChange = (scheme: string) => {
    onSettingChange("colorScheme", scheme);
    toast({
      title: "Color Scheme Updated",
      description: `Switched to ${scheme} color scheme`,
    });
  };

  const handleGradientSelect = (gradient: string) => {
    onBackgroundChange(gradient);
    toast({
      title: "Gradient Applied",
      description: "Background gradient updated successfully",
    });
  };

  const randomizeColors = () => {
    const schemes = ["default", "neon", "sunset", "rainbow", "monochrome", "gradient", "glass"];
    const randomScheme = schemes[Math.floor(Math.random() * schemes.length)];
    const randomGradient = PRESET_GRADIENTS[Math.floor(Math.random() * PRESET_GRADIENTS.length)];
    
    handleColorSchemeChange(randomScheme);
    handleGradientSelect(randomGradient);
    
    toast({
      title: "Colors Randomized",
      description: "New random color scheme applied",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium">Color Settings</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={randomizeColors}
          className="flex items-center gap-2"
        >
          <Wand2 className="w-4 h-4" />
          Randomize
        </Button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Color Scheme</label>
        <Select
          value={settings.colorScheme}
          onValueChange={handleColorSchemeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select color scheme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default (#9f7aea)</SelectItem>
            <SelectItem value="neon">Neon</SelectItem>
            <SelectItem value="sunset">Sunset</SelectItem>
            <SelectItem value="rainbow">Rainbow</SelectItem>
            <SelectItem value="monochrome">Monochrome</SelectItem>
            <SelectItem value="gradient">Gradient</SelectItem>
            <SelectItem value="glass">Glass</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Gradient Presets</label>
        <div className="grid grid-cols-2 gap-2">
          {PRESET_GRADIENTS.map((gradient, index) => (
            <button
              key={index}
              className="h-20 rounded transition-all hover:scale-105 border border-white/20"
              style={{ background: gradient }}
              onClick={() => handleGradientSelect(gradient)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Custom Color</label>
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2"
          onClick={() => setShowColorPicker(!showColorPicker)}
          style={{ backgroundColor: background }}
        >
          <Palette className="w-4 h-4" />
          {background}
        </Button>
        {showColorPicker && (
          <div className="absolute z-50">
            <div 
              className="fixed inset-0" 
              onClick={() => setShowColorPicker(false)} 
            />
            <ChromePicker 
              color={background}
              onChange={(color) => {
                onBackgroundChange(color.hex);
                toast({
                  title: "Color Updated",
                  description: `Background color changed to ${color.hex}`,
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}