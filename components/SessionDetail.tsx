"use client";

import { useState } from "react";
import Image from "next/image";

interface UserRef { id: string; name: string; avatarUrl?: string | null }
interface ReservationRef { id: string; user: UserRef }
interface MessageRef { id: string; content: string; createdAt: string; user: UserRef }
interface SessionData {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxParticipants: number;
  instructor?: UserRef | null;
  reservations: ReservationRef[];
  messages: MessageRef[];
}

function Avatar({ user, size = 40 }: { user: UserRef; size?: number }) {
  if (user.avatarUrl) {
    return (
      <Image
        src={user.avatarUrl} alt={user.name}
        width={size} height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = user.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div
      className="rounded-full bg-[#f0e6df] flex items-center justify-center text-[#9b6745] font-semibold"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

function formatDateNL(dateStr: string, startTime: string, endTime: string): string {
  const d = new Date(dateStr);
  const days = ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"];
  const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} · ${startTime}–${endTime}`;
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" });
}

export default function SessionDetail({
  session: initial,
  currentUserId,
  currentUserRole,
}: {
  session: SessionData;
  currentUserId: string;
  currentUserRole: string;
}) {
  const [session, setSession] = useState<SessionData>(initial);
  const [reserving, setReserving] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [sending, setSending] = useState(false);

  const reserved = session.reservations.some(r => r.user.id === currentUserId);
  const full = session.reservations.length >= session.maxParticipants && !reserved;
  const isAdmin = currentUserRole === "ADMIN";
  const canMessage = reserved || isAdmin;

  async function toggleReservation() {
    setReserving(true);
    const res = await fetch(`/api/sessions/${session.id}/reserve`, { method: "POST" });
    if (res.ok) {
      // Re-fetch full session to update participant list
      const r2 = await fetch(`/api/sessions/${session.id}`);
      if (r2.ok) {
        const data = await r2.json();
        setSession(data.session);
      }
    }
    setReserving(false);
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!messageText.trim()) return;
    setSending(true);
    const res = await fetch(`/api/sessions/${session.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: messageText }),
    });
    if (res.ok) {
      const { message } = await res.json();
      setSession(prev => ({ ...prev, messages: [...prev.messages, message] }));
      setMessageText("");
    }
    setSending(false);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-6">

      {/* Session info */}
      <section className="rounded-2xl border border-[#f0e6df] bg-[#fdf8f5] p-5 flex flex-col gap-3">
        <h2 className="font-[var(--font-vidaloka)] text-2xl text-[#9b6745]">{session.title}</h2>
        <p className="text-sm text-[#666]">{formatDateNL(session.date, session.startTime, session.endTime)}</p>
        <p className="text-sm text-[#666]">📍 {session.location}</p>
        {session.description && <p className="text-sm text-[#666] leading-relaxed">{session.description}</p>}

        {/* Instructor */}
        {session.instructor && (
          <div className="flex items-center gap-2 pt-1">
            <Avatar user={session.instructor} size={32} />
            <span className="text-sm text-[#666]">Docent: <strong>{session.instructor.name}</strong></span>
          </div>
        )}

        {/* Reserve button */}
        <button
          onClick={toggleReservation}
          disabled={full || reserving}
          className={`mt-2 w-full rounded-xl py-3 text-sm font-semibold transition ${
            reserved
              ? "bg-green-50 text-green-700 border border-green-200"
              : full
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-[#9b6745] text-white hover:bg-[#7a5237]"
          }`}
        >
          {reserving ? "…" : reserved ? "Gereserveerd ✓ (klik om te annuleren)" : full ? "Sessie is vol" : "Reserveer deze sessie"}
        </button>
      </section>

      {/* Participants */}
      <section>
        <h3 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745] mb-3">
          Deelnemers — {session.reservations.length} van {session.maxParticipants} plaatsen bezet
        </h3>
        {session.reservations.length === 0 ? (
          <p className="text-sm text-[#999]">Nog geen deelnemers.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {session.reservations.map(r => (
              <div key={r.id} className="flex flex-col items-center gap-1">
                <Avatar user={r.user} size={48} />
                <span className="text-[10px] text-[#999] max-w-[48px] text-center truncate">{r.user.name.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Messages */}
      <section>
        <h3 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745] mb-3">Berichten</h3>

        {session.messages.length === 0 && (
          <p className="text-sm text-[#999] mb-4">Nog geen berichten.</p>
        )}

        <div className="flex flex-col gap-3 mb-4">
          {session.messages.map(msg => {
            const isMe = msg.user.id === currentUserId;
            return (
              <div key={msg.id} className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}>
                <Avatar user={msg.user} size={36} />
                <div className={`flex flex-col gap-1 max-w-[75%] ${isMe ? "items-end" : ""}`}>
                  <span className="text-[10px] text-[#999]">{msg.user.name} · {formatTime(msg.createdAt)}</span>
                  <div className={`rounded-2xl px-4 py-2.5 text-sm ${isMe ? "bg-[#9b6745] text-white rounded-tr-sm" : "bg-[#fdf8f5] text-[#444] rounded-tl-sm border border-[#f0e6df]"}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {canMessage ? (
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder="Schrijf een bericht…"
              className="flex-1 border border-[#f0e6df] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#9b6745] bg-[#fdf8f5]"
            />
            <button
              type="submit"
              disabled={sending || !messageText.trim()}
              className="bg-[#9b6745] text-white rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-[#7a5237] disabled:opacity-40 transition"
            >
              {sending ? "…" : "Stuur"}
            </button>
          </form>
        ) : (
          <p className="text-xs text-[#999] text-center">Reserveer deze sessie om mee te kunnen chatten.</p>
        )}
      </section>
    </main>
  );
}
