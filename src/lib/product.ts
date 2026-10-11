// lib/products.ts
export interface Product {
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
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

const PRODUCTS_URL =
  "https://openapi.programming-hero.com/api/bazardor/products";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(PRODUCTS_URL, {
      next: { revalidate: 3600 }, // refresh hourly
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : data.products ?? [];
  } catch (err) {
    console.error("[products] getProducts failed:", err);
    return [];
  }
}

// Unit → Bengali label
export const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};