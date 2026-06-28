import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ProfileClient from "@/components/ProfileClient";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/inloggen");

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-[#f0e6df] px-4 py-3 flex items-center gap-3">
        <Link href="/dashboard" className="text-[#9b6745] text-sm">← Terug</Link>
        <h1 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745]">Mijn profiel</h1>
      </header>
      <ProfileClient
        initialUser={{
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl ?? null,
          role: user.role,
        }}
      />
    </div>
  );
}
