import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/inloggen");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const sessions = await db.session.findMany({
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    include: { reservations: { select: { id: true } } },
  });

  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const upcoming = sessions.filter(s => new Date(s.date) >= today);
  const past = sessions.filter(s => new Date(s.date) < today);

  function formatDate(d: Date) {
    return new Date(d).toLocaleDateString("nl-NL", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-[#f0e6df] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-[#9b6745] text-sm">← Terug</Link>
          <h1 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745]">Beheer</h1>
        </div>
        <Link href="/admin/sessies/nieuw" className="bg-[#9b6745] text-white text-sm px-4 py-2 rounded-full hover:bg-[#7a5237] transition">
          + Nieuwe sessie
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 flex flex-col gap-8">
        <section>
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-4">Aankomende sessies ({upcoming.length})</h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-[#999]">Geen aankomende sessies.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {upcoming.map(s => (
                <div key={s.id} className="flex items-center justify-between gap-4 bg-[#fdf8f5] border border-[#f0e6df] rounded-xl px-4 py-3">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-medium text-sm text-[#444] truncate">{s.title}</span>
                    <span className="text-xs text-[#999]">{formatDate(s.date)} · {s.startTime}–{s.endTime} · {s.location}</span>
                    <span className="text-xs text-[#9b6745]">{s.reservations.length}/{s.maxParticipants} deelnemers</span>
                  </div>
                  <Link href={`/admin/sessies/${s.id}`} className="shrink-0 text-sm text-[#9b6745] border border-[#f0e6df] px-3 py-1.5 rounded-lg hover:bg-[#f5ede7] transition">
                    Bewerk
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section>
            <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-4">Afgelopen sessies ({past.length})</h2>
            <div className="flex flex-col gap-3">
              {past.slice(-5).reverse().map(s => (
                <div key={s.id} className="flex items-center justify-between gap-4 bg-white border border-[#f0e6df] rounded-xl px-4 py-3 opacity-60">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-medium text-sm text-[#444] truncate">{s.title}</span>
                    <span className="text-xs text-[#999]">{formatDate(s.date)} · {s.startTime}–{s.endTime}</span>
                  </div>
                  <Link href={`/admin/sessies/${s.id}`} className="shrink-0 text-xs text-[#999] border border-[#f0e6df] px-3 py-1.5 rounded-lg">
                    Bewerk
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="border-t border-[#f0e6df] pt-6">
          <Link href="/admin/gebruikers" className="text-sm text-[#9b6745] hover:underline">→ Gebruikersbeheer</Link>
        </section>
      </main>
    </div>
  );
}
