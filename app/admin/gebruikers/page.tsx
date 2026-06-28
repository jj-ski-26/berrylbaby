import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import UserRoleToggle from "@/components/UserRoleToggle";

export default async function GebruikersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/inloggen");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const users = await db.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-[#f0e6df] px-4 py-3 flex items-center gap-3">
        <Link href="/admin" className="text-[#9b6745] text-sm">← Beheer</Link>
        <h1 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745]">Gebruikers</h1>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex flex-col gap-3">
          {users.map(u => (
            <div key={u.id} className="flex items-center justify-between gap-4 bg-[#fdf8f5] border border-[#f0e6df] rounded-xl px-4 py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#444] truncate">{u.name}</p>
                <p className="text-xs text-[#999] truncate">{u.email}</p>
              </div>
              <UserRoleToggle userId={u.id} currentRole={u.role} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
