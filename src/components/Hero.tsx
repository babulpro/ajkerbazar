import Image from "next/image";
import Link from "next/link";

const bnDateFormatter = new Intl.DateTimeFormat("bn-BD", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function Hero() {
  // Formatted on the server at render time.
  const today = bnDateFormatter.format(new Date());

  return (
    <section className="mx-auto w-full max-w-5xl px-6">
      <div className="overflow-hidden rounded-2xl border border-separator bg-default-50/50">
        <div className="grid items-center gap-6 p-6 sm:p-10 md:grid-cols-[1.3fr_1fr]">
          {/* Left: text content */}
          <div>
            {/* Bengali date */}
            <p className="mb-3 text-sm font-medium text-green-700">
              {today}
            </p>

            {/* Headline */}
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-default-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও দুধসহ দৈনন্দিন প্রয়োজনীয়
              পণ্যের আজকের বাজারদর এক জায়গায়।
            </p>

            {/* CTA button */}
            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-lg border-2 border-green-600 px-5 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              বাজার দেখুন
            </Link>
          </div>

          {/* Right: hero illustration */}
          <div className="flex justify-center md:justify-end">
            <Image
              src="/bazar-hero.png"
              alt="আজকের বাজারের তাজা সবজি"
              width={420}
              height={320}
              priority
              className="h-auto w-56 object-contain sm:w-72 md:w-full md:max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
}