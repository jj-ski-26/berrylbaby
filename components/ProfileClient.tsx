"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AvatarCrop from "@/components/ui/AvatarCrop";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: string;
}

function InitialsAvatar({ name, size }: { name: string; size: number }) {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div
      className="rounded-full bg-[#f0e6df] flex items-center justify-center text-[#9b6745] font-semibold select-none"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

export default function ProfileClient({ initialUser }: { initialUser: UserData }) {
  const router = useRouter();
  const [user, setUser] = useState<UserData>(initialUser);
  const [name, setName] = useState(initialUser.name);
  const [email, setEmail] = useState(initialUser.email);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Avatar crop state
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCropSrc(url);
    // Reset input so same file can be re-selected
    e.target.value = "";
  }

  async function handleCropConfirm(file: File) {
    setCropSrc(null);
    setUploadingAvatar(true);
    const form = new FormData();
    form.append("avatar", file);
    const res = await fetch("/api/profile/avatar", { method: "POST", body: form });
    if (res.ok) {
      const { avatarUrl } = await res.json();
      setUser(prev => ({ ...prev, avatarUrl }));
    }
    setUploadingAvatar(false);
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setSaving(false);
    if (res.ok) {
      const data = await res.json();
      setUser(prev => ({ ...prev, ...data.user }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      const data = await res.json();
      setSaveError(data.error ?? "Opslaan mislukt");
    }
  }

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/inloggen");
  }

  const avatarSize = 96;

  return (
    <main className="max-w-md mx-auto px-4 py-8 flex flex-col gap-8">
      {cropSrc && (
        <AvatarCrop
          src={cropSrc}
          onConfirm={handleCropConfirm}
          onCancel={() => setCropSrc(null)}
        />
      )}

      {/* Avatar section */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadingAvatar}
          className="relative group"
          aria-label="Foto wijzigen"
        >
          {user.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={avatarSize}
              height={avatarSize}
              className="rounded-full object-cover"
              style={{ width: avatarSize, height: avatarSize }}
            />
          ) : (
            <InitialsAvatar name={user.name} size={avatarSize} />
          )}
          <div className="absolute inset-0 rounded-full bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <span className="text-white text-xs font-medium">{uploadingAvatar ? "…" : "Wijzig"}</span>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
        <p className="text-xs text-[#999]">Tik op de foto om te wijzigen</p>
        {user.role === "ADMIN" && (
          <span className="text-xs bg-[#9b6745] text-white px-3 py-1 rounded-full">Beheerdersaccount</span>
        )}
      </div>

      {/* Edit form */}
      <form onSubmit={saveProfile} className="flex flex-col gap-4">
        <div>
          <label className="text-xs text-[#999] mb-1 block">Naam</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border border-[#f0e6df] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9b6745] bg-[#fdf8f5]"
            required
          />
        </div>
        <div>
          <label className="text-xs text-[#999] mb-1 block">E-mailadres</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-[#f0e6df] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#9b6745] bg-[#fdf8f5]"
            required
          />
        </div>
        {saveError && <p className="text-red-500 text-sm">{saveError}</p>}
        {saveSuccess && <p className="text-green-600 text-sm">Wijzigingen opgeslagen ✓</p>}
        <button
          type="submit"
          disabled={saving}
          className="bg-[#9b6745] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#7a5237] disabled:opacity-50 transition"
        >
          {saving ? "Opslaan…" : "Opslaan"}
        </button>
      </form>

      {/* Sign out */}
      <div className="border-t border-[#f0e6df] pt-6">
        <button
          onClick={signOut}
          className="w-full border border-[#f0e6df] rounded-xl py-3 text-sm text-[#999] hover:text-[#9b6745] hover:border-[#9b6745] transition"
        >
          Uitloggen
        </button>
      </div>
    </main>
  );
}
