import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { passwordHash: _, ...safe } = user;
  return NextResponse.json({ user: safe });
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, email } = await req.json();

  if (email && email !== user.email) {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return NextResponse.json({ error: "E-mailadres al in gebruik" }, { status: 400 });
  }

  const updated = await db.user.update({
    where: { id: user.id },
    data: {
      ...(name?.trim() ? { name: name.trim() } : {}),
      ...(email?.trim() ? { email: email.trim() } : {}),
    },
  });
  const { passwordHash: _, ...safe } = updated;
  return NextResponse.json({ user: safe });
}
