import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const now = new Date();
  const year = parseInt(searchParams.get("year") ?? String(now.getFullYear()));

  // Default week calculation
  const thu = new Date(now);
  thu.setDate(now.getDate() - ((now.getDay() + 6) % 7) + 3);
  const defaultYear = thu.getFullYear();
  const jan4def = new Date(defaultYear, 0, 4);
  const week1Thudef = new Date(jan4def);
  week1Thudef.setDate(jan4def.getDate() - ((jan4def.getDay() + 6) % 7) + 3);
  const defaultWeek = Math.round((thu.getTime() - week1Thudef.getTime()) / (7 * 86400000)) + 1;

  const week = parseInt(searchParams.get("week") ?? String(defaultWeek));

  // Calculate start/end of the ISO week manually (Mon–Sun)
  const jan4 = new Date(year, 0, 4);
  const week1Mon = new Date(jan4);
  week1Mon.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
  const weekStart = new Date(week1Mon);
  weekStart.setDate(week1Mon.getDate() + (week - 1) * 7);
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  const sessions = await db.session.findMany({
    where: { date: { gte: weekStart, lt: weekEnd } },
    include: {
      reservations: { select: { userId: true } },
      instructor: { select: { name: true, avatarUrl: true } },
    },
    orderBy: [{ date: "asc" }, { startTime: "asc" }],
  });

  return NextResponse.json({ sessions, userId: user.id, userRole: user.role });
}
