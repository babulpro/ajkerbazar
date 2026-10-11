 
import { cacheLife } from "next/cache";
import { Product } from "./product";
import { getCategories } from "./bazardor";
 
 

const BASE = "https://openapi.programming-hero.com/api/bazardor";

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

/* ---------- Single category ---------- */

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
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

/* ---------- Products of a category ---------- */

export async function getProductsByCategory(
  slug: string
): Promise<Product[]> {
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
export async function getCategoriesCached(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  return getCategories();
}