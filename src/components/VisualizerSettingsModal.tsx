import { Settings2, Sliders, Palette, Image, Sparkles, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { VisualizerSettings } from "@/types/visualizer";
import { VisualizationTabContent } from "./visualizer-settings/VisualizationTabContent";
import { ColorsTabContent } from "./visualizer-settings/ColorsTabContent";
import { BackgroundTabContent } from "./visualizer-settings/BackgroundTabContent";
import { EffectsTabContent } from "./visualizer-settings/EffectsTabContent";
import { ExportTabContent } from "./visualizer-settings/ExportTabContent";

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
          variant="outline"
          size="icon"
          className="fixed top-6 right-6 z-[100] rounded-full w-12 h-12 bg-background/80 backdrop-blur-sm border-2 hover:bg-primary/20 hover:border-primary transition-all duration-300 shadow-lg"
        >
          <Settings2 className="h-6 w-6 text-foreground hover:text-primary animate-[spin_3s_linear_infinite]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Visualizer Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="visualization" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="visualization" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Visualization
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="background" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Background
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Effects
            </TabsTrigger>
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visualization" className="space-y-4">
            <VisualizationTabContent 
              settings={settings}
              onSettingChange={handleSettingChange}
            />
          </TabsContent>

          <TabsContent value="colors" className="space-y-4">
            <ColorsTabContent 
              settings={settings}
              onSettingChange={handleSettingChange}
              background={background}
              onBackgroundChange={onBackgroundChange}
            />
          </TabsContent>

          <TabsContent value="background" className="space-y-4">
            <BackgroundTabContent 
              background={background}
              onBackgroundChange={onBackgroundChange}
            />
          </TabsContent>

          <TabsContent value="effects" className="space-y-4">
            <EffectsTabContent 
              settings={settings}
              onSettingChange={handleSettingChange}
            />
          </TabsContent>

          <TabsContent value="export" className="space-y-4">
            <ExportTabContent />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}