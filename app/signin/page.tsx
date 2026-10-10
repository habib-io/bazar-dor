import SignInForm from "@/components/SignInForm";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string; reason?: string }>;
}) {
  const sp = await searchParams;
  const cb = sp.callbackURL;
  const callbackURL = cb && cb.startsWith("/") && !cb.startsWith("//") ? cb : "/";
  return <SignInForm callbackURL={callbackURL} reason={sp.reason} />;
}