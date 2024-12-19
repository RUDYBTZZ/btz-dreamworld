import React, { useState } from 'react';
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AudioUploaderProps {
  onAudioLoad: (file: File) => void;
}

const AudioUploader = ({ onAudioLoad }: AudioUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file (MP3, WAV, etc.)",
        variant: "destructive",
      });
      return;
    }
    onAudioLoad(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUploadClick = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div
      className={`upload-zone flex items-center justify-center gap-2 ${isDragging ? 'dragging' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleUploadClick}
    >
      <Upload className="w-6 h-6 text-primary" />
      <div className="flex flex-col">
        <p className="text-sm font-medium">Drop your audio file here</p>
        <p className="text-xs text-muted-foreground">or click to browse</p>
      </div>
      <input
        type="file"
        className="hidden"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
      />
    </div>
  );
};

export default AudioUploader;