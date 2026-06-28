import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import SessionForm from "@/components/SessionForm";
import Link from "next/link";

export default async function NieuweSessionPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/inloggen");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const instructors = await db.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true, name: true },
  });

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-[#f0e6df] px-4 py-3 flex items-center gap-3">
        <Link href="/admin" className="text-[#9b6745] text-sm">← Terug</Link>
        <h1 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745]">Nieuwe sessie</h1>
      </header>
      <main className="max-w-lg mx-auto px-4 py-6">
        <SessionForm instructors={instructors} />
      </main>
    </div>
  );
}
