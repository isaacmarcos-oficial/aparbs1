"use client";
import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { ImageDown } from "lucide-react";

interface FileInputProps {
  onChange: (file: File | null, url?: string) => void;
  initialImageUrl?: string | null;
}

export function ImageUploader({ onChange, initialImageUrl }: FileInputProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl ?? null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewUrl(result);
      onChange(file, result);
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (initialImageUrl) {
      setPreviewUrl(initialImageUrl);
    }
  }, [initialImageUrl]);

  return (
    <div>
      <div
        className={`flex aspect-square min-h-40 justify-center border border-dashed rounded-lg p-4 text-center w-full border-gray-300 items-center ${
          isDragging ? "border-indigo-600 bg-indigo-50" : ""
        }`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col justify-center text-sm leading-6 text-gray-600 gap-2">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Preview"
              height={200}
              width={200}
              className="rounded-md shadow-md object-contain mx-auto"
            />
          ) : (
            <ImageDown className="mx-auto h-12 w-12 text-gray-300" />
          )}

          <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
            <Label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500"
            >
              <span>Clique aqui</span>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Label>
            <p>ou arraste para cá</p>
          </div>
          <p className="text-xs text-center text-gray-400">
            PNG, JPG, GIF até 10MB
          </p>
        </div>
      </div>
    </div>
  );
}