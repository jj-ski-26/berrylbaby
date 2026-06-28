"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserRoleToggle({ userId, currentRole }: { userId: string; currentRole: string }) {
  const router = useRouter();
  const [role, setRole] = useState(currentRole);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    const newRole = role === "ADMIN" ? "USER" : "ADMIN";
    setLoading(true);
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    setLoading(false);
    if (res.ok) {
      setRole(newRole);
      router.refresh();
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium transition ${
        role === "ADMIN"
          ? "bg-[#9b6745] text-white hover:bg-[#7a5237]"
          : "border border-[#f0e6df] text-[#999] hover:border-[#9b6745] hover:text-[#9b6745]"
      }`}
    >
      {loading ? "…" : role === "ADMIN" ? "Beheerder" : "Gebruiker"}
    </button>
  );
}
