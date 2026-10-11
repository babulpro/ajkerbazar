"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
}

const PRODUCTS_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export default function ProductMarquee() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(PRODUCTS_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const list: Product[] = Array.isArray(data)
          ? data
          : data.products ?? [];
        if (!cancelled) setProducts(list);
      } catch (err) {
        console.error("[ProductMarquee] fetch failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || products.length === 0) {
    return (
      <div className="h-12 w-full border-y border-separator bg-background" />
    );
  }

  const items = products;

  return (
    <div className="w-full overflow-hidden border-y border-separator bg-background fixed top-28">
      <style>{`
        @keyframes bazardor-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .bazardor-marquee-track {
          display: flex;
          width: max-content;
          animation: bazardor-marquee 200s linear infinite;
          will-change: transform;
        }
        .group:hover .bazardor-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .bazardor-marquee-track { animation: none; }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />

      <div className="bazardor-marquee-track py-3">
        <div className="flex shrink-0 items-center">
          {items.map((p) => (
            <Item key={`a-${p.id}`} p={p} />
          ))}
        </div>

        <div className="flex shrink-0 items-center" aria-hidden>
          {items.map((p) => (
            <Item key={`b-${p.id}`} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Item({ p }: { p: Product }) {
  const { dir, pct } = p.change;

  const arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
  const colorClass =
    dir === "up"
      ? "text-red-600"
      : dir === "down"
      ? "text-green-600"
      : "text-default-500";

  const unitBn = UNIT_BN[p.unit] ?? p.unit;

  return (
    <div className="flex shrink-0 items-center gap-2 whitespace-nowrap px-6 text-sm">
      <span className="text-base leading-none" aria-hidden>
        {p.categoryIcon}
      </span>

      <span className="font-medium text-foreground">{p.nameBn}</span>

      <span className="font-semibold text-foreground">
        {p.today} টাকা/{unitBn}
      </span>

      <span className={`flex items-center gap-0.5 font-semibold ${colorClass}`}>
        <span className="text-[10px] leading-none">{arrow}</span>
        {Math.abs(pct).toFixed(1)}%
      </span>
    </div>
  );
}