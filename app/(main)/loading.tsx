import Preloader from "@/components/home/Preloader";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-400 text-white transition-opacity duration-700">
      <Preloader />
    </div>
  );
}
