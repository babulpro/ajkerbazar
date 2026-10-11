// lib/product.ts

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

const BASE = "https://openapi.programming-hero.com/api/bazardor";
const PRODUCTS_URL = `${BASE}/products`;

/* ---------- সব প্রোডাক্ট ---------- */

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(PRODUCTS_URL, {
      next: { revalidate: 3600 }, // cache for 1 hour
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : data.products ?? [];
  } catch (err) {
    console.error("[products] getProducts failed:", err);
    return [];
  }
}

/* ---------- slug দিয়ে একটি প্রোডাক্ট ---------- */

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

/* ---------- আইডি দিয়ে একটি প্রোডাক্ট ---------- */

export async function getProductById(
  id: number
): Promise<Product | null> {
  try {
    const res = await fetch(`${PRODUCTS_URL}/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/* ---------- ক্যাটাগরি দিয়ে প্রোডাক্ট ---------- */

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const res = await fetch(`${PRODUCTS_URL}?category=${category}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.products ?? [];
  } catch {
    return [];
  }
}

/* ---------- Unit → বাংলা লেবেল ---------- */

export const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};