import { Category, Product } from "./types";

const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function fetchJson<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (res.ok) return (await res.json()) as T;
    } catch {
      // এই API কাজ না করলে পরেরটা চেষ্টা করবে
    }
  }
  return null;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const path = category ? `/products?category=${category}` : "/products";
  const data = await fetchJson<Product[]>(path);
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<Category[]>("/categories");
  return data ?? [];
}