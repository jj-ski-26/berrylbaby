import path from "path";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const dbUrl = process.env.DATABASE_URL ?? `file:${path.join(__dirname, "dev.db")}`;
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const db = new PrismaClient({ adapter } as never);

async function main() {
  const existing = await db.user.findUnique({ where: { email: "admin@berrylbaby.nl" } });
  if (!existing) {
    await db.user.create({
      data: {
        name: "Berryl",
        email: "admin@berrylbaby.nl",
        passwordHash: await bcrypt.hash("changeme", 12),
        role: "ADMIN",
      },
    });
    console.log("Admin user created: admin@berrylbaby.nl / changeme");
  } else {
    console.log("Admin user already exists");
  }

  // Add test sessions for current week
  const now = new Date();
  const mon = new Date(now);
  mon.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  mon.setHours(0, 0, 0, 0);

  const testSessions = [
    { title: "Yoga voor beginners", description: "Zachte yoga voor moeders met baby", date: new Date(mon.getTime()), startTime: "10:00", endTime: "11:00", location: "Almelo", maxParticipants: 8 },
    { title: "Zwangerschapsyoga", date: new Date(mon.getTime() + 2 * 86400000), startTime: "19:30", endTime: "20:30", location: "Wierden", maxParticipants: 10 },
    { title: "Babymassage", date: new Date(mon.getTime() + 2 * 86400000), startTime: "10:00", endTime: "11:00", location: "Almelo", maxParticipants: 6 },
    { title: "Pilates Mama", date: new Date(mon.getTime() + 4 * 86400000), startTime: "09:30", endTime: "10:30", location: "Online", maxParticipants: 12 },
    { title: "Fit & in Balans", date: new Date(mon.getTime() + 5 * 86400000), startTime: "10:00", endTime: "11:30", location: "Almelo", maxParticipants: 8 },
  ];

  for (const s of testSessions) {
    const existing = await db.session.findFirst({ where: { title: s.title, date: s.date } });
    if (!existing) {
      await db.session.create({ data: s });
    }
  }
  console.log("Test sessions seeded");
}

main().catch(console.error).finally(() => db.$disconnect());
