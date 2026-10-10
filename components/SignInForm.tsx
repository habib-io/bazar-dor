"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm({
  callbackURL,
  reason,
}: {
  callbackURL: string;
  reason?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (reason === "login") toast.error("এই পাতা দেখতে আগে লগইন করুন");
  }, [reason]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) return toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
    toast.success("সফলভাবে লগইন হয়েছে");
    router.push(callbackURL);
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">সাইন ইন</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="পাসওয়ার্ড" className="input input-bordered w-full" />
          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </button>
        </form>
        <div className="divider">অথবা</div>
        <SocialButtons callbackURL={callbackURL} />
        <p className="text-sm text-center">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-green-600 font-medium">সাইন আপ করুন</Link>
        </p>
      </div>
    </div>
  );
}