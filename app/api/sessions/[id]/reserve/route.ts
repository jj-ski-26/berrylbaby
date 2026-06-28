import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id: sessionId } = await params;

  const existing = await db.reservation.findUnique({
    where: { userId_sessionId: { userId: user.id, sessionId } },
  });

  if (existing) {
    await db.reservation.delete({ where: { id: existing.id } });
    return NextResponse.json({ reserved: false });
  }

  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: { reservations: true },
  });
  if (!session) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  if (session.reservations.length >= session.maxParticipants) {
    return NextResponse.json({ error: "Sessie is vol" }, { status: 400 });
  }

  await db.reservation.create({ data: { userId: user.id, sessionId } });
  return NextResponse.json({ reserved: true });
}
