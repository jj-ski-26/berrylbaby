"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) { setError("Wachtwoord moet minimaal 6 tekens zijn"); return; }
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/dashboard");
    } else {
      const data = await res.json();
      setError(data.error ?? "Registratie mislukt");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-[--font-vidaloka] text-3xl text-[#9b6745] mb-2 text-center">BerrylBaby</h1>
        <p className="text-center text-sm text-[#666] mb-8">Maak een account aan</p>
        <form onSubmit={submit} className="flex flex-col gap-4">
          <input
            type="text" placeholder="Naam" value={name} onChange={e => setName(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#9b6745]"
            required
          />
          <input
            type="email" placeholder="E-mailadres" value={email} onChange={e => setEmail(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#9b6745]"
            required
          />
          <input
            type="password" placeholder="Wachtwoord (min. 6 tekens)" value={password} onChange={e => setPassword(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#9b6745]"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit" disabled={loading}
            className="bg-[#9b6745] text-white rounded-lg py-3 text-sm font-semibold hover:bg-[#7a5237] transition disabled:opacity-50"
          >
            {loading ? "Bezig…" : "Registreer je"}
          </button>
        </form>
        <p className="text-center text-sm text-[#666] mt-6">
          Al een account?{" "}
          <Link href="/inloggen" className="text-[#9b6745] font-medium">Inloggen</Link>
        </p>
      </div>
    </div>
  );
}
