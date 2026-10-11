import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* Icon */}
      <div className="grid h-24 w-24 place-items-center rounded-full bg-default-100 text-5xl">
        🔍
      </div>

      {/* 404 badge */}
      <p className="mt-6 text-6xl font-extrabold tracking-tight text-green-700">
        404
      </p>

      {/* Heading */}
      <h1 className="mt-3 text-2xl font-bold text-foreground">
        Page Not Found
      </h1>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm leading-relaxed text-default-500">
        The page you're looking for doesn't exist, has been removed, or the
        link may be broken. Use the buttons below to get back on track.
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-green-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2"
        >
          Back to Home
        </Link>

        <Link
          href="/products"
          className="rounded-lg border border-separator px-6 py-2.5 text-sm font-semibold text-foreground transition hover:bg-default-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Browse Products
        </Link>
      </div>

      {/* Footer hint */}
      <p className="mt-10 text-xs text-default-400">
        BazarDor — Daily market prices at a glance
      </p>
    </div>
  );
}