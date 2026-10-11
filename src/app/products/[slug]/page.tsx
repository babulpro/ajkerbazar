import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import { getProducts, UNIT_BN, type Product } from "@/lib/product";
import { getBengaliShortDate } from "@/lib/date";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ---------- Page shell (prerenderable) ---------- */

export default function ProductDetailPage({ params }: Props) {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <Suspense fallback={<DetailSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}

/* ---------- Async content (runs inside Suspense) ---------- */

async function ProductContent({ params }: Props) {
  const { slug } = await params;

  const [products, updatedAt] = await Promise.all([
    getProducts(),
    getBengaliShortDate(),
  ]);

  const product = products.find((p) => p.slug === slug);
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

  return (
    <>
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-default-500">
        <Link href="/" className="hover:text-foreground">হোম</Link>
        <span>/</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-foreground"
        >
          {product.categoryNameBn}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.nameBn}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-default-100 text-3xl">
          {product.image || product.categoryIcon}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-foreground">
            {product.nameBn}
          </h1>
          <p className="mt-0.5 text-sm text-default-500">
            {product.categoryNameBn} · একক: {unitBn}
          </p>
          <p className="mt-1 text-[11px] text-default-400">
            সর্বশেষ আপডেট: {updatedAt}
          </p>
        </div>
      </div>

      {/* Current price */}
      <div className="mt-6 flex items-end justify-between rounded-2xl border border-separator bg-background p-5">
        <div>
          <p className="text-xs text-default-500">আজকের দাম</p>
          <p className="mt-1 text-3xl font-extrabold text-foreground">
            {product.today} টাকা
            <span className="ml-1 text-sm font-normal text-default-500">
              /{unitBn}
            </span>
          </p>
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${changeColor}`}
        >
          <span className="text-[10px] leading-none">{arrow}</span>
          {Math.abs(pct).toFixed(1)}%
        </span>
      </div>

      {/* Price history */}
      <h2 className="mt-8 text-sm font-bold text-foreground">দামের ইতিহাস</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {[
          { label: "গতকাল", value: product.yesterday },
          { label: "গত সপ্তাহ", value: product.lastWeek },
          { label: "গত মাস", value: product.lastMonth },
        ].map((row) => (
          <div
            key={row.label}
            className="rounded-xl border border-separator bg-background p-4"
          >
            <p className="text-[11px] text-default-500">{row.label}</p>
            <p className="mt-1 text-lg font-bold text-foreground">
              {row.value} টাকা
            </p>
          </div>
        ))}
      </div>

      {/* Market-wise prices */}
      <h2 className="mt-8 text-sm font-bold text-foreground">
        বাজারভিত্তিক দাম
      </h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-separator">
        <table className="w-full text-sm">
          <thead className="bg-default-50">
            <tr className="text-left text-xs text-default-500">
              <th className="px-4 py-2.5 font-medium">বাজার</th>
              <th className="px-4 py-2.5 font-medium">বিভাগ</th>
              <th className="px-4 py-2.5 text-right font-medium">সর্বনিম্ন</th>
              <th className="px-4 py-2.5 text-right font-medium">সর্বোচ্চ</th>
            </tr>
          </thead>
          <tbody>
            {product.markets.map((m, i) => (
              <tr key={`${m.market}-${i}`} className="border-t border-separator">
                <td className="px-4 py-2.5 text-foreground">{m.market}</td>
                <td className="px-4 py-2.5 text-default-500">{m.division}</td>
                <td className="px-4 py-2.5 text-right text-foreground">{m.min}</td>
                <td className="px-4 py-2.5 text-right text-foreground">{m.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ---------- Skeleton ---------- */

function DetailSkeleton() {
  return (
    <>
      <div className="h-4 w-56 animate-pulse rounded bg-default-100" />
      <div className="mt-6 flex items-start gap-4">
        <div className="h-14 w-14 animate-pulse rounded-2xl bg-default-100" />
        <div className="flex-1 space-y-2">
          <div className="h-6 w-48 animate-pulse rounded bg-default-100" />
          <div className="h-4 w-32 animate-pulse rounded bg-default-100" />
        </div>
      </div>
      <div className="mt-6 h-24 animate-pulse rounded-2xl bg-default-100" />
      <div className="mt-8 grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-default-100" />
        ))}
      </div>
      <div className="mt-8 h-64 animate-pulse rounded-xl bg-default-100" />
    </>
  );
}