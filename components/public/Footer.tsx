import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#fdf8f5] border-t border-[#f0e6df] mt-16 py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="flex-1">
          <p className="font-[var(--font-vidaloka)] text-lg text-[#9b6745] mb-2">BerrylBaby</p>
          <p className="text-sm text-[#999] mb-1">Berryl Victorian</p>
          <p className="text-sm text-[#999]">R.J. Schimmelpenninckstraat 16, 7604AN Almelo</p>
          <p className="text-sm text-[#999]">📞 +31(0)6 2120 4143</p>
          <p className="text-sm text-[#999]">✉️ berrylbaby@gmail.com</p>
          <a href="https://www.facebook.com/YogaAlmelo/" target="_blank" rel="noopener" className="text-sm text-[#9b6745] hover:underline">Facebook</a>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-[#9b6745] uppercase tracking-wide mb-1">Aanbod</p>
          {[
            ["Zwangerschapsyoga & Pilates", "/zwangerschapsyoga"],
            ["Aerial Hangmat Yoga", "/yoga"],
            ["Babymassage", "/babymassage"],
            ["Dragen", "/dragen"],
            ["Fit & in Balans", "/fit-in-balans"],
            ["Tarieven", "/consult"],
            ["Zen Zwanger Retraites", "/zen-zwanger"],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="text-sm text-[#666] hover:text-[#9b6745]">{label}</Link>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-[#9b6745] uppercase tracking-wide mb-1">Direct</p>
          <a href="https://www.momoyoga.com/berrylbaby/register" target="_blank" rel="noopener" className="text-sm text-[#666] hover:text-[#9b6745]">Inschrijven (Momoyoga)</a>
          <Link href="/contact" className="text-sm text-[#666] hover:text-[#9b6745]">Contact</Link>
          <Link href="/inloggen" className="text-sm text-[#666] hover:text-[#9b6745]">Inloggen reserveringssysteem</Link>
          <div className="mt-4 text-xs text-[#bbb]">
            <p>KvK: 65891961</p>
            <p>BTW: NL128466765</p>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-[#bbb] mt-8">© {new Date().getFullYear()} Berryl Baby — Almelo</p>
    </footer>
  );
}
