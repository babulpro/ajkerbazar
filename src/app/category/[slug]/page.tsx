import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import { getBengaliShortDate } from "@/lib/date";
import CategoryProducts from "@/components/CategoryProducts";
import type { Product } from "@/lib/product";

const BASE = "https://openapi.programming-hero.com/api/bazardor";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

/* ---------- Cached fetchers (inline, no lib/category needed) ---------- */

async function fetchCategory(slug: string): Promise<Category | null> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`${BASE}/categories/${slug}`);
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch {
    return null;
  }
}

async function fetchProducts(slug: string): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  try {
    const res = await fetch(`${BASE}/products?category=${slug}`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.products ?? [];
  } catch {
    return [];
  }
}

/* ---------- Page shell (prerenderable) ---------- */

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <Suspense fallback={<PageSkeleton />}>
        <CategoryContent params={params} />
      </Suspense>
    </div>
  );
}

/* ---------- Async content (runs inside Suspense) ---------- */

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, products, updatedAt] = await Promise.all([
    fetchCategory(slug),
    fetchProducts(slug),
    getBengaliShortDate(),
  ]);

  if (!category) notFound();

  return (
    <>
      {/* Green banner */}
      <div className="flex items-center gap-4 rounded-2xl bg-[#043117] p-5 text-white sm:p-6">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-2xl">
          {category.icon}
        </span>
        <div className="min-w-0">
          <h1 className="text-xl font-bold leading-tight sm:text-2xl">
            {category.nameBn}
          </h1>
          <p className="mt-0.5 text-sm text-white/70">
            {category.nameBn} এর আজকের বাজারদর ও বিস্তারিত
          </p>
        </div>
      </div>

      {/* Search + grid (client) */}
      <CategoryProducts
        products={products}
        categoryName={category.nameBn}
        updatedAt={updatedAt}
      />
    </>
  );
}

/* ---------- Skeleton ---------- */

function PageSkeleton() {
  return (
    <>
      <div className="h-24 animate-pulse rounded-2xl bg-default-100" />
      <div className="mt-6 h-14 animate-pulse rounded-xl bg-default-100" />
      <div className="mt-8 h-6 w-56 animate-pulse rounded bg-default-100" />
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl bg-default-100"
          />
        ))}
      </div>
    </>
  );
}