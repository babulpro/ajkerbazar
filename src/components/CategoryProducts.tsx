"use client";

import Link from "next/link";
import { useState } from "react";
import { UNIT_BN, type Product } from "@/lib/product";

export default function CategoryProducts({
  products,
  categoryName,
  updatedAt,
}: {
  products: Product[];
  categoryName: string;
  updatedAt: string; // ← new prop, computed on the server
}) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? products.filter((p) =>
        p.nameBn.toLowerCase().includes(query.trim().toLowerCase())
      )
    : products;

  return (
    <>
      {/* Search bar */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-separator bg-background p-2 pl-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="সার্চ করুন"
          aria-label="পণ্য সার্চ করুন"
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-default-400"
        />
        <button
          type="button"
          className="shrink-0 rounded-lg border border-separator px-5 py-2 text-sm font-medium text-foreground transition hover:bg-default-100"
        >
          সার্চ করুন
        </button>
      </div>

      <h2 className="mt-8 text-lg font-bold text-red-700">
        {categoryName} এর আজকের বাজারদর
      </h2>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-default-500">
          কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} updatedAt={updatedAt} />
          ))}
        </div>
      )}
    </>
  );
}

function ProductCard({ p, updatedAt }: { p: Product; updatedAt: string }) {
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