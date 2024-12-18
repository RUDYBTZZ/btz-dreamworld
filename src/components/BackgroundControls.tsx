import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface BackgroundControlsProps {
  onBackgroundChange: (background: string) => void;
}

const BackgroundControls = ({ onBackgroundChange }: BackgroundControlsProps) => {
  const [selectedColor, setSelectedColor] = useState('#9f7aea');
  const { toast } = useToast();

  const gradients = [
    'linear-gradient(to right, #ee9ca7, #ffdde1)',
    'linear-gradient(to right, #d7d2cc 0%, #304352 100%)',
    'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)',
    'linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onBackgroundChange(`url(${event.target.result})`);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="glass-panel p-4 fixed top-4 right-4 w-80">
      <Tabs defaultValue="color">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="color" className="flex-1">Color</TabsTrigger>
          <TabsTrigger value="gradient" className="flex-1">Gradient</TabsTrigger>
          <TabsTrigger value="image" className="flex-1">Image</TabsTrigger>
        </TabsList>

        <TabsContent value="color" className="space-y-4">
          <div className="space-y-2">
            <Label>Select Color</Label>
            <Input
              type="color"
              value={selectedColor}
              onChange={(e) => {
                setSelectedColor(e.target.value);
                onBackgroundChange(e.target.value);
              }}
              className="w-full h-10"
            />
          </div>
        </TabsContent>

        <TabsContent value="gradient" className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {gradients.map((gradient, index) => (
              <Button
                key={index}
                className="h-20 w-full"
                style={{ background: gradient }}
                onClick={() => onBackgroundChange(gradient)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="image" className="space-y-4">
          <div
            className="upload-zone"
            onClick={() => document.getElementById('bg-image-upload')?.click()}
          >
            <Upload className="w-8 h-8 mx-auto mb-2 text-primary" />
            <p>Upload background image</p>
            <input
              id="bg-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundControls;