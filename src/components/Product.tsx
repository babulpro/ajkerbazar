import Link from "next/link";
import { UNIT_BN, getProducts, type Product as ProductType } from "@/lib/product";
import { getBengaliShortDate } from "@/lib/date";

export default async function Product() {
  const [products, updatedAt] = await Promise.all([
    getProducts(),
    getBengaliShortDate(),
  ]);

  const rising = products.filter((p) => p.change.dir === "up");
  const falling = products.filter((p) => p.change.dir === "down");

  return (
    <section className="mx-auto w-full max-w-5xl space-y-10 px-6">
      {rising.length > 0 && (
        <Group
          title="আজ দাম বাড়ছে"
          accent="up"
          products={rising}
          updatedAt={updatedAt}
        />
      )}

      {falling.length > 0 && (
        <Group
          title="আজ দাম কমেছে"
          accent="down"
          products={falling}
          updatedAt={updatedAt}
        />
      )}

      <Group
        title="সব পণ্য"
        subtitle="প্রতিটি পণ্যের সর্বশেষ বাজারদর"
        accent="neutral"
        products={products}
        updatedAt={updatedAt}
      />
    </section>
  );
}

 

function Group({
  title,
  subtitle,
  accent,
  products,
  updatedAt,
}: {
  title: string;
  subtitle?: string;
  accent: "up" | "down" | "neutral";
  products: ProductType[];
  updatedAt: string;
}) {
  const accentColor =
    accent === "up"
      ? "text-red-600"
      : accent === "down"
      ? "text-green-600"
      : "text-foreground";

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <span className={`text-sm font-bold ${accentColor}`}>
          {accent === "up" && "▲ "}
          {accent === "down" && "▼ "}
          {title}
        </span>
      </div>

      {subtitle && (
        <p className="mb-4 -mt-3 text-xs text-default-500">{subtitle}</p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} p={p} updatedAt={updatedAt} />
        ))}
      </div>
    </div>
  );
}

/* ---------- Card ---------- */

function ProductCard({
  p,
  updatedAt,
}: {
  p: ProductType;
  updatedAt: string;
}) {
  const { dir, pct } = p.change;

  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const changeColor =
    dir === "up"
      ? "text-red-600"
      : dir === "down"
      ? "text-green-600"
      : "text-default-500";

  const unitBn = UNIT_BN[p.unit] ?? p.unit;

  return (
    <Link
      href={`/products/${p.slug}`}
      className="group flex flex-col rounded-xl border border-separator bg-background p-4 transition hover:border-primary hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-default-100 text-base">
          {p.image || p.categoryIcon}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-foreground">
            {p.nameBn}
          </h3>
          <p className="text-xs text-default-500">{p.categoryNameBn}</p>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-default-400">
        সর্বশেষ আপডেট: {updatedAt}
      </p>

      <div className="mt-3 flex items-end justify-between">
        <span className="text-lg font-bold text-foreground">
          {p.today} টাকা
        </span>

        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${changeColor}`}
        >
          <span className="text-[9px] leading-none">{arrow}</span>
          {Math.abs(pct).toFixed(1)}%
        </span>
      </div>
    </Link>
  );
}