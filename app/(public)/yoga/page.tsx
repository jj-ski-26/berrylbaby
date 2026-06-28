export default function YogaPage() {
  return (
    <>
      <section className="relative">
        <img src="/uploads/website/BerrylBaby_Zwangerschaps-yoga_-8.jpg" alt="Aerial Hangmat Yoga" className="w-full h-72 object-cover" />
        <div className="absolute inset-0 bg-black/25 flex items-end p-8">
          <h1 className="font-[var(--font-vidaloka)] text-4xl text-white drop-shadow">Aerial Hangmat Yoga</h1>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
        <p className="text-[#666] leading-relaxed text-lg">
          Aerial/Hangmat yoga voor iedereen in Twente! Privé of duo, ook heerlijk voor jouw zwangere lijf. 1x per maand ook speciaal voor zwangeren in de groepslessen zwangerschapsyoga.
        </p>

        <div className="bg-[#fdf8f5] rounded-2xl border border-[#f0e6df] p-6">
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-3">Lesrooster Aerial Hangmat Yoga</h2>
          <ul className="text-[#666] text-sm flex flex-col gap-2">
            <li>• <strong>Zaterdagochtend 10:30</strong> — Aerial Hangmat Yoga, Almelo</li>
            <li>• <strong>Zaterdagochtend 12:00</strong> — Aerial Hangmat Yoga, Almelo</li>
          </ul>
          <p className="text-sm text-[#999] mt-3">Abonnement €60/maand · Privéles €25 p.p. · Duo €18 p.p.</p>
          <p className="text-sm text-[#999]">Aanmelden via <a href="https://www.momoyoga.com/berrylbaby/register" target="_blank" rel="noopener" className="text-[#9b6745] hover:underline">momoyoga.com/berrylbaby/register</a></p>
        </div>

        <div>
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-3">Yoga Nidra</h2>
          <p className="text-[#666] leading-relaxed mb-3">
            Yoga Nidra is even hé-le-maal niks! Laat je begeleiden naar diepe ontspanning, naar verwerken, naar doelen verwezelijken door gedragsverandering bij jezelf in gang te zetten. Voor iedereen. Ook om gewoon lekker efficiënt even bij te slapen (ja, déze is voor jou, lieve mama!)
          </p>
          <p className="text-[#666] text-sm">€25 p.p. · Duo €18 p.p. · App/bel 0621204143</p>
        </div>

        <div>
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-3">Therapeutische Yogasessies</h2>
          <p className="text-[#666] leading-relaxed">
            We kennen allemaal periodes van stress en spanning of we maken hele intense gebeurtenissen mee in ons leven, waarmee we geen raad weten, die we niet makkelijk kunnen verwerken of loslaten. Therapeutische yogasessies met ademen, yoga, meditatie en beweging zijn er voor jou om jouw stress en trauma te verzachten en te verlichten. Al wiegend mediteren in het yogadoek, jouw stressniveau kan echt omlaag. Yogalessen met een therapeutisch oogmerk: €25 p.p.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <img src="/uploads/website/BerrylBaby_Zwangerschaps-yoga_-13.jpg" alt="Yoga" className="rounded-xl object-cover w-full h-40" />
          <img src="/uploads/website/IMG_20210626_135702_551.jpg" alt="Yoga groep" className="rounded-xl object-cover w-full h-40" />
        </div>

        <div className="text-center">
          <a href="https://www.momoyoga.com/berrylbaby/register" target="_blank" rel="noopener"
            className="bg-[#9b6745] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#7a5237] transition">
            Schrijf je in via Momoyoga
          </a>
        </div>
      </section>
    </>
  );
}
