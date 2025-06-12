import { motion } from "framer-motion";
import { Award, Calendar } from "lucide-react";
import Image from "next/image";
import { Certification } from "./types";

export default function CertificationCard({
  certification,
  onClick,
}: {
  certification: Certification;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-4"
      whileHover={{ y: -5 }}
    >
      <div
        className="h-full flex flex-col border border-border/50 group hover:border-primary rounded-xl bg-card/50 backdrop-blur-sm transition-shadow cursor-pointer"
        onClick={onClick}
      >
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
          <Image
            src={certification.imagePath || "/placeholder.svg"}
            alt={certification.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary">
            {certification.title}
          </h3>

          <div className="flex items-center text-muted-foreground mb-2">
            <Award className="h-4 w-4 mr-2" />
            <span>{certification.organization}</span>
          </div>

          <div className="flex items-center text-muted-foreground mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {new Date(certification.issueDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <p className="text-muted-foreground line-clamp-3 mt-auto">
            {certification.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
