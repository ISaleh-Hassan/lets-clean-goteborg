"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatedNumber } from "@/components/reveal";
import { extras, movePrice } from "@/lib/flytt";
import { generalFaq, type Faq } from "@/lib/services";
import { ArrowRight, ChevronDown, ShieldCheck, Sparkles } from "lucide-react";

const services = ["Flyttstädning", "Hemstädning", "Storstädning", "Företagsstädning", "Flytthjälp", "Dödsbo"];
const sumExtras = (selected: string[]) => selected.reduce((sum, name) => sum + (extras.find(([label]) => label === name)?.[1] ?? 0), 0);
export function EstimateCard() {
  const [service, setService] = useState("Flyttstädning");
  const [area, setArea] = useState(75);
  const [selected, setSelected] = useState<string[]>([]);
  const base = service === "Flyttstädning" ? movePrice(area) : null;
  const price = base === null ? null : base + sumExtras(selected);
  function toggle(name: string) { setSelected((value) => value.includes(name) ? value.filter((item) => item !== name) : [...value, name]); }
  const quoteHref = `/faq-kontakt?yta=${area}&tjanst=${encodeURIComponent(service)}&tillagg=${encodeURIComponent(selected.join(","))}#offert`;
  return <div className="estimate-card card p-6 sm:p-8">
    <div className="flex items-start justify-between gap-3"><div><p className="eyebrow">Pris på några sekunder</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Vad kostar din flyttstädning?</h2><p className="mt-2 text-sm leading-6 text-slate-600">Ange bostadens storlek och se ett beräknat pris efter RUT.</p></div><span className="estimate-spark"><Sparkles size={20}/></span></div>
    <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_1fr]">
      <div><label className="label" htmlFor="estimate-service">Vad vill du ha hjälp med?</label><select id="estimate-service" className="input" value={service} onChange={(e)=>setService(e.target.value)}>{services.map((name)=><option key={name}>{name}</option>)}</select></div>
      <div><label className="label" htmlFor="estimate-area">Bostadens storlek (m²)</label><input id="estimate-area" className="input" type="number" min="10" max="500" inputMode="numeric" value={area} onChange={(e)=>setArea(Math.min(500,Math.max(10,Number(e.target.value)||10)))}/></div>
    </div>
    {service === "Flyttstädning" && <div className="mt-5"><p className="label">Vanliga tillval</p><div className="grid gap-2 sm:grid-cols-2">{extras.slice(0,4).map(([name,cost])=><label key={name} className="addon-option"><input type="checkbox" className="check" checked={selected.includes(name)} onChange={()=>toggle(name)}/><span>{name}</span><span className="ml-auto whitespace-nowrap text-xs font-semibold text-slate-500">+{cost} kr</span></label>)}</div></div>}
    <div className="estimate-result mt-6">
      <div><span className="block text-xs font-semibold text-slate-600">Beräknat pris efter RUT</span><strong className="mt-1 block text-3xl font-black text-[#e85f00]">{price === null ? "Begär offert" : <AnimatedNumber value={price}/>}</strong></div>
      <span className="rut-pill">50% RUT</span>
    </div>
    <Link className="button mt-4 w-full" href={quoteHref}>Få ett officiellt prisförslag <ArrowRight size={16}/></Link>
    <p className="mt-3 text-center text-xs leading-5 text-slate-500">Priset visas efter RUT-avdrag. Från 200 m² räknas priset som 20 kr per m².</p>
  </div>;
}

