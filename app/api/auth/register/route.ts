import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { COOKIE_OPTS } from "@/lib/auth";
export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) return NextResponse.json({ error: "Alle velden zijn verplicht" }, { status: 400 });
  if (password.length < 6) return NextResponse.json({ error: "Wachtwoord te kort" }, { status: 400 });

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "E-mailadres al in gebruik" }, { status: 400 });

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await db.user.create({ data: { name, email, passwordHash } });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("userId", user.id, COOKIE_OPTS);
  return res;
}
