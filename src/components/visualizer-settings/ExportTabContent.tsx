import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Download, Save, Upload } from "lucide-react";

export function ExportTabContent() {
  const [exportQuality, setExportQuality] = useState("1080p");
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Starting Export",
      description: `Preparing ${exportQuality} export...`,
    });
    // Export logic would go here
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your visualization has been exported successfully!",
      });
    }, 2000);
  };

  const handleSavePreset = () => {
    toast({
      title: "Preset Saved",
      description: "Your current settings have been saved as a preset",
    });
  };

  const handleLoadPreset = () => {
    toast({
      title: "Preset Loaded",
      description: "Settings have been loaded from your preset",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">Export Quality</label>
        <Select
          value={exportQuality}
          onValueChange={setExportQuality}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select export quality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="720p">HD (720p)</SelectItem>
            <SelectItem value="1080p">Full HD (1080p)</SelectItem>
            <SelectItem value="4k">4K Ultra HD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button 
        className="w-full" 
        onClick={handleExport}
      >
        <Download className="w-4 h-4 mr-2" />
        Export {exportQuality}
      </Button>

      <div className="flex gap-2">
        <Button 
          className="flex-1" 
          variant="outline"
          onClick={handleSavePreset}
        >
          <Save className="w-4 h-4 mr-2" />
          Save Preset
        </Button>
        <Button 
          className="flex-1" 
          variant="outline"
          onClick={handleLoadPreset}
        >
          <Upload className="w-4 h-4 mr-2" />
          Load Preset
        </Button>
      </div>
    </div>
  );
}