import { Category, Product } from "./types";

const BASE = "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category ? `${BASE}/products?category=${category}` : `${BASE}/products`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}