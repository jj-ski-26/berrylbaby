import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const session = await db.session.findUnique({
    where: { id },
    include: {
      reservations: { include: { user: { select: { id: true, name: true, email: true } } } },
      instructor: { select: { id: true, name: true } },
    },
  });
  if (!session) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json({ session });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const body = await req.json();
  const { title, description, date, startTime, endTime, location, maxParticipants, instructorId } = body;

  const session = await db.session.update({
    where: { id },
    data: {
      ...(title ? { title } : {}),
      ...(description !== undefined ? { description: description || null } : {}),
      ...(date ? { date: new Date(date) } : {}),
      ...(startTime ? { startTime } : {}),
      ...(endTime ? { endTime } : {}),
      ...(location ? { location } : {}),
      ...(maxParticipants ? { maxParticipants: parseInt(maxParticipants) } : {}),
      ...(instructorId !== undefined ? { instructorId: instructorId || null } : {}),
    },
  });
  return NextResponse.json({ session });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  await db.reservation.deleteMany({ where: { sessionId: id } });
  await db.message.deleteMany({ where: { sessionId: id } });
  await db.session.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
