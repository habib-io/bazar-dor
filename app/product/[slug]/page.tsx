import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { changeBadge, formatPrice, unitLabel, toBn } from "@/lib/utils";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?reason=login&callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const min = Math.min(...product.markets.map((m) => m.min));
  const max = Math.max(...product.markets.map((m) => m.max));
  const avg = Math.round(
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) / product.markets.length
  );
  const badge = changeBadge(product.change);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <Link href="/" className="text-sm text-green-600">← হোমে ফিরে যান</Link>

      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="text-6xl">{product.image}</div>
          <div>
            <h1 className="text-3xl font-bold">{product.nameBn}</h1>
            <p className="text-gray-600">
              আজকের দাম {formatPrice(product.today)} ({unitLabel(product.unit)}), গতকাল ছিল {formatPrice(product.yesterday)}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">{unitLabel(product.unit)}</span>
              <span className={`px-3 py-1 rounded-full text-sm ${badge.cls}`}>{badge.text}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="সর্বনিম্ন দাম" value={formatPrice(min)} />
        <Stat label="সর্বোচ্চ দাম" value={formatPrice(max)} />
        <Stat label="গড় দাম" value={formatPrice(avg)} />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-3">বাজারভিত্তিক আজকের দাম</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.markets.map((m, i) => (
            <div key={i} className="bg-white border rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="font-semibold">{m.market}</div>
                <div className="text-sm text-gray-500">{m.division}</div>
              </div>
              <div className="text-right text-sm">
                <div>সর্বনিম্ন: {formatPrice(m.min)}</div>
                <div>সর্বোচ্চ: {formatPrice(m.max)}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">মোট {toBn(product.markets.length)}টি বাজারের তথ্য</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-xl p-4 text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}