import { useState } from "react";
import { Palette, Image, Upload, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import type { BackgroundType } from "@/types/background";

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

const BACKGROUND_TYPES: { label: string; value: BackgroundType }[] = [
  { label: "Color", value: "color" },
  { label: "Image", value: "image" },
  { label: "Particles", value: "particles" },
  { label: "Space Wave", value: "spaceWave" },
  { label: "Glass Circuit", value: "glassCircuit" },
  { label: "Patterns", value: "patterns" },
  { label: "Turbulent Light", value: "turbulentLight" },
  { label: "Vinyl & Particles", value: "vinylAndParticles" },
  { label: "Space Waves", value: "spaceWaves" },
  { label: "The City", value: "theCity" },
  { label: "Cosmic Clouds", value: "cosmicClouds" },
  { label: "80s ASCII", value: "the80sOnASCII" },
  { label: "Wet Fuzzy Disco", value: "wetFuzzyDisco" },
  { label: "I See Sound", value: "iSeeSound" },
  { label: "Amiga", value: "amiga" },
  { label: "Swarm", value: "swarm" },
];

interface BackgroundControlsProps {
  onBackgroundChange: (background: string) => void;
}

const BackgroundControls = ({ onBackgroundChange }: BackgroundControlsProps) => {
  const [activeTab, setActiveTab] = useState("color");
  const [selectedColor, setSelectedColor] = useState("#9f7aea");
  const { toast } = useToast();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    onBackgroundChange(color);
    toast({
      title: "Background Updated",
      description: "Color background has been applied",
    });
  };

  const handleGradientSelect = (gradient: string) => {
    onBackgroundChange(gradient);
    toast({
      title: "Background Updated",
      description: "Gradient background has been applied",
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        onBackgroundChange(`url(${imageUrl})`);
        toast({
          title: "Background Updated",
          description: "Image background has been applied",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundTypeSelect = (type: BackgroundType) => {
    console.log("Selected background type:", type);
    // For now, we'll use placeholder backgrounds
    const placeholderBackgrounds: Record<BackgroundType, string> = {
      color: selectedColor,
      image: "url(https://images.unsplash.com/photo-1518770660439-4636190af475)",
      particles: "linear-gradient(to right, #000000, #434343)",
      spaceWave: "linear-gradient(to right, #000428, #004e92)",
      glassCircuit: "linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)",
      patterns: "linear-gradient(to right, #3494e6, #ec6ead)",
      turbulentLight: "linear-gradient(to right, #136a8a, #267871)",
      vinylAndParticles: "linear-gradient(to right, #4b6cb7, #182848)",
      spaceWaves: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      theCity: "linear-gradient(to right, #232526, #414345)",
      cosmicClouds: "linear-gradient(to right, #ff0084, #33001b)",
      the80sOnASCII: "linear-gradient(to right, #000000, #434343)",
      wetFuzzyDisco: "linear-gradient(to right, #12c2e9, #c471ed, #f64f59)",
      iSeeSound: "linear-gradient(to right, #8e2de2, #4a00e0)",
      amiga: "linear-gradient(to right, #1e3c72, #2a5298)",
      swarm: "linear-gradient(to right, #780206, #061161)"
    };

    onBackgroundChange(placeholderBackgrounds[type]);
    toast({
      title: "Background Updated",
      description: `${type} background has been applied`,
    });
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="glass-panel p-4">
        <TabsList className="grid w-full grid-cols-4 gap-2">
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
          <TabsTrigger value="effects" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Effects
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
          <label className="upload-zone flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-white/20 rounded cursor-pointer">
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

        <TabsContent value="effects" className="mt-4">
          <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
            {BACKGROUND_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => handleBackgroundTypeSelect(type.value)}
                className="p-2 rounded bg-white/10 hover:bg-white/20 transition-colors"
              >
                {type.label}
              </button>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundControls;