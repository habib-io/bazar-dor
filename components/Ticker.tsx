import { getProducts } from "@/lib/api";
import { formatPrice, unitLabel, changeBadge } from "@/lib/utils";

export default async function Ticker() {
  const products = await getProducts();
  const items = [...products, ...products];

  return (
    <div className="bg-gray-900 text-white overflow-hidden">
      <div className="ticker flex w-max py-2 text-sm">
        {items.map((p, i) => {
          const b = changeBadge(p.change);
          const color =
            p.change.dir === "up"
              ? "text-green-400"
              : p.change.dir === "down"
              ? "text-red-400"
              : "text-gray-400";
          return (
            <span key={i} className="whitespace-nowrap pr-8">
              {p.image} {p.nameBn} {formatPrice(p.today)}/
              {unitLabel(p.unit).replace("প্রতি ", "")}{" "}
              <b className={color}>{b.text}</b>
            </span>
          );
        })}
      </div>
    </div>
  );
}