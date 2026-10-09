import { getProducts } from "@/lib/api";

export default async function Home() {
  const data = await getProducts();
  return <pre>{JSON.stringify(data, null, 2).slice(0, 1500)}</pre>;
}