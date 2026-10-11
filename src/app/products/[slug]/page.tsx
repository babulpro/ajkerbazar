import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, UNIT_BN } from "@/lib/product";

interface Props {
  params: Promise<{ slug: string }>;
}

/* ---------- বাংলা সংখ্যা ফরম্যাটার ---------- */

const bn = (n: number) =>
  n.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  });

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

  const diff = Math.abs(product.today - product.yesterday);
  const compareText =
    dir === "up"
      ? `গতকালের তুলনায় আজ দাম বেড়েছে`
      : dir === "down"
      ? `গতকালের তুলনায় আজ দাম কমেছে`
      : `গতকালের তুলনায় আজ দাম অপরিবর্তিত`;

  /* ---------- বাজারভিত্তিক পরিসংখ্যান ---------- */

  const lowestMin = Math.min(...product.markets.map((m) => m.min));
  const highestMax = Math.max(...product.markets.map((m) => m.max));
  const avgPrice =
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
    product.markets.length;

  return (
    <>
      {/* ---------- Header card ---------- */}
      <div className="flex flex-col gap-5 rounded-2xl bg-[#f4f6f3] p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-xl bg-white text-3xl shadow-sm">
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
                {arrow} {bn(diff)} টাকা
              </span>
            </p>
          </div>
        </div>

        {/* Today's price box */}
        <div className="flex shrink-0 flex-col items-center rounded-xl bg-white px-6 py-4 shadow-sm sm:min-w-[130px]">
          <span className="text-xs text-default-500">আজকের দাম</span>
          <span className="mt-1 text-3xl font-extrabold leading-none text-foreground">
            {bn(product.today)}
          </span>
          <span className="mt-1 text-xs text-default-500">
            টাকা / {unitBn}
          </span>
          <span
            className={`mt-2 flex items-center gap-0.5 text-sm font-bold ${changeColor}`}
          >
            <span className="text-[10px] leading-none">{arrow}</span>
            {bn(Number(Math.abs(pct).toFixed(1)))}%
          </span>
        </div>
      </div>

      {/* ---------- Price review card ---------- */}
      <div className="mt-6 rounded-2xl border border-separator bg-background p-6">
        <h2 className="text-base font-bold text-foreground">
          দামের পর্যালোচনা
        </h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PriceReviewCard
            label="সর্বনিম্ন দাম"
            value={lowestMin}
            sub="সবচেয়ে কম দামের বাজার"
            variant="success"
          />
          <PriceReviewCard
            label="সর্বোচ্চ দাম"
            value={highestMax}
            sub="সবচেয়ে বেশি দামের বাজার"
            variant="danger"
          />
          <PriceReviewCard
            label="গড় দাম"
            value={avgPrice}
            sub={`প্রতি ${unitBn}-এর হিসাব`}
            variant="success"
          />
        </div>
      </div>

      {/* ---------- Market-wise card ---------- */}
      <div className="mt-6 rounded-2xl border border-separator bg-background p-6">
        <h2 className="text-base font-bold text-foreground">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="mt-4 overflow-hidden rounded-xl border border-separator">
          <table className="w-full text-sm">
            <thead className="bg-default-50">
              <tr className="text-left text-xs text-default-600">
                <th className="px-5 py-3 font-medium">বাজার</th>
                <th className="px-5 py-3 font-medium">বিভাগ</th>
                <th className="px-5 py-3 text-center font-medium">
                  সর্বনিম্ন দাম
                </th>
                <th className="px-5 py-3 text-center font-medium">
                  সর্বোচ্চ দাম
                </th>
                <th className="px-5 py-3 text-center font-medium">
                  গড় দাম
                </th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, i) => {
                const avg = (m.min + m.max) / 2;
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
                    <td className="px-5 py-3 text-center text-foreground">
                      {bn(m.min)} টাকা
                    </td>
                    <td className="px-5 py-3 text-center text-foreground">
                      {bn(m.max)} টাকা
                    </td>
                    <td className="px-5 py-3 text-center font-semibold text-foreground">
                      {bn(avg)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
  const colorClass =
    variant === "danger"
      ? "text-red-600"
      : variant === "success"
      ? "text-green-700"
      : "text-foreground";

  return (
    <div className="rounded-xl border border-separator bg-background p-4">
      <p className={`text-xs font-medium ${colorClass}`}>{label}</p>

      <div className="mt-3 flex items-center gap-2">
        <span
          className={`grid h-6 w-6 place-items-center rounded-full ${colorClass} bg-current`}
        >
          <span className="text-[11px] font-bold text-white">৳</span>
        </span>
        <span className={`text-xl font-bold ${colorClass}`}>
          {bn(value)} টাকা
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
      <div className="mt-6 h-56 animate-pulse rounded-2xl bg-default-100" />
      <div className="mt-6 h-96 animate-pulse rounded-2xl bg-default-100" />
    </>
  );
}