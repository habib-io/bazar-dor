import Image from "next/image";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export default async function Home() {
  const products = await getProducts();
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="grid md:grid-cols-2 gap-8 items-center py-10">
        <div>
          <p className="text-green-600 font-medium">প্রতিদিনের বাজার দর</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-2">
            আজকের বাজারে কোন পণ্যের কত দাম?
          </h1>
          <p className="text-gray-600 mt-4">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস সহ নিত্যপ্রয়োজনীয় পণ্যের দাম এক জায়গায়।
          </p>
          <a href="#সব-পণ্য" className="btn btn-primary mt-6">
            সব পণ্য দেখুন
          </a>
        </div>
        <Image
          src="/bazar-hero.png"
          alt="বাজার দর"
          width={600}
          height={450}
          className="w-full h-auto rounded-xl"
          priority
        />
      </section>

      <Section title="আজ দাম বেড়েছে ▲" items={risers} />
      <Section title="আজ দাম কমেছে ▼" items={fallers} />
      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle="সব নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম"
        items={products}
      />
    </div>
  );
}

function Section({
  id,
  title,
  subtitle,
  items,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  items: Product[];
}) {
  return (
    <section id={id} className="py-6 scroll-mt-32">
      <h2 className="text-2xl font-bold">{title}</h2>
      {subtitle && <p className="text-gray-500">{subtitle}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}