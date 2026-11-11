import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Building2,
  HeartHandshake,
  Home,
  MoveRight,
  Sparkles,
  Truck,
} from "lucide-react";
import { EstimateCard, TrustStrip } from "@/components/interactive";
import { HeroIn, Reveal, Stagger, StaggerItem } from "@/components/reveal";

const services = [
  { title: "Flyttstädning", text: "Lämna det gamla bakom dig. Räkna ut ditt pris direkt.", icon: MoveRight, href: "/flyttstadning", label: "Pris direkt" },
  { title: "Hemstädning", text: "Ett återkommande upplägg som ger mer luft i vardagen.", icon: Home, href: "/hemstadning" },
  { title: "Företagsstädning", text: "Städning som passar era lokaler och arbetstider.", icon: Building2, href: "/foretagsstadning" },
  { title: "Storstädning", text: "En ordentlig genomgång när hemmet behöver en nystart.", icon: Sparkles, href: "/storstadning" },
  { title: "Flytthjälp", text: "Praktisk hjälp när det är dags att byta adress.", icon: Truck, href: "/flytthjalp" },
  { title: "Dödsbo", text: "Varsam hjälp med tömning och städning.", icon: HeartHandshake, href: "/dodsbo" },
];

export default function HomePage() {
  return (
    <>
      <section className="hero hero-modern">
        <div className="container grid items-center gap-10 py-12 md:grid-cols-[1.05fr_.95fr] md:py-16 lg:py-20">
          <HeroIn className="relative z-10">
            <p className="eyebrow">Städning och flytthjälp i Göteborg</p>
            <h1 className="hero-title mt-5 max-w-2xl text-5xl font-black leading-[1.02] tracking-[-.055em] sm:text-6xl lg:text-[70px]">
              Mer tid för <span>livet.</span><br />Vi fixar resten.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Från flyttstädning till återkommande hemstädning – personlig hjälp som gör vardagen lite enklare.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link className="button" href="#pris">Räkna på flyttstädning <ArrowRight size={17} /></Link>
              <Link href="/faq-kontakt#offert" className="button button-light">Be om offert</Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-2"><BadgeCheck size={16} className="text-emerald-600" />Pris efter RUT direkt</span>
              <span className="flex items-center gap-2"><BadgeCheck size={16} className="text-emerald-600" />Tydlig offert</span>
              <span className="flex items-center gap-2"><BadgeCheck size={16} className="text-emerald-600" />Hjälp nära dig</span>
            </div>
          </HeroIn>
          <HeroIn delay={0.15} x={24} className="hero-visual">
            <div className="hero-image" role="img" aria-label="Ljust och välstädat hem" />
            <div className="hero-note">
              <span className="hero-note-icon"><Sparkles size={18} /></span>
              <div><strong>En sak mindre att tänka på</strong><span>Vi tar hand om städningen.</span></div>
            </div>
            <div className="hero-sticker"><span>LSG</span><small>Lokalt i<br />Göteborg</small></div>
          </HeroIn>
        </div>
        <a className="hero-scroll" href="#tjanster"><span>Upptäck våra tjänster</span><ArrowDown size={15} /></a>
      </section>

      <section id="pris" className="container estimate-section scroll-mt-24">
        <Reveal><EstimateCard /></Reveal>
      </section>

      <section id="tjanster" className="section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Välj det du behöver</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Hjälp för hem och flytt</h2></div>
            <Link href="/ovriga-tjanster" className="text-sm font-bold text-[#e85f00]">Se alla tjänster <ArrowRight className="ml-1 inline" size={16} /></Link>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, text, icon: Icon, href, label }) => (
              <StaggerItem key={title}>
                <Link href={href} className="service-card group block">
                  <div className="flex items-center justify-between">
                    <span className="service-icon"><Icon size={22} /></span>
                    {label && <span className="service-label">{label}</span>}
                  </div>
                  <h3 className="mt-7 text-xl font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#e85f00]">Läs mer <ArrowRight size={15} className="transition group-hover:translate-x-1" /></span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="eyebrow">Enkelt att komma igång</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Smidig hjälp, steg för steg</h2>
            <p className="mt-3 leading-7 text-slate-600">Du berättar vad du behöver. Vi återkommer med ett upplägg och pris innan något bokas.</p>
          </div>
          <Reveal><TrustStrip /></Reveal>
          <Stagger className="process-grid mt-12 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Berätta om ditt behov", "Välj tjänst och skicka några uppgifter om bostaden eller lokalen."],
              ["02", "Få ett tydligt förslag", "Vi går igenom önskemål och omfattning tillsammans med dig."],
              ["03", "Boka när det passar", "När du har godkänt offerten hittar vi en tid som fungerar."],
            ].map(([n, title, text]) => (
              <StaggerItem key={n} className="process-card">
                <span className="process-number">{n}</span><h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container section-cta">
        <div className="cta-panel">
          <div><p className="text-sm font-bold text-orange-200">Redo när du är</p><h2 className="mt-2 max-w-xl text-3xl font-black leading-tight sm:text-4xl">Låt oss göra plats för det som är viktigt.</h2></div>
          <Link href="/faq-kontakt#offert" className="button button-white">Kontakta oss <ArrowRight size={16} /></Link>
        </div>
      </section>
    </>
  );
}
