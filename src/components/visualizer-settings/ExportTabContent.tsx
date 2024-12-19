import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Download, Save, Upload, Share2, Film, Camera, Copy } from "lucide-react";

export function ExportTabContent() {
  const [exportQuality, setExportQuality] = useState("1080p");
  const [exportFormat, setExportFormat] = useState("mp4");
  const [exportDuration, setExportDuration] = useState("30");
  const { toast } = useToast();

  const handleExport = () => {
    console.log("Starting export with settings:", { exportQuality, exportFormat, exportDuration });
    toast({
      title: "Starting Export",
      description: `Preparing ${exportQuality} ${exportFormat.toUpperCase()} export...`,
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
    console.log("Saving current preset");
    toast({
      title: "Preset Saved",
      description: "Your current settings have been saved as a preset",
    });
  };

  const handleLoadPreset = () => {
    console.log("Loading preset");
    toast({
      title: "Preset Loaded",
      description: "Settings have been loaded from your preset",
    });
  };

  const handleShare = () => {
    console.log("Preparing to share");
    const shareUrl = "https://example.com/share/xyz123"; // This would be dynamic
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Share Link Created",
        description: "Share link has been copied to clipboard!",
      });
    });
  };

  const handleScreenshot = () => {
    console.log("Taking screenshot");
    toast({
      title: "Screenshot Captured",
      description: "Screenshot has been saved to your downloads",
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
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
              <SelectItem value="2k">2K QHD</SelectItem>
              <SelectItem value="4k">4K Ultra HD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Export Format</label>
          <Select
            value={exportFormat}
            onValueChange={setExportFormat}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select export format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mp4">MP4 Video</SelectItem>
              <SelectItem value="gif">GIF Animation</SelectItem>
              <SelectItem value="webm">WebM Video</SelectItem>
              <SelectItem value="mov">QuickTime MOV</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (seconds)</label>
          <Select
            value={exportDuration}
            onValueChange={setExportDuration}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 seconds</SelectItem>
              <SelectItem value="30">30 seconds</SelectItem>
              <SelectItem value="60">60 seconds</SelectItem>
              <SelectItem value="120">2 minutes</SelectItem>
              <SelectItem value="full">Full Song</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Button 
          className="w-full" 
          onClick={handleExport}
        >
          <Film className="w-4 h-4 mr-2" />
          Export {exportQuality} {exportFormat.toUpperCase()}
        </Button>

        <Button 
          variant="outline"
          className="w-full"
          onClick={handleScreenshot}
        >
          <Camera className="w-4 h-4 mr-2" />
          Take Screenshot
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline"
          onClick={handleSavePreset}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Preset
        </Button>
        <Button 
          variant="outline"
          onClick={handleLoadPreset}
          className="w-full"
        >
          <Upload className="w-4 h-4 mr-2" />
          Load Preset
        </Button>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleShare}
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Visualization
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast({
            title: "URL Copied",
            description: "Current visualization URL copied to clipboard",
          });
        }}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy URL
      </Button>
    </div>
  );
}