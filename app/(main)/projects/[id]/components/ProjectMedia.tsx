import Image from "next/image";

type ProjectMediaProps = {
  title: string;
  mainImage: string;
};

export default function ProjectMedia({ title, mainImage }: ProjectMediaProps) {
  return (
    <div className="rounded-lg overflow-hidden border border-border/50 shadow-lg">
      <Image
        src={mainImage || "/placeholder.svg?height=600&width=800"}
        alt={title}
        width={800}
        height={600}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
