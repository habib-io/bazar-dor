"use client";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const login = (provider: "google" | "github") =>
    authClient.signIn.social({ provider, callbackURL });

  return (
    <div className="space-y-2">
      <button onClick={() => login("google")} className="btn btn-outline w-full">
        Google দিয়ে চালিয়ে যান
      </button>
      <button onClick={() => login("github")} className="btn btn-outline w-full">
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}