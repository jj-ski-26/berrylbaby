import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import WeekView from "@/components/WeekView";
import Link from "next/link";

function getCurrentISOWeek(): { year: number; week: number } {
  const now = new Date();
  const thu = new Date(now);
  thu.setDate(now.getDate() - ((now.getDay() + 6) % 7) + 3);
  const year = thu.getFullYear();
  const jan4 = new Date(year, 0, 4);
  const week1Thu = new Date(jan4);
  week1Thu.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7) + 3);
  const week = Math.round((thu.getTime() - week1Thu.getTime()) / (7 * 86400000)) + 1;
  return { year, week };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/inloggen");
  const { year, week } = getCurrentISOWeek();

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 bg-white border-b border-[#f0e6df] px-4 py-3 flex items-center justify-between">
        <h1 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745]">BerrylBaby</h1>
        <div className="flex items-center gap-3">
          {user.role === "ADMIN" && (
            <Link href="/admin" className="text-xs text-[#9b6745] border border-[#9b6745] rounded-full px-3 py-1 hover:bg-[#f5ede7]">
              Beheer
            </Link>
          )}
          <Link href="/profiel" className="text-sm text-[#666]">{user.name}</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">
        <WeekView
          initialYear={year}
          initialWeek={week}
          userId={user.id}
          userRole={user.role}
        />
      </main>
    </div>
  );
}
