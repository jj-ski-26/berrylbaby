import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return null;
  return user;
}

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const sessions = await db.session.findMany({
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
    include: {
      reservations: { select: { id: true } },
      instructor: { select: { id: true, name: true } },
    },
  });
  return NextResponse.json({ sessions });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { title, description, date, startTime, endTime, location, maxParticipants, instructorId } = body;

  if (!title || !date || !startTime || !endTime || !location || !maxParticipants) {
    return NextResponse.json({ error: "Verplichte velden ontbreken" }, { status: 400 });
  }

  const session = await db.session.create({
    data: {
      title,
      description: description || null,
      date: new Date(date),
      startTime,
      endTime,
      location,
      maxParticipants: parseInt(maxParticipants),
      instructorId: instructorId || null,
    },
  });
  return NextResponse.json({ session }, { status: 201 });
}
