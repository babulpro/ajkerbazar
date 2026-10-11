 
export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const CATEGORIES_URL =
  "https://openapi.programming-hero.com/api/bazardor/categories";

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(CATEGORIES_URL, {
      
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    
    return Array.isArray(data) ? data : data.categories ?? [];
  } catch (err) {
    console.error("[bazardor] getCategories failed:", err);
    return [];  
  }
}