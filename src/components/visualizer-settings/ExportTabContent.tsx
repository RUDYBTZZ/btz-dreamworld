import { Button } from "@/components/ui/button";

export function ExportTabContent() {
  return (
    <div className="space-y-4">
      <Button className="w-full" variant="outline">
        Export HD (1080p)
      </Button>
      <Button className="w-full" variant="outline">
        Export 4K
      </Button>
      <div className="flex gap-2">
        <Button className="flex-1" variant="outline">
          Save Preset
        </Button>
        <Button className="flex-1" variant="outline">
          Load Preset
        </Button>
      </div>
    </div>
  );
}