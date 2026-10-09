"use client";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === "asc") arr.sort((a, b) => a.today - b.today);
    if (sort === "desc") arr.sort((a, b) => b.today - a.today);
    return arr;
  }, [products, sort]);

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="sort" className="text-sm">সাজান:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="default">ডিফল্ট</option>
          <option value="asc">দাম: কম থেকে বেশি</option>
          <option value="desc">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}