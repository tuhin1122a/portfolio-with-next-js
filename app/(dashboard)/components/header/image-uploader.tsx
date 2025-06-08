// src/components/shared/image-uploader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadProfileImage } from "@/lib/api";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface ImageUploaderProps {
  currentImageUrl: string;
  onUploadSuccess: (url: string) => void;
}

export default function ImageUploader({
  currentImageUrl,
  onUploadSuccess,
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { url } = await uploadProfileImage(formData);
      onUploadSuccess(url);
      toast.success("Image uploaded!");
    } catch (error) {
      toast.error("Image upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 border rounded-full overflow-hidden">
          <Image
            src={preview || currentImageUrl || "/placeholder.svg"}
            alt="Profile Preview"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <Input type="file" accept="image/*" onChange={handleFileChange} />
          <Button
            type="button"
            onClick={handleUpload}
            disabled={!file || isUploading}
            className="w-full"
          >
            {isUploading ? (
              "Uploading..."
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" /> Upload Image
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
