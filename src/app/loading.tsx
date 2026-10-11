export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8">
      {/* Hero skeleton */}
      <div className="grid gap-6 rounded-2xl border border-separator bg-default-50/50 p-6 sm:p-10 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-3">
          <div className="h-4 w-40 animate-pulse rounded bg-default-200" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-default-200" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-default-200" />
          <div className="h-4 w-full animate-pulse rounded bg-default-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-default-200" />
          <div className="h-10 w-32 animate-pulse rounded-lg bg-default-200" />
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="h-48 w-56 animate-pulse rounded-2xl bg-default-200 sm:w-72" />
        </div>
      </div>

      {/* Marquee skeleton */}
      <div className="mt-8 h-12 animate-pulse rounded-xl bg-default-100" />

      {/* Category grid skeleton */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-xl bg-default-100"
          />
        ))}
      </div>

      {/* Section title skeleton */}
      <div className="mt-10 h-6 w-40 animate-pulse rounded bg-default-200" />

      {/* Product grid skeleton */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl bg-default-100"
          />
        ))}
      </div>
    </div>
  );
}