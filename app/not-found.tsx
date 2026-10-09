import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-24 px-4">
      <div className="text-6xl">🔍</div>
      <h1 className="text-2xl font-bold mt-4">৪০৪ — পাতাটি খুঁজে পাওয়া যায়নি</h1>
      <p className="text-gray-500 mt-2">আপনি যে পাতাটি খুঁজছেন তা নেই।</p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}