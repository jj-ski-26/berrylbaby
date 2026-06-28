import { redirect, notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import SessionDetail from "@/components/SessionDetail";
import Link from "next/link";

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/inloggen");
  const { id } = await params;

  const session = await db.session.findUnique({
    where: { id },
    include: {
      instructor: { select: { id: true, name: true, avatarUrl: true } },
      reservations: {
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
        orderBy: { createdAt: "asc" },
      },
      messages: {
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!session) notFound();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-[#f0e6df] px-4 py-3 flex items-center gap-3">
        <Link href="/dashboard" className="text-[#9b6745] text-sm">← Terug</Link>
        <h1 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745] truncate">{session.title}</h1>
      </header>
      <SessionDetail session={session as never} currentUserId={user.id} currentUserRole={user.role} />
    </div>
  );
}
