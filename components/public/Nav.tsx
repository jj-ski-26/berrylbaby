"use client";
import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/yoga", label: "Yoga & Pilates" },
  { href: "/zwangerschapsyoga", label: "Zwangerschapsyoga" },
  { href: "/babymassage", label: "Babymassage" },
  { href: "/dragen", label: "Dragen" },
  { href: "/fit-in-balans", label: "Fit & in Balans" },
  { href: "/consult", label: "Consult" },
  { href: "/zen-zwanger", label: "Zen Zwanger Retraites" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#f0e6df]">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-[var(--font-vidaloka)] text-xl text-[#9b6745]">BerrylBaby</Link>
        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} className="text-sm text-[#666] hover:text-[#9b6745] transition">{l.label}</Link>
          ))}
          <Link href="/inloggen" className="ml-4 bg-[#9b6745] text-white text-sm px-4 py-2 rounded-full hover:bg-[#7a5237] transition">Meld je aan</Link>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-[#9b6745] p-1">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {open
              ? <><line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
              : <><line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></>
            }
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#f0e6df] bg-white px-4 py-4 flex flex-col gap-4">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-[#666] hover:text-[#9b6745]">{l.label}</Link>
          ))}
          <Link href="/inloggen" onClick={() => setOpen(false)} className="mt-2 bg-[#9b6745] text-white text-sm px-4 py-2 rounded-full text-center hover:bg-[#7a5237] transition">Meld je aan</Link>
        </div>
      )}
    </nav>
  );
}
