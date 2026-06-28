import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const { role } = await req.json();
  if (role !== "USER" && role !== "ADMIN") return NextResponse.json({ error: "Ongeldige rol" }, { status: 400 });
  const updated = await db.user.update({ where: { id }, data: { role } });
  return NextResponse.json({ user: { id: updated.id, name: updated.name, role: updated.role } });
}
