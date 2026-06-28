"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface UserOption { id: string; name: string }
interface SessionValues {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxParticipants: string;
  instructorId: string;
}

interface Props {
  initial?: Partial<SessionValues>;
  sessionId?: string;
  instructors: UserOption[];
}

const LOCATIONS = ["Almelo", "Wierden", "Online"];

export default function SessionForm({ initial, sessionId, instructors }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<SessionValues>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    date: initial?.date ?? "",
    startTime: initial?.startTime ?? "",
    endTime: initial?.endTime ?? "",
    location: initial?.location ?? "Almelo",
    maxParticipants: initial?.maxParticipants ?? "10",
    instructorId: initial?.instructorId ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  function set(field: keyof SessionValues, value: string) {
    setValues(prev => ({ ...prev, [field]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = sessionId ? `/api/admin/sessions/${sessionId}` : "/api/admin/sessions";
    const method = sessionId ? "PATCH" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Opslaan mislukt");
    }
  }

  async function deleteSession() {
    if (!sessionId) return;
    if (!confirm("Sessie verwijderen? Dit kan niet ongedaan worden gemaakt.")) return;
    setDeleting(true);
    const res = await fetch(`/api/admin/sessions/${sessionId}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setDeleting(false);
      setError("Verwijderen mislukt");
    }
  }

  const inputClass = "w-full border border-[#f0e6df] rounded-xl px-4 py-3 text-sm bg-[#fdf8f5] focus:outline-none focus:border-[#9b6745]";

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div>
        <label className="text-xs text-[#999] mb-1 block">Titel *</label>
        <input value={values.title} onChange={e => set("title", e.target.value)} required className={inputClass} placeholder="bijv. Zwangerschapsyoga" />
      </div>
      <div>
        <label className="text-xs text-[#999] mb-1 block">Omschrijving</label>
        <textarea value={values.description} onChange={e => set("description", e.target.value)} rows={3} className={`${inputClass} resize-none`} placeholder="Optionele beschrijving" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#999] mb-1 block">Datum *</label>
          <input type="date" value={values.date} onChange={e => set("date", e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#999] mb-1 block">Locatie *</label>
          <select value={values.location} onChange={e => set("location", e.target.value)} className={inputClass}>
            {LOCATIONS.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#999] mb-1 block">Begintijd *</label>
          <input type="time" value={values.startTime} onChange={e => set("startTime", e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#999] mb-1 block">Eindtijd *</label>
          <input type="time" value={values.endTime} onChange={e => set("endTime", e.target.value)} required className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-[#999] mb-1 block">Max. deelnemers *</label>
          <input type="number" min={1} max={50} value={values.maxParticipants} onChange={e => set("maxParticipants", e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className="text-xs text-[#999] mb-1 block">Docent</label>
          <select value={values.instructorId} onChange={e => set("instructorId", e.target.value)} className={inputClass}>
            <option value="">— geen —</option>
            {instructors.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex-1 bg-[#9b6745] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#7a5237] disabled:opacity-50 transition">
          {saving ? "Opslaan…" : sessionId ? "Wijzigingen opslaan" : "Sessie aanmaken"}
        </button>
        {sessionId && (
          <button type="button" onClick={deleteSession} disabled={deleting}
            className="px-4 py-3 border border-red-200 text-red-500 rounded-xl text-sm hover:bg-red-50 disabled:opacity-50 transition">
            {deleting ? "…" : "Verwijder"}
          </button>
        )}
      </div>
    </form>
  );
}
