
import { Product } from "./types";

const BASE = "https://api.api-store.workers.dev/api/bazardor";

  export async function getProducts(category?: string): Promise<Product[]>  {
  const url = category ? `${BASE}/products?category=${category}` : `${BASE}/products`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id: string) {
  const res = await fetch(`${BASE}/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}