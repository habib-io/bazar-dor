"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!name || !email || !password) return toast.error("সব ঘর পূরণ করুন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
  console.log("SIGNUP ERROR:", error);
  return toast.error(`${error.status ?? ""} ${error.message || error.statusText || "রেজিস্ট্রেশন ব্যর্থ হয়েছে"}`);
  }
    toast.success("রেজিস্ট্রেশন সফল! এখন সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">সাইন আপ</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="নাম" className="input input-bordered w-full" />
          <input name="email" type="email" placeholder="ইমেইল" className="input input-bordered w-full" />
          <input name="password" type="password" placeholder="পাসওয়ার্ড (কমপক্ষে ৮ অক্ষর)" className="input input-bordered w-full" />
          <button disabled={loading} className="btn btn-primary w-full">
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
          </button>
        </form>
        <div className="divider">অথবা</div>
        <SocialButtons callbackURL="/" />
        <p className="text-sm text-center">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-green-600 font-medium">সাইন ইন করুন</Link>
        </p>
      </div>
    </div>
  );
}