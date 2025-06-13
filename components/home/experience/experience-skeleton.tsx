export default function ExperienceSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-card/40 border border-border rounded-2xl p-6 md:p-8 shadow-md"
        >
          <div className="grid md:grid-cols-[1fr_2.5fr] gap-8">
            {/* Left Column (meta) */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-muted/30" />
                <div className="w-24 h-6 rounded-full bg-muted/30" />
              </div>
              <div className="space-y-2">
                <div className="w-2/3 h-6 bg-muted/30 rounded" />
                <div className="w-1/2 h-5 bg-muted/20 rounded" />
                <div className="w-24 h-6 bg-muted/20 rounded-full" />
              </div>
            </div>

            {/* Right Column (description & tags) */}
            <div className="space-y-6">
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="w-full h-4 bg-muted/20 rounded" />
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="w-16 h-6 bg-muted/20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
