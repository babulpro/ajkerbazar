import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, UNIT_BN } from "@/lib/product";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ---------- Page shell ---------- */

export default function ProductDetailPage({ params }: Props) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8">
      <Suspense fallback={<DetailSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}

/* ---------- Async content ---------- */

async function ProductContent({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const { dir, pct } = product.change;
  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const changeColor =
    dir === "up"
      ? "text-red-600"
      : dir === "down"
      ? "text-green-600"
      : "text-default-500";
  const unitBn = UNIT_BN[product.unit] ?? product.unit;

  // difference vs yesterday
  const diff = Math.abs(product.today - product.yesterday);
  const compareText =
    dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে`
      : dir === "down"
      ? `গতকালের তুলনায় আজ দাম কমেছে`
      : `গতকালের তুলনায় আজ দাম অপরিবর্তিত`;

  return (
    <>
      {/* ---------- Header card ---------- */}
      <div className="flex flex-col gap-5 rounded-2xl border border-separator bg-background p-6 sm:flex-row sm:items-start sm:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-default-100 text-3xl">
            {product.categoryIcon}
          </span>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold leading-tight text-foreground">
              {product.nameBn}
            </h1>
            <p className="mt-1 text-sm text-default-600">
              প্রতি {unitBn}: {product.categoryNameBn}
            </p>
            <p className="mt-2 text-xs text-default-500">
              {compareText}{" "}
              <span className={`font-semibold ${changeColor}`}>
                {arrow} {diff} টাকা
              </span>
            </p>
          </div>
        </div>

        {/* Right: today's price box */}
        <div className="flex shrink-0 flex-col items-center gap-1 rounded-xl bg-default-50 px-6 py-4 sm:min-w-[140px]">
          <span className="text-xs text-default-500">আজকের দাম</span>
          <span className="text-3xl font-extrabold leading-none text-foreground">
            {product.today}
          </span>
          <span className="text-xs text-default-500">
            টাকা / {unitBn}
          </span>
          <span
            className={`mt-1 flex items-center gap-0.5 text-sm font-bold ${changeColor}`}
          >
            <span className="text-[10px] leading-none">{arrow}</span>
            {Math.abs(pct).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* ---------- Price review ---------- */}
      <h2 className="mt-8 text-base font-bold text-foreground">
        দামের পর্যালোচনা
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <PriceReviewCard
          label="গতকালের দাম"
          value={product.yesterday}
          sub="সর্বনিম্ন বাজার"
          variant="neutral"
        />
        <PriceReviewCard
          label="সাপ্তাহিক দাম"
          value={product.lastWeek}
          sub="সর্বোচ্চ বাজার"
          variant="danger"
        />
        <PriceReviewCard
          label="মাসিক দাম"
          value={product.lastMonth}
          sub={`প্রতি ${unitBn}-এর হিসাব`}
          variant="success"
        />
      </div>

      {/* ---------- Market-wise prices ---------- */}
      <h2 className="mt-8 text-base font-bold text-foreground">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-separator bg-background">
        <table className="w-full text-sm">
          <thead className="bg-default-50">
            <tr className="text-left text-xs text-default-500">
              <th className="px-5 py-3 font-medium">বাজার</th>
              <th className="px-5 py-3 font-medium">বিভাগ</th>
              <th className="px-5 py-3 text-right font-medium">সর্বনিম্ন</th>
              <th className="px-5 py-3 text-right font-medium">সর্বোচ্চ</th>
              <th className="px-5 py-3 text-right font-medium">গড়</th>
            </tr>
          </thead>
          <tbody>
            {product.markets.map((m, i) => {
              const avg = ((m.min + m.max) / 2).toFixed(0);
              return (
                <tr
                  key={`${m.market}-${i}`}
                  className="border-t border-separator"
                >
                  <td className="px-5 py-3 font-medium text-foreground">
                    {m.market}
                  </td>
                  <td className="px-5 py-3 text-default-600">
                    {m.division}
                  </td>
                  <td className="px-5 py-3 text-right text-foreground">
                    {m.min} টাকা
                  </td>
                  <td className="px-5 py-3 text-right text-foreground">
                    {m.max} টাকা
                  </td>
                  <td className="px-5 py-3 text-right font-semibold text-foreground">
                    {avg} টাকা
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ---------- Back link ---------- */}
      <div className="mt-8">
        <Link
          href={`/category/${product.category}`}
          className="text-sm font-medium text-green-700 hover:underline"
        >
          ← {product.categoryNameBn} ক্যাটাগরিতে ফিরে যান
        </Link>
      </div>
    </>
  );
}

/* ---------- Price review card ---------- */

function PriceReviewCard({
  label,
  value,
  sub,
  variant,
}: {
  label: string;
  value: number;
  sub: string;
  variant: "neutral" | "danger" | "success";
}) {
  const labelColor =
    variant === "danger"
      ? "text-red-600"
      : variant === "success"
      ? "text-green-700"
      : "text-foreground";

  const valueColor =
    variant === "danger"
      ? "text-red-600"
      : variant === "success"
      ? "text-green-700"
      : "text-foreground";

  const dotBg =
    variant === "danger"
      ? "bg-red-600"
      : variant === "success"
      ? "bg-green-700"
      : "bg-default-400";

  return (
    <div className="rounded-xl border border-separator bg-background p-4">
      <p className={`text-sm font-semibold ${labelColor}`}>{label}</p>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`grid h-6 w-6 place-items-center rounded-full text-white ${dotBg}`}
        >
          <span className="text-[10px]">৳</span>
        </span>
        <span className={`text-2xl font-bold ${valueColor}`}>
          {value} টাকা
        </span>
      </div>

      <p className="mt-2 text-[11px] text-default-500">{sub}</p>
    </div>
  );
}

/* ---------- Skeleton ---------- */

function DetailSkeleton() {
  return (
    <>
      <div className="h-32 animate-pulse rounded-2xl bg-default-100" />
      <div className="mt-8 h-5 w-40 animate-pulse rounded bg-default-100" />
      <div className="mt-3 grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl bg-default-100"
          />
        ))}
      </div>
      <div className="mt-8 h-5 w-56 animate-pulse rounded bg-default-100" />
      <div className="mt-3 h-72 animate-pulse rounded-xl bg-default-100" />
    </>
  );
}