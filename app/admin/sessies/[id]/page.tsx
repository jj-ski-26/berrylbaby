import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import SessionForm from "@/components/SessionForm";
import Link from "next/link";

export default async function EditSessionPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/inloggen");
  if (user.role !== "ADMIN") redirect("/dashboard");
  const { id } = await params;

  const session = await db.session.findUnique({
    where: { id },
    include: { reservations: { include: { user: { select: { id: true, name: true, email: true } } } } },
  });
  if (!session) notFound();

  const instructors = await db.user.findMany({
    where: { role: "ADMIN" },
    select: { id: true, name: true },
  });

  const dateStr = new Date(session.date).toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-[#f0e6df] px-4 py-3 flex items-center gap-3">
        <Link href="/admin" className="text-[#9b6745] text-sm">← Terug</Link>
        <h1 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745] truncate">{session.title}</h1>
      </header>
      <main className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-8">
        <SessionForm
          sessionId={session.id}
          initial={{
            title: session.title,
            description: session.description ?? "",
            date: dateStr,
            startTime: session.startTime,
            endTime: session.endTime,
            location: session.location,
            maxParticipants: String(session.maxParticipants),
            instructorId: session.instructorId ?? "",
          }}
          instructors={instructors}
        />

        {session.reservations.length > 0 && (
          <section>
            <h2 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745] mb-3">
              Deelnemers ({session.reservations.length})
            </h2>
            <div className="flex flex-col gap-2">
              {session.reservations.map(r => (
                <div key={r.id} className="flex items-center justify-between bg-[#fdf8f5] border border-[#f0e6df] rounded-xl px-4 py-2.5">
                  <div>
                    <p className="text-sm text-[#444]">{r.user.name}</p>
                    <p className="text-xs text-[#999]">{r.user.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
