import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=login&callbackURL=/profile");
  const { user } = session;

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white border rounded-xl p-6 text-center space-y-3">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="w-24 h-24 rounded-full mx-auto" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-green-100 text-3xl flex items-center justify-center mx-auto">
            {user.name.charAt(0)}
          </div>
        )}
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <Link href="/profile/update" className="btn btn-primary">তথ্য আপডেট করুন</Link>
      </div>
    </div>
  );
}