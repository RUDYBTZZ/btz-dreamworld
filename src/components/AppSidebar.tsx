import { ChromePicker } from 'react-color'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { useState } from "react"
import { Button } from "./ui/button"

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

  return (
    <Sidebar variant="floating" className="z-50">
      <SidebarHeader className="flex items-center justify-between p-4">
        <span className="text-lg font-semibold">Audio Player</span>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Background</SidebarGroupLabel>
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