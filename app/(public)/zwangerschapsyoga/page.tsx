import CtaButton from "@/components/public/CtaButton";

export default function ZwangerschapsyogaPage() {
  return (
    <>
      {/* Hero image */}
      <section className="relative">
        <img src="/uploads/website/BerrylBaby_Zwangerschaps-yoga_-10.jpg" alt="Zwangerschapsyoga" className="w-full h-72 object-cover object-top" />
        <div className="absolute inset-0 bg-black/25 flex items-end p-8">
          <h1 className="font-[var(--font-vidaloka)] text-4xl text-white drop-shadow">Zwangerschapsyoga</h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
        <div>
          <h2 className="font-[var(--font-vidaloka)] text-2xl text-[#9b6745] mb-3">Nee, zwangerschapsyoga is NIET zweverig!</h2>
          <p className="text-[#666] leading-relaxed mb-3">
            Hai, ik ben Berryl, yogadocent en bekkenbodemcoach. En jij bent zwanger, van harte gefeliciteerd! Het is tijd voor zachtheid en zorg voor jóu rondom je zwangerschap, bevalling en kraamtijd…
          </p>
          <p className="text-[#666] leading-relaxed font-medium mb-1">Met tijdens je zwangerschap:</p>
          <ul className="text-[#666] text-sm flex flex-col gap-1 mb-4">
            {[
              "Groepslessen Zwangerschapsyoga in Almelo en Wierden",
              "Aerial Zwangerschapsyoga op de zaterdagochtend",
              "Privé Yogalessen rondom zwangerschap op maat (€25)",
              "De Compacte Geboortecursus van 2 uur (€80 privé voor stellen, vergoeding door de zorgverzekering mogelijk)",
              "De officiële cursus HypnoBirthing® in Twente (€350 privé voor stellen, vergoeding door de zorgverzekering mogelijk)",
              "Zwangerschapsmassage ondersteund door AromaTherapie, zalig… laat je verwennen! €50, op locatie €80",
            ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-[#9b6745]">•</span>{item}</li>)}
          </ul>
          <p className="text-[#666] leading-relaxed font-medium mb-1">En na de geboorte:</p>
          <ul className="text-[#666] text-sm flex flex-col gap-1">
            {[
              "Postpartum Herstelyoga en Pilates, voor core en shape mét baby!",
              "Een heerlijke Postpartum kraammassage voor jóu, ondersteund door AromaTouch van doTERRA (in je eigen huis, ik kom naar je toe) €80",
              "Rebozo Sluitingsritueel met 4 handen massage (gekleed), dit is echt magisch",
              "Workshop Shantala Babymassage, privé of in een gezellig groepje",
            ].map(item => <li key={item} className="flex items-start gap-2"><span className="text-[#9b6745]">•</span>{item}</li>)}
          </ul>
        </div>

        {/* Lesrooster */}
        <div className="bg-[#fdf8f5] rounded-2xl border border-[#f0e6df] p-6">
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-3">Groepslessen — kies uit het lesrooster:</h2>
          <ul className="text-[#666] text-sm flex flex-col gap-2">
            <li>• <strong>Dinsdagavond 18:00</strong> (ZwangerschapsYoga) — PT Twente, Handelsweg 2, Wierden</li>
            <li>• <strong>Dinsdagavond 19:30</strong> (ZwangerschapsPilates) — PT Twente, Handelsweg 2, Wierden</li>
            <li>• <strong>Donderdagavond 19:30</strong> — MFA Eninver, Apollolaan 1, Almelo (ook live online)</li>
            <li>• <strong>Zaterdagochtend 10:30 en 12:00</strong> — Aerial Hangmatyoga in Almelo</li>
            <li>• <strong>Partnerworkshop</strong> (optie) op zaterdagochtend — info uur</li>
          </ul>
          <p className="text-sm text-[#666] mt-3">
            Uniek in Twente: groepslessen zwangerschapsyoga voor een vast maandbedrag (€60) met keuze uit 3 yogalessen doordeweeks én de zaterdagochtenden, de lessen zijn ook live online te volgen vanuit je eigen huis.
          </p>
          <p className="text-sm text-[#999] mt-2">
            Hier kun je jouw plekje reserveren:{" "}
            <a href="https://www.momoyoga.com/berrylbaby/register" target="_blank" rel="noopener" className="text-[#9b6745] hover:underline">momoyoga.com/berrylbaby/register</a>
          </p>
          <p className="text-sm text-[#999]">Veel verzekeraars vergoeden een zwangerschapscursus van Berryl Baby geheel of gedeeltelijk.</p>
        </div>

        {/* Full text */}
        <div>
          <p className="text-[#666] leading-relaxed mb-4">
            De groepslessen Zwangerschapsyoga van Berryl Baby in Wierden en Almelo zijn o.a. gebaseerd op de HypnoBirthing® ademmethode en betekenen een uur bewust aandacht geven aan het kindje in je buik en je voorbereiden op een mooie vlotte bevalling. Je kunt met zwangerschapsyoga beginnen vanaf je eerste goede echo bij de verloskundige en ook als je in de laatste weken pas instroomt kun je je goed voorbereiden op een mooie bevalling waarin jij en je partner zo lang het medisch verantwoord is de regie houden.
          </p>
          <p className="text-[#666] leading-relaxed mb-4">
            Ademtechnieken uit de HypnoBirthing® ademmethode, spierversterkende oefeningen (die beenspieren heb je nodig tijdens je bevalling!), verkleinen van de kans op bekkenpijn, gebruik van de zwaartekracht tijdens de baring en letterlijk én figuurlijk in balans blijven tijdens deze bijzondere en intense fase in je leven, het draagt allemaal bij aan een vlottere bevalling en een sneller herstel daarna.
          </p>
          <p className="text-[#666] leading-relaxed mb-4">
            We oefenen in een gezellig groepje moms-to-be voor herkenning en steun, maken kennis met draagdoeken en behandelen tijdens de lessen onderwerpen om te &quot;empoweren&quot;, want kennis geeft kracht.
          </p>
          <blockquote className="border-l-4 border-[#9b6745] pl-4 italic text-[#666] my-4">&quot;Kennis geeft kracht&quot;</blockquote>
          <p className="text-[#666] leading-relaxed mb-4">
            De hele cursus is er op gericht om ruimte te maken in je lichaam (en je leven) en de baby uit te nodigen om in de optimale positie te (gaan) liggen om medisch ingrijpen tijdens de bevalling te vermijden en zoveel mogelijk de regie over je bevalling te kunnen behouden. Beweegt de moeder, dan beweegt de baby! We maken gebruik van de zwaartekracht, HypnoBirthing® ademhalingstechnieken, ontspanning van de spieren in de onderrug en het bekken, positieve overtuigingskracht, het Aerialdoek en Dancing For Birth en Spinning Babies® technieken, Moxa-begeleiding en Rebozo.
          </p>
        </div>

        {/* Photo */}
        <img src="/uploads/website/BerrylBaby_Zwangerschaps-yoga-3.jpg" alt="Zwangerschapsyoga les" className="w-full rounded-2xl object-cover max-h-80" />

        {/* Compacte Geboortecursus */}
        <div className="bg-[#fef0f0] rounded-2xl p-6">
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-3">Compacte Geboortecursus (privé, 2 uur)</h2>
          <p className="text-[#666] leading-relaxed mb-3">
            Ook zonder yoga? Ja, alles wat jullie moeten weten voor een vlotte geboorte leren jullie als stel privé in de korte maar zeer complete Compacte Geboortecursus. De belangrijkste thema&apos;s uit de groepslessen nemen we samen door: het bereiken van diepe ontspanning, ruimte maken in je lichaam en in jullie leven, wat is er nodig voor een vlotte bevalling, HypnoBirthing® technieken, de helpende handen van de geboortepartner, actieve bevalhoudingen en ademoefeningen, gegoten in een programma van 2 uur, óók te boeken als opfriscursus.
          </p>
          <p className="text-[#666] mb-2">Kosten: €80 · vergoeding door zorgverzekering mogelijk</p>
          <blockquote className="border-l-4 border-[#e29393] pl-4 italic text-[#666] text-sm">&quot;Bedankt voor de ontzettend leerzame middag! Wij zijn echt mega enthousiast naar huis gegaan.&quot;</blockquote>
        </div>

        {/* HypnoBirthing */}
        <div className="bg-[#fdf8f5] rounded-2xl border border-[#f0e6df] p-6">
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-3">De officiële HypnoBirthing® cursus (5 bijeenkomsten)</h2>
          <p className="text-[#666] leading-relaxed mb-3">
            HypnoBirthing® is zowel een filosofie als een techniek. Het is een positieve, ontspannen en stressvrije manier om jullie kindje welkom te heten, waarbij je fysiek, mentaal en spiritueel goed wordt voorbereid op een meer gemakkelijke, comfortabele en zachte geboorte door middel van een uitgekiend programma van diepe ontspanning, zelfhypnose en informatie die vrouwen terugbrengt naar hun vermogen om natuurlijk te baren en hun kind veilig en makkelijker ter wereld te brengen.
          </p>
          <p className="text-[#666] leading-relaxed mb-3">
            De steun en warme aanwezigheid van de partner is daarbij onmisbaar en van heel grote waarde. Daarom oefenen jullie sámen, in 5 bijeenkomsten van 2 uur.
          </p>
          <p className="text-[#666] mb-2"><strong>Kosten:</strong> €350 per stel (privécursus in de praktijk in Almelo)</p>
          <p className="text-[#666] mb-4">Veel zorgverzekeraars vergoeden een HypnoBirthing® cursus geheel of gedeeltelijk.</p>
          <CtaButton href="/contact">Meer info of aanmelden</CtaButton>
        </div>

        {/* Zen Verwen / Massage */}
        <div>
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-3">De Zen Verwen Coach</h2>
          <p className="text-[#666] leading-relaxed mb-3">
            Berryl is ook DE ZEN VERWEN COACH. Vanaf zwangerschapswens tot vér na de kraamweek zorgt zij een beetje voor jou en jouw lieve lijf. Met een milde zwangerschapsmassage met voetenbad en aandacht voor jouw kwaaltjes en een heerlijke ontspanningsmassage met verwarmde olie voor iedere vrouw (€50).
          </p>
          <p className="text-[#666] leading-relaxed mb-3">
            Ervaar ook na de geboorte een heerlijke Kraamtijdmassage in de kraamweek bij jou thuis. En vanaf 40 dagen postpartum het oeroude Rebozo sluitingsritueel in de veilige bedding van mijn kleine holistische praktijkruimte in Almelo om je zwangerschap en bevalling en de 40 dagen kraamtijd liefdevol af te sluiten. Voorafgegaan door een voetenbad en een 4 handen massage, met als bonus na het Sluitingsritueel diepe ontspanning in het Aerial doek. Met thee en iets lekkers. Echt een belevenis en een cadeautje voor jezelf of om cadeau te geven.
          </p>
          <p className="text-[#666] mb-3">(allebei €80, kraamtijdmassage + sluitingsritueel samen te boeken of cadeau te geven voor €150)</p>
        </div>

        {/* Yoga Nidra */}
        <div className="bg-[#fdf8f5] rounded-2xl p-6">
          <h2 className="font-[var(--font-vidaloka)] text-lg text-[#9b6745] mb-2">YOGA NIDRA — ME-TIME FOR YOU</h2>
          <p className="text-[#666] text-sm leading-relaxed">
            Yoga Nidra is even hé-le-maal niks! Laat je begeleiden naar diepe ontspanning, naar verwerken, naar doelen verwezelijken door gedragsverandering bij jezelf in gang te zetten. Voor iedereen. Ook om gewoon lekker efficiënt even bij te slapen (ja, déze is voor jou, lieve mama!) App/bel 0621204143 (€25 p.p. Duo ook mogelijk €18 p.p.)
          </p>
        </div>

        <div className="text-center">
          <p className="text-sm text-[#666] mb-4">Voor meer info en aanmelden: <a href="mailto:berrylbaby@gmail.com" className="text-[#9b6745]">berrylbaby@gmail.com</a> of app/bel 0621204143</p>
          <a href="https://www.momoyoga.com/berrylbaby/register" target="_blank" rel="noopener"
            className="bg-[#9b6745] text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#7a5237] transition">
            Schrijf je in via Momoyoga
          </a>
        </div>
      </section>
    </>
  );
}
