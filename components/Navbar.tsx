"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { banglaDate } from "@/lib/utils";
import type { Category } from "@/lib/types";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="bg-white border-b sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/">
          <div className="text-xl font-bold">🛒 বাজার দর</div>
          <div className="text-xs text-gray-500" suppressHydrationWarning>
            {banglaDate()}
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="skeleton h-8 w-24"></div>
          ) : session ? (
            <>
              <Link href="/profile" className="btn btn-sm sm:btn-md btn-ghost">
                👤 {session.user.name}
              </Link>
              <button onClick={handleSignOut} className="btn btn-sm sm:btn-md btn-outline">
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="btn btn-sm sm:btn-md btn-outline">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-sm sm:btn-md btn-primary">
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="max-w-6xl mx-auto px-4 pb-2 flex gap-2 overflow-x-auto">
        {categories.map((c) => {
          const active = pathname === `/category/${c.slug}`;
          return (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-sm border ${
                active
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {c.icon} {c.nameBn}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}