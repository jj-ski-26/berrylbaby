import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  if (!session) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });
  return NextResponse.json({ session, currentUserId: user.id, currentUserRole: user.role });
}
