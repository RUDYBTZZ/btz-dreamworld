import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ExportTabContent() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your visualization will be exported shortly",
    });
    // Export functionality will be implemented in a future update
  };

  const handleShare = () => {
    toast({
      title: "Share Feature",
      description: "Sharing functionality will be available soon",
    });
    // Share functionality will be implemented in a future update
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Export Options</h3>
        <p className="text-sm text-muted-foreground">
          Export your visualization as a video or share it with others.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleExport}
        >
          <Download className="w-4 h-4" />
          Export as Video
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Export Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure your export settings here. More options coming soon.
        </p>
      </div>
    </div>
  );
}