"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Category } from "@/lib/bazardor";

const CategoryContext = createContext<Category[]>([]);

interface Props {
  categories: Category[];
  children: ReactNode;
}

export function CategoryProvider({ categories, children }: Props) {
  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategories(): Category[] {
  return useContext(CategoryContext);
}