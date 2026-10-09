import Link from "next/link";
import type { Product } from "@/lib/types";
import { changeBadge, formatPrice, unitLabel } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const badge = changeBadge(product.change);
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white border rounded-xl p-4 hover:shadow-lg transition"
    >
      <div className="text-4xl">{product.image}</div>
      <h3 className="font-semibold mt-2">{product.nameBn}</h3>
      <p className="text-sm text-gray-500">{unitLabel(product.unit)}</p>
      <div className="flex items-end justify-between mt-3">
        <div>
          <div className="text-xs text-gray-500">আজকের দাম</div>
          <div className="font-bold">{formatPrice(product.today)}</div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.cls}`}>
          {badge.text}
        </span>
      </div>
    </Link>
  );
}