import { useState } from "react";
import { Settings2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChromePicker } from 'react-color';
import type { VisualizerSettings } from "@/types/visualizer";

interface VisualizerSettingsModalProps {
  settings: VisualizerSettings;
  onSettingsChange: (settings: VisualizerSettings) => void;
  background: string;
  onBackgroundChange: (color: string) => void;
}

export function VisualizerSettingsModal({
  settings,
  onSettingsChange,
  background,
  onBackgroundChange,
}: VisualizerSettingsModalProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSettingChange = (key: keyof VisualizerSettings, value: number | string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 right-4 z-50 hover:bg-primary/20"
        >
          <Settings2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Visualizer Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="visualization" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
            <TabsTrigger value="export">Export</TabsTrigger>
          </TabsList>

          <TabsContent value="visualization" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Visualization Type</label>
                <Select
                  value={settings.barType}
                  onValueChange={(value) => handleSettingChange("barType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select visualization type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Bars</SelectItem>
                    <SelectItem value="circular">Circular Bars</SelectItem>
                    <SelectItem value="wave">Wave Bars</SelectItem>
                    <SelectItem value="blocks">Block Bars</SelectItem>
                    <SelectItem value="line">Line Bars</SelectItem>
                    <SelectItem value="imagelogo">Image/Logo</SelectItem>
                    <SelectItem value="3dtext">3D Text</SelectItem>
                    <SelectItem value="cube">3D Cube</SelectItem>
                    <SelectItem value="sphere">3D Sphere</SelectItem>
                    <SelectItem value="ring">3D Ring</SelectItem>
                    <SelectItem value="patterns">Patterns</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Size X (px)</label>
                <Slider
                  value={[settings.sizeX || 500]}
                  onValueChange={([value]) => handleSettingChange("sizeX", value)}
                  min={0}
                  max={1000}
                  step={1}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Size Y (px)</label>
                <Slider
                  value={[settings.sizeY || 500]}
                  onValueChange={([value]) => handleSettingChange("sizeY", value)}
                  min={0}
                  max={1000}
                  step={1}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Color Scheme</label>
                <Select
                  value={settings.colorScheme}
                  onValueChange={(value) => handleSettingChange("colorScheme", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (#9f7aea)</SelectItem>
                    <SelectItem value="neon">Neon</SelectItem>
                    <SelectItem value="sunset">Sunset</SelectItem>
                    <SelectItem value="monochrome">Monochrome</SelectItem>
                    <SelectItem value="rainbow">Rainbow</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="glass">Glass</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Custom Color</label>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  style={{ backgroundColor: background }}
                >
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
                      onChange={(color) => onBackgroundChange(color.hex)}
                    />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bass Intensity</label>
                <Slider
                  value={[settings.intensity]}
                  onValueChange={([value]) => handleSettingChange("intensity", value)}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Bass Speed</label>
                <Slider
                  value={[settings.speed]}
                  onValueChange={([value]) => handleSettingChange("speed", value)}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Glitch Amount</label>
                <Slider
                  value={[settings.glitchAmount]}
                  onValueChange={([value]) => handleSettingChange("glitchAmount", value)}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Zoom Speed</label>
                <Slider
                  value={[settings.zoomSpeed || 0.5]}
                  onValueChange={([value]) => handleSettingChange("zoomSpeed", value)}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Zoom Intensity</label>
                <Slider
                  value={[settings.zoomIntensity || 0.3]}
                  onValueChange={([value]) => handleSettingChange("zoomIntensity", value)}
                  min={0}
                  max={1}
                  step={0.01}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <div className="space-y-4">
              <Button className="w-full" variant="outline">
                Export HD (1080p)
              </Button>
              <Button className="w-full" variant="outline">
                Export 4K
              </Button>
              <div className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  Save Preset
                </Button>
                <Button className="flex-1" variant="outline">
                  Load Preset
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
