import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, Check, ShieldCheck } from "lucide-react";
import { extras, movePriceRows, PER_SQM_OVER_180 } from "@/lib/flytt";
import { generalFaq, rutFaq, serviceBySlug, services } from "@/lib/services";
import { AddonCalculator, FaqList, LeadForm } from "@/components/interactive";
import { HeroIn, Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { ServicePage } from "@/components/service-page";

const fmt = (n: number) => n.toLocaleString("sv-SE");

function PriceTable({head,rows}:{head:string[];rows:string[][]}) {
  return <table className="w-full text-left text-sm"><thead><tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">{head.map((h,i)=><th key={h} className={`px-6 py-3 font-bold ${i?"text-right":""}`}>{h}</th>)}</tr></thead><tbody>{rows.map(([a,b])=><tr key={a} className="border-t border-slate-100"><td className="px-6 py-3 font-semibold">{a}</td><td className="px-6 py-3 text-right font-extrabold text-[#e85f00]">{b}</td></tr>)}</tbody></table>;
}

const pages: Record<string,string> = {
  priser:"Priser & RUT-avdrag",
  "faq-kontakt":"Frågor & kontakt",
  villkor:"Allmänna villkor",
  integritet:"Integritetspolicy",
};
const paths = [...services.map((s)=>s.slug), ...Object.keys(pages)];
export function generateStaticParams() { return paths.map((slug)=>({slug})); }

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const s=serviceBySlug[slug];
  if(s) return {title:`${s.metaTitle} | Let's Clean Göteborg`,description:s.metaDescription};
  return {title:`${pages[slug]??"Let's Clean Göteborg"} | Let's Clean Göteborg`,description:"Trygg städning och flytthjälp i Göteborg med fast pris och RUT-avdrag direkt på fakturan."};
}

function PageIntro({eyebrow,title,copy}:{eyebrow:string,title:string,copy:string}) {
  return <section className="hero"><HeroIn className="container py-12 md:py-16"><p className="eyebrow">{eyebrow}</p><h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-.04em] sm:text-5xl">{title}</h1><p className="mt-4 max-w-2xl leading-7 text-slate-600">{copy}</p></HeroIn></section>;
}

