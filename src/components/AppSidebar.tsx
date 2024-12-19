import { Settings2, Menu } from "lucide-react"
import { ChromePicker } from 'react-color'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface AppSidebarProps {
  settings: {
    intensity: number;
    speed: number;
    glitchAmount: number;
    barType: string;
  };
  onSettingsChange: (settings: any) => void;
  background: string;
  onBackgroundChange: (color: string) => void;
}

export function AppSidebar({ settings, onSettingsChange, background, onBackgroundChange }: AppSidebarProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSettingChange = (key: string, value: number | string) => {
    onSettingsChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <Sidebar variant="floating" className="z-50">
      <SidebarHeader className="flex items-center justify-between p-4">
        <span className="text-lg font-semibold flex items-center gap-2">
          <Settings2 className="w-5 h-5" />
          Controls
        </span>
        <SidebarTrigger>
          <Menu className="w-5 h-5" />
        </SidebarTrigger>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Visualization Settings</SidebarGroupLabel>
          <SidebarGroupContent className="space-y-4 p-4">
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
                  <SelectItem value="circular">Circular</SelectItem>
                  <SelectItem value="wave">Wave</SelectItem>
                  <SelectItem value="blocks">Blocks</SelectItem>
                  <SelectItem value="particles">Particles</SelectItem>
                  <SelectItem value="particleBurst">Particle Burst</SelectItem>
                  <SelectItem value="ripple">Ripple</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Intensity</label>
              <Slider
                value={[settings.intensity]}
                onValueChange={([value]) => handleSettingChange("intensity", value)}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Speed</label>
              <Slider
                value={[settings.speed]}
                onValueChange={([value]) => handleSettingChange("speed", value)}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
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
                className="w-full"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Color Settings</SidebarGroupLabel>
          <SidebarGroupContent className="p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Background Color</label>
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}