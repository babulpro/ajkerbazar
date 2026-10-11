"use client";

import { useCategories } from "@/context/CategoryContext";
import Link from "next/link";

export default function Category() {
  const categories = useCategories();

  if (categories.length === 0) {
    return (
      <p className="text-sm text-default-500">
        কোনো ক্যাটাগরি পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <section className="w-full fixed top-16 py-0 md:py-3 border-b border-separator bg-background/70 backdrop-blur-lg">
           <div className="flex flex-wrap gap-3 md:gap-10 mx-auto  max-w-5xl items-left justify-around ">
                {categories.map((cat) => (
                <Link href={`/category/${cat.slug}`}
                    key={cat.id}>
                    <span className="text-lg transition-transform group-hover:scale-110">
                    {cat.icon}
                    </span>
                    <span className="text-sm font-medium text-foreground ml-2">
                    {cat.nameBn}
                    </span>
                </Link>
                ))}
             </div>
    </section>
  );
}