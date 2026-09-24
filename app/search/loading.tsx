export default function Loading() {
  return (
    <div
      aria-hidden
      className="grid grid-cols-2 gap-px border border-border-l bg-border-l lg:grid-cols-3"
    >
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="bg-white">
            <div className="animate-pulse aspect-square w-full bg-black/[0.03]" />
            <div className="border-t border-border-l px-4 py-4">
              <div className="animate-pulse h-3 w-3/4 bg-black/[0.03]" />
              <div className="animate-pulse mt-3 h-3 w-1/3 bg-black/[0.03]" />
            </div>
          </div>
        ))}
    </div>
  );
}