export default async function ContentPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  if(!paths.includes(slug)) notFound();
  const service=serviceBySlug[slug];

  if(slug==="flyttstadning") return <ServicePage s={service}>
    <section className="section"><div className="container">
      <Stagger className="grid items-start gap-6 lg:grid-cols-2">
        <StaggerItem className="card scroll-mt-28 overflow-hidden">
          <div id="priser" className="scroll-mt-28">
            <div className="p-6 pb-4"><p className="eyebrow">Priser för flyttstädning</p><h2 className="mt-1 text-2xl font-black">Du betalar</h2><p className="mt-2 text-sm leading-6 text-slate-600">Priserna gäller efter 50% RUT-avdrag. Fönsterputs och kvalitetsgaranti ingår.</p></div>
            <PriceTable head={["Yta","Du betalar"]} rows={[...movePriceRows.map(r=>[`${r.from}–${r.to} m²`,`${fmt(r.price)} kr`]),["115–180 m²","Fast pris i offert"],["Över 180 m²",`${PER_SQM_OVER_180} kr/m²`]]}/>
          </div>
        </StaggerItem>
        <StaggerItem className="card overflow-hidden">
          <div id="tillagg" className="scroll-mt-28">
            <div className="p-6 pb-4"><p className="eyebrow">Tilläggstjänster</p><h2 className="mt-1 text-2xl font-black">Extra för ett komplett resultat</h2><p className="mt-2 text-sm leading-6 text-slate-600">Tillvalen ingår inte i grundpriset utan bokas separat mot en tilläggskostnad.</p></div>
            <PriceTable head={["Tillägg","Du betalar"]} rows={extras.map(([n,c])=>[n,`+ ${c} kr`])}/>
          </div>
        </StaggerItem>
      </Stagger>
      <Reveal className="mt-8"><AddonCalculator/></Reveal>
    </div></section>
  </ServicePage>;

  if(service) return <ServicePage s={service}/>;

  if(slug==="priser") return <>
    <PageIntro eyebrow="Tydliga priser, inga överraskningar" title="Priser & RUT-avdrag" copy="Med RUT-avdrag betalar du bara hälften av arbetskostnaden. Vi gör avdraget direkt på fakturan och sköter ansökan till Skatteverket."/>
    <section className="section"><Stagger className="container grid items-start gap-8 md:grid-cols-2">
      <StaggerItem className="card p-7"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><BadgeCheck/></span><h2 className="mt-5 text-2xl font-black">Så fungerar RUT</h2><p className="mt-3 text-sm leading-7 text-slate-600">RUT-avdraget ger 50% skattereduktion på arbetskostnaden för hushållsnära tjänster, upp till 50 000 kronor per person och år. Du behöver vara privatperson med skatt att reducera.</p><div className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-900">Vi drar av RUT direkt på fakturan och ansöker hos Skatteverket. Du betalar det reducerade beloppet.</div></StaggerItem>
      <StaggerItem className="card overflow-hidden"><div className="p-6 pb-4"><p className="eyebrow">Flyttstädning</p><h2 className="mt-1 text-2xl font-black">Pris efter RUT</h2></div><PriceTable head={["Yta","Du betalar"]} rows={[...movePriceRows.map(r=>[`${r.from}–${r.to} m²`,`${fmt(r.price)} kr`]),["115–180 m²","Fast pris i offert"],["Över 180 m²",`${PER_SQM_OVER_180} kr/m²`]]}/><div className="p-6"><Link href="/flyttstadning#tillagg" className="button w-full">Se tillägg och räkna ut ditt pris <ArrowRight size={16}/></Link></div></StaggerItem>
    </Stagger></section>
    <section className="section section-soft"><div className="container"><h2 className="mb-6 text-3xl font-black">Pris för övriga tjänster</h2><div className="grid gap-4 md:grid-cols-3">{services.filter(s=>s.slug!=="flyttstadning").map(s=><Link key={s.slug} href={`/${s.slug}`} className="card p-5 transition hover:-translate-y-1"><b>{s.name}</b><p className="mt-2 text-sm leading-6 text-slate-600">Pris sätts efter ditt behov och bekräftas i en kostnadsfri offert.</p><span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#e85f00]">Läs mer <ArrowRight size={15}/></span></Link>)}</div></div></section>
    <section className="section"><div className="container max-w-3xl"><h2 className="mb-6 text-3xl font-black">Vanliga frågor om RUT</h2><FaqList items={rutFaq}/></div></section>
  </>;

  if(slug==="villkor") return <>
    <PageIntro eyebrow="Tydlighet från första kontakt" title="Allmänna villkor" copy="Här samlar vi information om bokning, utförande och betalning. Villkoren bekräftas alltid i samband med din offert."/>
    <section className="section"><article className="container prose max-w-3xl"><h2 className="text-2xl font-black">Bokning och pris</h2><p className="mt-3 leading-7 text-slate-600">Bokning blir bindande när du har godkänt vår offert och fått en bokningsbekräftelse. Bekräftelsen anger tjänstens omfattning, datum, pris och eventuella tillägg. Ändringar ska stämmas av med oss i förväg.</p><h2 className="mt-8 text-2xl font-black">Avbokning och tillträde</h2><p className="mt-3 leading-7 text-slate-600">Avbokningsvillkor och eventuella avgifter framgår av din offert eller bokningsbekräftelse. Du ansvarar för att vi har överenskommet tillträde till bostaden och att el och vatten finns tillgängligt när tjänsten kräver det.</p><h2 className="mt-8 text-2xl font-black">Reklamation och garanti</h2><p className="mt-3 leading-7 text-slate-600">Kontakta oss så snart som möjligt om något inte motsvarar det vi kommit överens om. Flyttstädning omfattas av 15 dagars garanti enligt uppgifterna i din bokningsbekräftelse.</p><h2 className="mt-8 text-2xl font-black">Frågor</h2><p className="mt-3 leading-7 text-slate-600">Kontakta oss på <a className="text-[#e85f00] underline" href="mailto:info@letscleangoteborg.se">info@letscleangoteborg.se</a> eller 031-320 45 56.</p></article></section>
  </>;

  if(slug==="integritet") return <>
    <PageIntro eyebrow="Dina uppgifter, ditt förtroende" title="Integritetspolicy" copy="Vi behandlar personuppgifter med omsorg och använder dem bara för att hantera din kontakt och de tjänster du ber om."/>
    <section className="section"><article className="container max-w-3xl"><h2 className="text-2xl font-black">Uppgifter du lämnar</h2><p className="mt-3 leading-7 text-slate-600">När du kontaktar oss kan vi behandla namn, kontaktuppgifter, adress och information om tjänsten du efterfrågar. Uppgifterna används för att svara på din förfrågan, lämna offert och administrera en eventuell bokning.</p><h2 className="mt-8 text-2xl font-black">Delning och lagring</h2><p className="mt-3 leading-7 text-slate-600">Vi säljer inte dina personuppgifter. Uppgifter delas endast när det behövs för att hantera tjänsten eller följa lagkrav. Vi sparar dem inte längre än vad ändamålet eller tillämplig lag kräver.</p><h2 className="mt-8 text-2xl font-black">Dina rättigheter</h2><p className="mt-3 leading-7 text-slate-600">Du kan begära information om vilka personuppgifter vi behandlar, be om rättelse eller radering när reglerna medger det. Kontakta oss på <a className="text-[#e85f00] underline" href="mailto:info@letscleangoteborg.se">info@letscleangoteborg.se</a>.</p></article></section>
  </>;

  return <>
    <PageIntro eyebrow="Vi finns här för dig" title="Frågor? Vi hjälper dig gärna." copy="Hör av dig så guidar vi dig rätt. Vi svarar på frågor, hjälper dig välja tjänst och tar fram en kostnadsfri offert."/>
    <section className="section"><div className="container grid items-start gap-8 md:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Vanliga frågor</p><h2 className="mb-5 mt-2 text-3xl font-black">Bra att veta</h2><FaqList items={[...generalFaq,...rutFaq]}/></div><div><div className="mb-5 rounded-xl bg-orange-50 p-4 text-sm leading-6 text-slate-700"><b>Ring oss:</b> <a className="text-[#e85f00] underline" href="tel:0313204556">031-320 45 56</a> · Mån–sön 08.00–19.00<br/><b>E-post:</b> <a className="text-[#e85f00] underline" href="mailto:info@letscleangoteborg.se">info@letscleangoteborg.se</a></div><LeadForm/></div></div></section>
  </>;
}
