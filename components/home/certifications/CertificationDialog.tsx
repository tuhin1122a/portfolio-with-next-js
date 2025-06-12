"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Award, Calendar, X } from "lucide-react";
import Image from "next/image";
import { Certification } from "./types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certification: Certification | null;
}

export default function CertificationDialog({
  open,
  onOpenChange,
  certification,
}: Props) {
  if (!certification) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay className="bg-black/30 backdrop-blur-sm" />
        <DialogContent className="p-0 bg-transparent max-w-[90vw]">
          <DialogTitle className="sr-only">{certification.title}</DialogTitle>

          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="absolute top-2 right-2 bg-background/80"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>

            <div className="relative w-full max-h-[80vh] aspect-[16/9]">
              <Image
                src={certification.imagePath}
                alt={certification.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="bg-background p-4 mt-2 w-full text-center">
              <h3 className="text-xl font-bold">{certification.title}</h3>
              <div className="flex justify-center items-center gap-4 text-muted-foreground text-sm mt-1">
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  {certification.organization}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(certification.issueDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
