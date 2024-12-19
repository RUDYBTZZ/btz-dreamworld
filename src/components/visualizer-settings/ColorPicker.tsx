import { Button } from "@/components/ui/button";
import { ChromePicker } from 'react-color';
import { useState } from "react";

interface ColorPickerProps {
  background: string;
  onBackgroundChange: (color: string) => void;
}

export function ColorPicker({ background, onBackgroundChange }: ColorPickerProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
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
  );
}