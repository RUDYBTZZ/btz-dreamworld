import { Settings2 } from "lucide-react";
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