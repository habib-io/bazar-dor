import ProductSkeleton from "@/components/ProductSkeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="skeleton h-10 w-48 mb-6"></div>
      <ProductSkeleton count={8} />
    </div>
  );
}