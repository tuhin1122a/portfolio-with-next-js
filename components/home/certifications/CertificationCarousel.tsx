"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import CertificationCard from "./CertificationCard";
import CertificationDialog from "./CertificationDialog";
import { Certification } from "./types";

interface Props {
  certifications: Certification[];
}

export default function CertificationCarousel({ certifications }: Props) {
  const [selected, setSelected] = useState<Certification | null>(null);
  const [open, setOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000 }),
  ]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <motion.div
      className="relative mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {certifications.map((cert) => (
            <CertificationCard
              key={cert._id}
              certification={cert}
              onClick={() => {
                setSelected(cert);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      <motion.button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-primary p-3 rounded-full z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>
      <motion.button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background text-primary p-3 rounded-full z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      <CertificationDialog
        open={open}
        onOpenChange={setOpen}
        certification={selected}
      />
    </motion.div>
  );
}
