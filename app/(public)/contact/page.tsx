"use client";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <div className="bg-[#fdf8f5] py-12 px-4 text-center border-b border-[#f0e6df]">
        <h1 className="font-[var(--font-vidaloka)] text-4xl text-[#9b6745] mb-2">Contact</h1>
        <p className="text-[#666]">Contact en Privacy Verklaring</p>
      </div>
      <section className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact details */}
        <div>
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-5">Contactgegevens</h2>
          <div className="flex flex-col gap-3 text-sm text-[#666]">
            <div>
              <p className="font-semibold text-[#444]">Berryl Victorian / Berryl Baby</p>
              <p>Praktijkruimte voor Massages en Privé Yoga:</p>
              <p>R.J. Schimmelpenninckstraat 16</p>
              <p>7604AN Almelo</p>
            </div>
            <a href="tel:+31621204143" className="hover:text-[#9b6745]">📞 0621204143</a>
            <a href="https://www.facebook.com/YogaAlmelo/" target="_blank" rel="noopener" className="hover:text-[#9b6745]">📘 Facebook: facebook.com/YogaAlmelo</a>

            <div className="mt-2">
              <p className="font-semibold text-[#444] mb-1">Groepslessen Zwangerschapsyoga — lesrooster:</p>
              <ul className="flex flex-col gap-1">
                <li>• Di 18:00 — PT Twente, Handelsweg 2, Wierden</li>
                <li>• Di 19:30 Pilates — PT Twente, Handelsweg 2, Wierden</li>
                <li>• Do 19:30 — MFA Eninver, Apollolaan 1, Almelo</li>
                <li>• Za 10:30 — Aerial Zwangerschapsyoga, Almelo</li>
              </ul>
            </div>

            <div className="border-t border-[#f0e6df] pt-3">
              <p>CONTACT: app of bel naar <strong>0621204143</strong></p>
              <p><a href="mailto:berrylbaby@gmail.com" className="text-[#9b6745] hover:underline">BERRYLBABY@GMAIL.COM</a></p>
            </div>

            <div className="border-t border-[#f0e6df] pt-3 text-xs text-[#999]">
              <p>KvK: 65891961</p>
              <p>Btw nr: NL128466765</p>
              <p>NL51ABNA0605636893 t.n.v. B. Roberg</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-5">Stuur een bericht</h2>
          <p className="text-sm text-[#666] mb-4">Liever mailen? Stuur je bericht naar <a href="mailto:berrylbaby@gmail.com" className="text-[#9b6745]">berrylbaby@gmail.com</a></p>
          {sent ? (
            <div className="bg-[#f0faf0] border border-[#c2e2bf] rounded-2xl p-8 text-center">
              <p className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-2">Bedankt!</p>
              <p className="text-sm text-[#666]">Je bericht is verstuurd. Berryl neemt zo snel mogelijk contact op.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-[#999] mb-1 block">Naam</label>
                <input value={name} onChange={e => setName(e.target.value)} required
                  className="w-full border border-[#f0e6df] rounded-xl px-4 py-3 text-sm bg-[#fdf8f5] focus:outline-none focus:border-[#9b6745]" />
              </div>
              <div>
                <label className="text-xs text-[#999] mb-1 block">E-mailadres</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full border border-[#f0e6df] rounded-xl px-4 py-3 text-sm bg-[#fdf8f5] focus:outline-none focus:border-[#9b6745]" />
              </div>
              <div>
                <label className="text-xs text-[#999] mb-1 block">Bericht</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} required rows={5}
                  className="w-full border border-[#f0e6df] rounded-xl px-4 py-3 text-sm bg-[#fdf8f5] focus:outline-none focus:border-[#9b6745] resize-none" />
              </div>
              <button type="submit"
                className="bg-[#9b6745] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#7a5237] transition">
                Verstuur
              </button>
            </form>
          )}

          <div className="mt-6 bg-[#fdf8f5] rounded-2xl p-5 border border-[#f0e6df] text-sm text-[#999]">
            <p className="font-semibold text-[#666] mb-2">Privacy Verklaring</p>
            <p className="text-xs leading-relaxed">
              In het kader van de AVG Privacywet is Berryl Victorian van Berryl Baby Babypraktijk & Yoga Centrum Almelo, gevestigd aan de R.J. Schimmelpenninckstraat 16, 7604AN in Almelo, verantwoordelijk voor de verwerking van de persoonsgegevens die u in het contactformulier hieronder invult. Deze persoonsgegevens gebruiken wij om u door u opgevraagde informatie naar uw mailadres of via WhatsApp te verzenden of telefonisch contact met u op te nemen. Deze persoonsgegevens worden door Berryl Baby Babypraktijk & Yoga Centrum Almelo met niemand gedeeld.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
