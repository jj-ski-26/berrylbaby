import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { COOKIE_OPTS } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) return NextResponse.json({ error: "Alle velden zijn verplicht" }, { status: 400 });

  const user = await db.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "Onbekend e-mailadres of wachtwoord" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return NextResponse.json({ error: "Onbekend e-mailadres of wachtwoord" }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set("userId", user.id, COOKIE_OPTS);
  return res;
}
