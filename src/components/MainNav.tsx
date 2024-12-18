import { Button } from "@/components/ui/button";
import { VideoIcon, LogInIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MainNav = () => {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Coming Soon",
      description: "Video export functionality will be available soon!",
    });
  };

  const handleLogin = () => {
    toast({
      title: "Coming Soon",
      description: "Login functionality will be available soon!",
    });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel m-4 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Soundscape Dreamworld</h1>
      <div className="flex gap-4">
        <Button variant="outline" onClick={handleExport}>
          <VideoIcon className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" onClick={handleLogin}>
          <LogInIcon className="w-4 h-4 mr-2" />
          Login
        </Button>
      </div>
    </nav>
  );
};

export default MainNav;