import Link from "next/link";
import CtaButton from "@/components/public/CtaButton";

export default function HomePage() {
  return (
    <>
      {/* Hero with real image */}
      <section className="relative">
        <img
          src="/uploads/website/BerrylBaby_-3.jpg"
          alt="Berryl Baby zwangerschapsyoga"
          className="w-full h-[60vh] object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="font-[var(--font-vidaloka)] text-4xl md:text-6xl mb-4 drop-shadow-lg">Berryl Baby</h1>
            <p className="text-lg md:text-xl drop-shadow mb-6">Yoga · Pilates · Massage · Dragen in Twente</p>
            <a href="https://www.momoyoga.com/berrylbaby/register" target="_blank" rel="noopener"
              className="bg-white text-[#9b6745] px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#fdf8f5] transition">
              Schrijf je in
            </a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="font-[var(--font-vidaloka)] text-2xl text-[#9b6745] mb-4">Hai, welkom op de Berryl Baby website!</h2>
        <p className="text-[#666] leading-relaxed mb-4">
          Ik ben Berryl, yoga- en Pilatesdocent en bekkenbodemcoach. Ik help jou goed voor je lichaam, en specifiek jouw bekken, te zorgen rondom zwangerschap en geboorte en tijdens het postpartum herstel daarna.
        </p>
        <p className="text-[#666] leading-relaxed mb-4">
          Jij, lieve vrouw, bent zo welkom in mijn lessen zwangerschapsyoga- en Pilates om te verstillen, je focus even alleen op jóu te richten, je grenzen te bewaken en te aaademen…. Het is tijd voor zachtheid voor jouw lichaam en geest…
        </p>
        <p className="text-[#666] leading-relaxed mb-6">
          Het lessenrooster van Berryl Baby zit vol heerlijke yoga en Pilateslessen, voor iedereen en dus ook voor de mom-to-be. Neem een kijkje in het lesrooster en plan jouw me-time op{" "}
          <a href="https://www.momoyoga.com/berrylbaby/register" target="_blank" rel="noopener" className="text-[#9b6745] hover:underline">momoyoga.com/berrylbaby/register</a>{" "}
          of plan jouw (privé) yoga/pilatesles met een simpel whatsApp bericht naar 0621204143.
        </p>
        <p className="text-[#666] leading-relaxed italic">Natúúrlijk ben ik er om een beetje voor jou te zorgen, lieve mom-to-be, rondom jouw zwangerschap en de geboorte ….</p>
      </section>

      {/* Image strip */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {[
          "/uploads/website/FB_IMG_1705836756508.jpg",
          "/uploads/website/BerrylBaby_Zwangerschaps-yoga_-8.jpg",
          "/uploads/website/BerrylBaby_Zwangerschaps-yoga_-13.jpg",
          "/uploads/website/IMG_20210626_135702_551.jpg",
        ].map((src, i) => (
          <img key={i} src={src} alt="Berryl Baby" className="w-full h-48 object-cover" />
        ))}
      </section>

      {/* Services */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-4">Speciaal voor tijdens je zwangerschap:</h2>
          <ul className="text-[#666] text-sm leading-loose flex flex-col gap-2">
            {[
              "Groepslessen Zwangerschapsyoga in Almelo of Wierden en partnerworkshop (optioneel)",
              "Aerial/Hangmat yoga voor iedereen in Twente! Privé of duo, ook heerlijk voor jouw zwangere lijf. 1x per maand ook speciaal voor zwangeren in de groepslessen zwangerschapsyoga",
              "Privé zwangerschapsyoga en Postpartum Pilates/yoga (€25, duo €18 p.p.)",
              "De officiële cursus HypnoBirthing® in Twente (€350 privécursus voor stellen, vergoeding door de zorgverzekering mogelijk)",
              "De Compacte Geboortecursus (2 uur €80 privécursus voor stellen, vergoeding door de zorgverzekering mogelijk)",
            ].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-[#9b6745] shrink-0">•</span>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-4">En Postpartum (na de geboorte):</h2>
          <ul className="text-[#666] text-sm leading-loose flex flex-col gap-2">
            {[
              "Postpartum Yoga/Pilates herstellessen voor core- en shape opbouw",
              "Zachte postpartum privé Pilates of yogales om na de geboorte weer in balans te komen, met ruimte voor jouw verhaal (€25). Voel je welkom.",
              "Aerial Hangmatyoga in Twente! Ook tijdens de Postpartum Pilates/Yoga",
              "Postpartum kraamtijdmassage met warme olie en doTerra AromaTherapie voor ondersteuning bij jou thuis",
              "Rebozo Sluitingsritueel, dit is magisch…",
              "Shantala Babymassage samen met jouw kleintje",
              "MyPelvi Bekkenbodemtraining bij MyPelvi Wierden",
              "Babyshowers, Mother Blessings, Bedrijfsuitjes en vriendinnendagen met yoga en massage, klankschalen, lunch en borrel. Zelf samen te stellen, neem contact op via 0621204143",
            ].map(item => (
              <li key={item} className="flex items-start gap-2"><span className="text-[#9b6745] shrink-0">•</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Schedule */}
      <section className="bg-[#fdf8f5] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[var(--font-vidaloka)] text-2xl text-[#9b6745] mb-2 text-center">Groepslessen Zwangerschapsyoga</h2>
          <p className="text-center text-sm text-[#999] mb-6">Meerdere locaties in Twente, kies uit het lesrooster</p>
          <div className="flex flex-col gap-3">
            {[
              ["Di 18:00", "Groepsles Zwangerschapsyoga", "PT Twente, Handelsweg 2, Wierden"],
              ["Di 19:30", "Groepsles ZwangerschapsPilates", "PT Twente, Handelsweg 2, Wierden"],
              ["Do 19:30", "Groepsles Zwangerschapsyoga", "MFA Eninver, Apollolaan 1, Almelo (ook online)"],
              ["Za 10:30 & 12:00", "Aerial Hangmat Yoga", "Almelo"],
            ].map(([time, title, loc]) => (
              <div key={time} className="bg-white rounded-xl border border-[#f0e6df] px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                <span className="text-sm font-bold text-[#9b6745] w-32 shrink-0">{time}</span>
                <div>
                  <p className="text-sm font-medium text-[#444]">{title}</p>
                  <p className="text-xs text-[#999]">{loc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center text-sm text-[#666]">
            <p>Vast maandbedrag €60 (normale maand van 4 weken) · keuze uit 4 yogalessen per week · volledige online deelname</p>
            <p className="text-[#999] mt-1">Vergoeding door de zorgverzekering mogelijk</p>
          </div>
          <p className="text-center text-sm mt-3">
            <a href="https://www.momoyoga.com/berrylbaby/register" target="_blank" rel="noopener" className="text-[#9b6745] hover:underline">
              Aanmelden via momoyoga.com/berrylbaby/register
            </a>
            {" "}of bel/app 0621204143
          </p>
        </div>
      </section>

      {/* About Berryl */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <img
            src="/uploads/website/BerrylBaby__.jpg"
            alt="Berryl Victorian"
            className="w-full md:w-64 rounded-2xl object-cover"
          />
          <div className="flex-1">
            <h2 className="font-[var(--font-vidaloka)] text-3xl text-[#9b6745] mb-4">Over Berryl</h2>
            <p className="text-[#666] leading-relaxed mb-4">
              Mijn naam is Berryl Victorian, mooi dat je tot hier bent gekomen met lezen. Ik ben getrouwd met Nissan en samen zijn wij de ouders van twee prachtige dochters. Toen onze oudste zich in 2010 aankondigde kwam ik in een voor ons nieuwe wereld terecht en gelukkig vond ik medemoeders en professionals die me wegwijs maakten in de keuzes die je hebt als nieuwgeboren moeder. De draagdoek waarin ik mijn kleintje dicht bij me kon houden bleek bijvoorbeeld een uitkomst en ik vroeg me af waarom niet iederéén dat deed, dragen met een draagdoek of draagzak!
            </p>
            <p className="text-[#666] leading-relaxed mb-4">
              En daarom ben ik sinds 2013 draagdoekconsulent. Ik had zóveel plezier van mijn draagdoek dat ik daar andere ouders ook kennis mee wilde laten maken. Zwangerschap en geboorte, huid-op-huid contact, Veilige Hechting door Nabijheid en het contact met jonge ouders en hun baby vind ik nog steeds geweldig. Ik wil daarin graag ondersteuning bieden zodat jíj niet óók het wiel zelf hoeft uit te vinden…
            </p>
            <p className="text-[#666] leading-relaxed mb-4">
              Kennis geeft Kracht en ik probeer heden ten dage ouders (en dan vooral moeders) te &quot;empoweren&quot; om zelf de regie over hun bevalling, hun kind en hun manier van (op)voeden in de hand te houden en een mooie Balans te (her)vinden in hun leven als mama.
            </p>
            <p className="text-xs text-[#999]">Lid Vereniging van Draagdoekconsulenten sinds 2013 · Gecertificeerd HypnoBirthing® Docent sinds 2021</p>
          </div>
        </div>
      </section>

      {/* Opleiding */}
      <section className="bg-[#fdf8f5] px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[var(--font-vidaloka)] text-xl text-[#9b6745] mb-4">Opleidingen & Certificeringen</h2>
          <p className="text-[#666] text-sm leading-relaxed">
            Mei 2013: Draagconsulent I. Februari 2014: Torsodragen. Juni 2015: Draagconsulent II. 2016: Kinder EHBO, Draagwijzen voor de Zwangere Buik, Basis Kinderyoga, Babyyoga, CarrYoga, Dancing For Birth Teacher Training. 2017: Shantala Babymassage Docenten Opleiding, Fit en Gezond Zwanger, Mama & Baby Yoga licentie, Opleiding Zwangerschapsyoga, Spinning Babies. Mei 2018: afronding Yoga Docenten Opleiding, Yin Yoga specialisatie. Februari 2022: Postpartum Massage en Kraamkost. Mei 2021: HypnoBirthing® Opleiding en licentie. Mei 2022: Aerial Zwangerschapscertificaat, Rebozo Massage training. November 2023: doTerra AromaTouch behandeling. 2025: Pilates Instructeur bij Queno. 2026: Zwangerschap & Pilates bij The Pilates Company van Debbie Jenner.
          </p>
          <p className="text-sm text-[#9b6745] mt-3 font-medium">Lid Vereniging van Draagdoekconsulenten (VDC) sinds 2013 · Gecertificeerd HypnoBirthing® Docent sinds 2021</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#9b6745] py-14 px-4 text-center">
        <h2 className="font-[var(--font-vidaloka)] text-3xl text-white mb-4">Klaar om te beginnen?</h2>
        <p className="text-white/80 mb-8">Schrijf je in via Momoyoga of neem contact op voor meer informatie. Voor meer info of aanmelden: berrylbaby@gmail.com of bel/app 0621204143.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="https://www.momoyoga.com/berrylbaby/register" target="_blank" rel="noopener"
            className="bg-white text-[#9b6745] px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#fdf8f5] transition">
            Schrijf je in via Momoyoga
          </a>
          <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition">
            Stel een vraag
          </Link>
        </div>
      </section>
    </>
  );
}
