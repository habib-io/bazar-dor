import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login&callbackURL=/profile/update");

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">তথ্য আপডেট</h1>
        <UpdateProfileForm currentName={session.user.name} />
      </div>
    </div>
  );
}