"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Reservation { userId: string }
interface SessionData {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxParticipants: number;
  reservations: Reservation[];
  instructor?: { name: string; avatarUrl?: string | null } | null;
}

const DAY_LABELS = ["ma", "di", "wo", "do", "vr", "za", "zo"];

function getISOWeekStart(year: number, week: number): Date {
  const jan4 = new Date(year, 0, 4);
  const week1Mon = new Date(jan4);
  week1Mon.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7));
  const d = new Date(week1Mon);
  d.setDate(week1Mon.getDate() + (week - 1) * 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addWeeks(year: number, week: number, delta: number): { year: number; week: number } {
  const d = getISOWeekStart(year, week);
  d.setDate(d.getDate() + delta * 7);
  const thu = new Date(d);
  thu.setDate(d.getDate() + 3);
  const y = thu.getFullYear();
  const jan4 = new Date(y, 0, 4);
  const week1Thu = new Date(jan4);
  week1Thu.setDate(jan4.getDate() - ((jan4.getDay() + 6) % 7) + 3);
  const w = Math.round((thu.getTime() - week1Thu.getTime()) / (7 * 86400000)) + 1;
  return { year: y, week: w };
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "short" });
}

interface Props {
  initialYear: number;
  initialWeek: number;
  userId: string;
  userRole: string;
}

export default function WeekView({ initialYear, initialWeek, userId, userRole }: Props) {
  const [year, setYear] = useState(initialYear);
  const [week, setWeek] = useState(initialWeek);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [reserving, setReserving] = useState<string | null>(null);

  const fetchSessions = useCallback(async (y: number, w: number) => {
    setLoading(true);
    const res = await fetch(`/api/sessions/week?year=${y}&week=${w}`);
    const data = await res.json();
    setSessions(data.sessions ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSessions(year, week); }, [year, week, fetchSessions]);

  function navigate(delta: number) {
    const next = addWeeks(year, week, delta);
    setYear(next.year);
    setWeek(next.week);
  }

  async function toggleReservation(sessionId: string) {
    setReserving(sessionId);
    const res = await fetch(`/api/sessions/${sessionId}/reserve`, { method: "POST" });
    if (res.ok) {
      const { reserved } = await res.json();
      setSessions(prev => prev.map(s => {
        if (s.id !== sessionId) return s;
        return {
          ...s,
          reservations: reserved
            ? [...s.reservations, { userId }]
            : s.reservations.filter(r => r.userId !== userId),
        };
      }));
    }
    setReserving(null);
  }

  const weekStart = getISOWeekStart(year, week);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    return d;
  });

  function sessionsForDay(day: Date): SessionData[] {
    return sessions.filter(s => {
      const sd = new Date(s.date);
      return sd.getFullYear() === day.getFullYear() &&
        sd.getMonth() === day.getMonth() &&
        sd.getDate() === day.getDate();
    });
  }

  const isAdmin = userRole === "ADMIN";

  return (
    <div className="flex flex-col gap-4">
      {/* Week navigation */}
      <div className="flex items-center justify-between px-1">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-[#f5ede7] text-[#9b6745] text-lg font-bold">←</button>
        <span className="text-sm font-medium text-[#666]">Week {week} — {year}</span>
        <button onClick={() => navigate(1)} className="p-2 rounded-full hover:bg-[#f5ede7] text-[#9b6745] text-lg font-bold">→</button>
      </div>

      {loading && <p className="text-center text-sm text-[#999] py-8">Laden…</p>}

      {!loading && (
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 md:grid md:grid-cols-7 md:overflow-visible md:mx-0 md:px-0">
          {days.map((day, i) => {
            const daySessions = sessionsForDay(day);
            const isToday = day.toDateString() === new Date().toDateString();
            return (
              <div key={i} className="min-w-[160px] snap-start flex-shrink-0 md:min-w-0">
                {/* Day header */}
                <div className={`text-center py-1 mb-2 rounded-lg text-xs font-semibold ${isToday ? "bg-[#9b6745] text-white" : "text-[#666]"}`}>
                  <div>{DAY_LABELS[i]}</div>
                  <div className="text-[10px] font-normal opacity-80">{formatDate(day)}</div>
                </div>

                {/* Session cards */}
                <div className="flex flex-col gap-2">
                  {daySessions.length === 0 && (
                    <div className="h-10 rounded-lg border border-dashed border-gray-100" />
                  )}
                  {daySessions.map(session => {
                    const reserved = session.reservations.some(r => r.userId === userId);
                    const count = session.reservations.length;
                    const full = count >= session.maxParticipants && !reserved;
                    const busy = reserving === session.id;

                    return (
                      <div key={session.id} className="rounded-xl border border-[#f0e6df] bg-[#fdf8f5] p-2.5 flex flex-col gap-1.5">
                        <div className="flex items-start justify-between gap-1">
                          <Link href={`/sessies/${session.id}`} className="text-xs font-semibold text-[#9b6745] leading-tight hover:underline">{session.title}</Link>
                          {isAdmin && (
                            <Link href={`/admin/sessies/${session.id}`} className="text-[10px] text-[#999] hover:text-[#9b6745] shrink-0">✏️</Link>
                          )}
                        </div>
                        <div className="text-[10px] text-[#999]">{session.startTime}–{session.endTime}</div>
                        <div className="text-[10px] text-[#999] truncate">{session.location}</div>

                        {/* Capacity */}
                        <div className="text-[10px]">
                          {count >= session.maxParticipants
                            ? <span className="text-red-500">🔴 VOL ({count}/{session.maxParticipants})</span>
                            : <span className="text-green-600">🟢 {count}/{session.maxParticipants}</span>
                          }
                        </div>

                        {/* Reserve button */}
                        <button
                          onClick={() => toggleReservation(session.id)}
                          disabled={full || busy}
                          className={`mt-1 w-full rounded-lg py-1.5 text-[10px] font-semibold transition ${
                            reserved
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : full
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-[#9b6745] text-white hover:bg-[#7a5237]"
                          }`}
                        >
                          {busy ? "…" : reserved ? "Gereserveerd ✓" : full ? "VOL" : "Reserveer"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