export function AddonCalculator() {
  const [area,setArea]=useState(75); const [selected,setSelected]=useState<string[]>([]);
  const base=movePrice(area); const total=base===null?null:base+sumExtras(selected);
  const quoteHref = `/faq-kontakt?yta=${area}&tjanst=${encodeURIComponent("Flyttstädning")}&tillagg=${encodeURIComponent(selected.join(","))}#offert`;
  return <div className="card p-6 sm:p-8">
    <div className="grid gap-7 md:grid-cols-[.8fr_1.2fr]">
      <div><p className="eyebrow">Pris efter RUT-avdrag</p><h3 className="mt-2 text-2xl font-black">Räkna på din flyttstädning</h3><p className="mt-2 text-sm leading-6 text-slate-600">Välj bostadens storlek och lägg till det du behöver.</p><label htmlFor="move-area" className="label mt-6">Bostadens storlek (m²)</label><input id="move-area" className="input" type="number" min="10" max="500" inputMode="numeric" value={area} onChange={(e)=>setArea(Math.min(500,Math.max(10,Number(e.target.value)||10)))}/><div className="mt-5 rounded-xl bg-[#fff4eb] p-4"><span className="text-xs font-semibold text-slate-600">Beräknat pris</span><div className="mt-1 text-3xl font-black text-[#e85f00]">{total===null?"Begär offert":<AnimatedNumber value={total}/>}</div><span className="text-xs text-slate-500">{total===null?"Priset visas när storleken är ifylld":"inkl. 50% RUT-avdrag"}</span></div></div>
      <div><p className="label">Tilläggstjänster</p><div className="grid gap-2 sm:grid-cols-2">{extras.map(([name,cost])=><label key={name} className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-slate-100 p-3 text-sm"><span className="flex items-center gap-2"><input type="checkbox" className="check" checked={selected.includes(name)} onChange={()=>setSelected((s)=>s.includes(name)?s.filter((x)=>x!==name):[...s,name])}/>{name}</span><span className="shrink-0 font-semibold text-slate-500">+{cost} kr</span></label>)}</div><Link href={quoteHref} className="button mt-5 w-full">Be om officiell offert <ArrowRight size={16}/></Link></div>
    </div>
  </div>;
}

export function LeadForm({ business = false, service = "Flyttstädning", title, showArea = true, frequency = false }: { business?: boolean; service?: string; title?: string; showArea?: boolean; frequency?: boolean }) {
  const [serviceValue,setServiceValue]=useState(service);
  const [area,setArea]=useState("");
  const [addons,setAddons]=useState("");
  const [notice,setNotice]=useState(false);
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const requestedService=params.get("tjanst");
    const requestedArea=params.get("yta");
    const requestedAddons=params.get("tillagg");
    if(requestedService&&services.includes(requestedService)) setServiceValue(requestedService);
    if(requestedArea&&/^\d{1,3}$/.test(requestedArea)) setArea(requestedArea);
    if(requestedAddons) setAddons(requestedAddons.split(",").filter((name)=>extras.some(([label])=>label===name)).join(", "));
  },[]);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form=new FormData(e.currentTarget);
    const subject=business?"Förfrågan om företagsstädning":`Offertförfrågan – ${form.get("Tjänst")??serviceValue}`;
    const body=[...form.entries()].map(([key,value])=>`${key}: ${value}`).join("\n");
    window.location.href=`mailto:info@letscleangoteborg.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice(true);
  }
  return <form id="offert" className="card quote-form scroll-mt-28 grid gap-4 p-6 sm:grid-cols-2 sm:p-8" onSubmit={submit}>
    <div className="sm:col-span-2"><p className="eyebrow">{business ? "För företag" : "Kostnadsfri offert"}</p><h3 className="mt-2 text-2xl font-black">{title ?? (business ? "Berätta om era lokaler" : "Få ett tydligt prisförslag")}</h3><p className="mt-2 text-sm leading-6 text-slate-600">Lämna dina kontaktuppgifter och adress, så återkommer vi. Inget bokas innan du har godkänt offerten.</p></div>
    <div><label className="label" htmlFor="quote-name">Namn</label><input required className="input" id="quote-name" name="Namn" autoComplete="name" placeholder="För- och efternamn"/></div>
    <div><label className="label" htmlFor="quote-email">E-post</label><input required className="input" id="quote-email" type="email" name="E-post" autoComplete="email" placeholder="namn@exempel.se"/></div>
    <div><label className="label" htmlFor="quote-phone">Telefon</label><input required className="input" id="quote-phone" type="tel" name="Telefon" autoComplete="tel" placeholder="070-000 00 00"/></div>
    {business
      ? <div><label className="label" htmlFor="quote-company">Företag</label><input required className="input" id="quote-company" name="Företag" autoComplete="organization" placeholder="Företagsnamn"/></div>
      : <div><label className="label" htmlFor="quote-service">Tjänst</label><select className="input" id="quote-service" name="Tjänst" value={serviceValue} onChange={(e)=>setServiceValue(e.target.value)}>{services.map((n)=><option key={n}>{n}</option>)}</select></div>}
    <div className="sm:col-span-2"><label className="label" htmlFor="quote-address">{business?"Lokalens adress":"Bostadens adress"}</label><input required className="input" id="quote-address" name="Adress" autoComplete="street-address" placeholder="Gatuadress och nummer"/></div>
    <div><label className="label" htmlFor="quote-postcode">Postnummer</label><input required className="input" id="quote-postcode" name="Postnummer" autoComplete="postal-code" inputMode="numeric" placeholder="412 00"/></div>
    <div><label className="label" htmlFor="quote-city">Ort</label><input required className="input" id="quote-city" name="Ort" autoComplete="address-level2" placeholder="Göteborg"/></div>
    {(showArea||business)&&<div><label className="label" htmlFor="quote-area">{business?"Lokalens yta (m²)":"Bostadens yta (m²)"}</label><input className="input" id="quote-area" name="Yta (m²)" type="number" min="1" max="5000" inputMode="numeric" placeholder="Ungefärlig yta" value={area} onChange={(e)=>setArea(e.target.value)}/></div>}
    {frequency&&<div><label className="label" htmlFor="quote-frequency">Hur ofta?</label><select className="input" id="quote-frequency" name="Frekvens"><option>Varje vecka</option><option>Varannan vecka</option><option>Var fjärde vecka</option><option>Vet inte än</option></select></div>}
    <div><label className="label" htmlFor="quote-date">{business?"Önskat besök":"Önskat datum"}</label><input className="input" id="quote-date" name="Önskat datum" type="date"/></div>
    {addons&&<div className="sm:col-span-2"><label className="label" htmlFor="quote-addons">Valda tillval</label><input className="input" id="quote-addons" name="Valda tillval" value={addons} onChange={(e)=>setAddons(e.target.value)}/></div>}
    <div className="sm:col-span-2"><label className="label" htmlFor="quote-message">Meddelande</label><textarea className="input min-h-24 py-3" id="quote-message" name="Meddelande" placeholder={business?"Berätta om era lokaler och önskat upplägg":"Berätta gärna mer om bostaden och vad du vill ha hjälp med."}/></div>
    {!business&&<p className="rounded-xl bg-emerald-50 p-4 text-xs leading-5 text-emerald-950 sm:col-span-2">Vi kan behöva ditt personnummer för RUT-avdrag när en bokning blir aktuell. Ange det inte i formuläret eller via vanlig e-post – vi ber i så fall om det separat via en säker kanal.</p>}
    <label className="flex items-start gap-2 text-xs leading-5 text-slate-500 sm:col-span-2"><input required type="checkbox" className="check mt-0.5"/><span>Jag godkänner att mina uppgifter används för att hantera min förfrågan enligt <Link className="underline" href="/integritet">integritetspolicyn</Link>.</span></label>
    <div className="sm:col-span-2"><button className="button" type="submit">{business ? "Boka kostnadsfritt besök" : "Skapa offertförfrågan"} <ArrowRight size={16}/></button>{notice&&<p role="status" className="mt-3 text-sm font-semibold text-emerald-800">Ett e-postutkast öppnas med din förfrågan. Kontrollera uppgifterna och skicka meddelandet i din e-postapp – formuläret skickas inte automatiskt.</p>}</div>
  </form>;
}

export function FaqList({ items = generalFaq }: { items?: Faq[] }) {
  const [query,setQuery]=useState("");
  const q=query.toLocaleLowerCase("sv");
  const filtered=items.filter(([a,b])=>`${a} ${b}`.toLocaleLowerCase("sv").includes(q));
  return <div className="grid gap-3"><label className="sr-only" htmlFor="faq-search">Sök bland vanliga frågor</label><input id="faq-search" className="input" type="search" placeholder="Sök bland vanliga frågor…" value={query} onChange={(e)=>setQuery(e.target.value)}/>{filtered.length?filtered.map(([a,b])=><details key={a} className="faq-item card p-5"><summary className="flex items-center justify-between gap-4 font-bold">{a}<ChevronDown size={18} className="shrink-0 text-[#ff6b00]"/></summary><p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-6 text-slate-600">{b}</p></details>):<p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Inga frågor matchade din sökning.</p>}</div>;
}

export function TrustStrip() {
  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[["15 dagars garanti","Vi står bakom varje flyttstädning."],["Miljövänliga val","Skonsamma produkter för hemmet."],["Trygg personal","Ansvarsförsäkrade medarbetare."],["RUT direkt på fakturan","Vi sköter administrationen."]].map(([title,copy])=><div key={title} className="flex gap-3 rounded-xl border border-slate-100 bg-white p-4"><span className="mt-0.5 text-emerald-500"><ShieldCheck size={20}/></span><div><div className="text-sm font-bold">{title}</div><div className="mt-1 text-xs leading-5 text-slate-500">{copy}</div></div></div>)}</div>;
}
