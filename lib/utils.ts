const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// 1850 
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export function formatPrice(n: number): string {
  return toBn(n.toLocaleString("en-US")) + " টাকা";
}

const UNITS: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
  pcs: "প্রতি পিস",
};

export function unitLabel(unit: string): string {
  return UNITS[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

// badge
export function changeBadge(change: { dir: string; pct: number }) {
  const pct = toBn(change.pct.toFixed(1));
  if (change.dir === "up")
    return { text: `▲ ${pct}%`, cls: "text-green-600 bg-green-100" };
  if (change.dir === "down")
    return { text: `▼ ${pct}%`, cls: "text-red-600 bg-red-100" };
  return { text: `— ${pct}%`, cls: "text-gray-600 bg-gray-100" };
}

export function banglaDate(): string {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}