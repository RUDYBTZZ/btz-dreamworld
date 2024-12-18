import { useState } from "react";
import { Palette, Image, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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

interface BackgroundControlsProps {
  onBackgroundChange: (background: string) => void;
}

const BackgroundControls = ({ onBackgroundChange }: BackgroundControlsProps) => {
  const [activeTab, setActiveTab] = useState("color");
  const [selectedColor, setSelectedColor] = useState("#9f7aea");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    onBackgroundChange(color);
  };

  const handleGradientSelect = (gradient: string) => {
    onBackgroundChange(gradient);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onBackgroundChange(`url(${imageUrl})`);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="glass-panel p-4">
        <TabsList className="grid w-full grid-cols-3 gap-2">
          <TabsTrigger value="color" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Color
          </TabsTrigger>
          <TabsTrigger value="gradient" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Gradient
          </TabsTrigger>
          <TabsTrigger value="image" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Image
          </TabsTrigger>
        </TabsList>

        <TabsContent value="color" className="mt-4">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-full h-10 cursor-pointer rounded"
          />
        </TabsContent>

        <TabsContent value="gradient" className="mt-4">
          <div className="grid grid-cols-2 gap-2">
            {PRESET_GRADIENTS.map((gradient, index) => (
              <button
                key={index}
                className={cn(
                  "h-10 rounded transition-all hover:scale-105",
                  "border border-white/20"
                )}
                style={{ background: gradient }}
                onClick={() => handleGradientSelect(gradient)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="image" className="mt-4">
          <label className="upload-zone flex flex-col items-center justify-center gap-2">
            <Upload className="w-6 h-6" />
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundControls;