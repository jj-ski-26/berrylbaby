import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

// One-time setup endpoint — creates admin user if not exists
// Protected by SETUP_SECRET env var
export async function POST(req: NextRequest) {
  const secret = process.env.SETUP_SECRET;
  if (!secret) return NextResponse.json({ error: "SETUP_SECRET not set" }, { status: 403 });

  const { token, email, password, name } = await req.json();
  if (token !== secret) return NextResponse.json({ error: "Invalid token" }, { status: 403 });

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    await db.user.update({ where: { email }, data: { role: "ADMIN", passwordHash: await bcrypt.hash(password, 12) } });
    return NextResponse.json({ ok: true, action: "updated", email });
  }

  await db.user.create({
    data: { name: name ?? email, email, passwordHash: await bcrypt.hash(password, 12), role: "ADMIN" },
  });
  return NextResponse.json({ ok: true, action: "created", email });
}
