// app/loading.tsx — Next.js App Router use korle
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500" />
    </div>
  );
}
