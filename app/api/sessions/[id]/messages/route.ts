import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { sendMessageNotification } from "@/lib/email";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id: sessionId } = await params;
  const { content } = await req.json();
  if (!content?.trim()) return NextResponse.json({ error: "Leeg bericht" }, { status: 400 });

  // Only participants (or admin) can message
  const reservation = await db.reservation.findUnique({
    where: { userId_sessionId: { userId: user.id, sessionId } },
  });
  if (!reservation && user.role !== "ADMIN") {
    return NextResponse.json({ error: "Alleen deelnemers kunnen berichten sturen" }, { status: 403 });
  }

  const session = await db.session.findUnique({
    where: { id: sessionId },
    include: {
      reservations: { include: { user: { select: { id: true, email: true } } } },
    },
  });
  if (!session) return NextResponse.json({ error: "Niet gevonden" }, { status: 404 });

  const message = await db.message.create({
    data: { content: content.trim(), userId: user.id, sessionId },
    include: { user: { select: { id: true, name: true, avatarUrl: true } } },
  });

  // Email all other participants (fire-and-forget — don't block the response)
  const recipients = session.reservations
    .map(r => r.user.email)
    .filter(email => email !== user.email);

  if (recipients.length > 0 && process.env.RESEND_API_KEY) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://app.berrylbaby.nl";
    sendMessageNotification({
      to: recipients,
      senderName: user.name,
      message: content.trim(),
      sessionTitle: session.title,
      sessionUrl: `${baseUrl}/sessies/${sessionId}`,
    }).catch(err => console.error("Email notification failed:", err));
  }

  return NextResponse.json({ message });
}
