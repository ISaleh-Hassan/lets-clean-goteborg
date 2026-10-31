"use client";

import { useState } from "react";
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
  return <div className="card p-6 sm:p-7">
    <div className="flex items-start justify-between gap-3"><div><p className="eyebrow">Pris direkt</p><h3 className="mt-1 text-xl font-extrabold">Vad behöver du hjälp med?</h3></div><span className="rounded-full bg-emerald-50 p-2.5 text-emerald-600"><Sparkles size={18}/></span></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <div><label className="label" htmlFor="estimate-service">Tjänst</label><select id="estimate-service" className="input" value={service} onChange={(e)=>setService(e.target.value)}>{services.map((name)=><option key={name}>{name}</option>)}</select></div>
      <div><label className="label" htmlFor="estimate-area">Bostadens storlek (m²)</label><input id="estimate-area" className="input" type="number" min="10" max="500" value={area} onChange={(e)=>setArea(Math.max(10,Number(e.target.value)||10))}/></div>
    </div>
    {service === "Flyttstädning" && <div className="mt-5"><p className="label">Lägg till vid behov</p><div className="grid grid-cols-2 gap-2 text-sm">{extras.slice(0,4).map(([name,cost])=><label key={name} className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-50 p-2.5"><input type="checkbox" className="check" checked={selected.includes(name)} onChange={()=>toggle(name)}/><span>{name} <span className="text-slate-500">+{cost} kr</span></span></label>)}</div></div>}
    <div className="mt-5 flex items-center justify-between rounded-xl bg-[#fff4eb] px-4 py-3"><div><span className="block text-xs font-semibold text-slate-600">Ditt pris efter RUT</span><strong className="text-2xl font-black text-[#e85f00]">{price === null ? "Begär offert" : <AnimatedNumber value={price}/>}</strong></div><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">50% RUT</span></div>
    <a className="button mt-4 w-full" href="/faq-kontakt#offert">Få en kostnadsfri offert <ArrowRight size={16}/></a>
    <p className="mt-3 text-center text-xs text-slate-500">Uppskattat pris – vi bekräftar alltid priset innan bokning.</p>
  </div>;
}

export function AddonCalculator() {
  const [area,setArea]=useState(75); const [selected,setSelected]=useState<string[]>([]);
  const base=movePrice(area); const total=base===null?null:base+sumExtras(selected);
  return <div className="card p-6 sm:p-8">
    <div className="grid gap-7 md:grid-cols-[.8fr_1.2fr]">
      <div><p className="eyebrow">Pris efter RUT-avdrag</p><h3 className="mt-2 text-2xl font-black">Räkna på din flyttstädning</h3><p className="mt-2 text-sm leading-6 text-slate-600">Fast pris med 15 dagars garanti. Välj storlek och eventuella tillägg.</p><label htmlFor="move-area" className="label mt-6">Bostadens storlek (m²)</label><input id="move-area" className="input" type="number" min="10" max="500" value={area} onChange={(e)=>setArea(Math.max(10,Number(e.target.value)||10))}/><div className="mt-5 rounded-xl bg-[#fff4eb] p-4"><span className="text-xs font-semibold text-slate-600">Ditt fasta pris</span><div className="mt-1 text-3xl font-black text-[#e85f00]">{total===null?"Begär offert":<AnimatedNumber value={total}/>}</div><span className="text-xs text-slate-500">{total===null?"för 115–180 m² ger vi dig ett fast pris i offerten":"inkl. 50% RUT-avdrag"}</span></div></div>
      <div><p className="label">Tilläggstjänster</p><div className="grid gap-2 sm:grid-cols-2">{extras.map(([name,cost])=><label key={name} className="flex cursor-pointer items-center justify-between gap-2 rounded-xl border border-slate-100 p-3 text-sm"><span className="flex items-center gap-2"><input type="checkbox" className="check" checked={selected.includes(name)} onChange={()=>setSelected((s)=>s.includes(name)?s.filter((x)=>x!==name):[...s,name])}/>{name}</span><span className="shrink-0 font-semibold text-slate-500">+{cost} kr</span></label>)}</div><a href="/faq-kontakt#offert" className="button mt-5 w-full">Boka din flyttstädning <ArrowRight size={16}/></a></div>
    </div>
  </div>;
}

export function LeadForm({ business = false, service = "Flyttstädning", title, showArea = false, frequency = false }: { business?: boolean; service?: string; title?: string; showArea?: boolean; frequency?: boolean }) {
  const [sent,setSent]=useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form=new FormData(e.currentTarget);
    const subject=`${business?"Förfrågan om företagsstädning":"Offertförfrågan"} – ${form.get("service")??service}`;
    const body=[...form.entries()].map(([key,value])=>`${key}: ${value}`).join("\n");
    window.location.href=`mailto:info@letscleangoteborg.se?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }
  return <form id="offert" className="card scroll-mt-28 grid gap-4 p-6 sm:grid-cols-2 sm:p-8" onSubmit={submit}>
    <div className="sm:col-span-2"><p className="eyebrow">{business ? "För företag" : "Kostnadsfri offert"}</p><h3 className="mt-1 text-2xl font-black">{title ?? (business ? "Boka kostnadsfritt kontorsbesök eller provstädning" : "Berätta vad du behöver hjälp med")}</h3></div>
    <div><label className="label" htmlFor="name">Namn</label><input required className="input" id="name" name="name" autoComplete="name" placeholder="För- och efternamn"/></div>
    <div><label className="label" htmlFor="email">E-post</label><input required className="input" id="email" type="email" name="email" autoComplete="email" placeholder="namn@exempel.se"/></div>
    <div><label className="label" htmlFor="phone">Telefon</label><input required className="input" id="phone" type="tel" name="phone" autoComplete="tel" placeholder="070-000 00 00"/></div>
    {business
      ? <div><label className="label" htmlFor="company">Företag</label><input className="input" id="company" name="company" placeholder="Företagsnamn"/></div>
      : <div><label className="label" htmlFor="form-service">Tjänst</label><select className="input" id="form-service" name="service" defaultValue={service}>{services.map((n)=><option key={n}>{n}</option>)}</select></div>}
    {(showArea||business)&&<div><label className="label" htmlFor="area">{business?"Lokalens yta (m²)":"Bostadens yta (m²)"}</label><input className="input" id="area" name="yta" type="number" min="1" placeholder="Ungefärlig yta"/></div>}
    {frequency&&<div><label className="label" htmlFor="frequency">Hur ofta?</label><select className="input" id="frequency" name="frekvens"><option>Varje vecka</option><option>Varannan vecka</option><option>Var fjärde vecka</option><option>Vet inte än</option></select></div>}
    <div><label className="label" htmlFor="date">{business?"Önskat besök":"Önskat datum"}</label><input className="input" id="date" name="datum" type="date"/></div>
    <div className="sm:col-span-2"><label className="label" htmlFor="message">Meddelande</label><textarea className="input min-h-24 py-3" id="message" name="message" placeholder={business?"Berätta om era lokaler och önskat upplägg":"Adress och annat vi bör veta"}/></div>
    <div className="flex items-start gap-2 text-xs leading-5 text-slate-500 sm:col-span-2"><input required type="checkbox" className="check mt-0.5"/><span>Jag godkänner att mina uppgifter används för att hantera min förfrågan enligt <a className="underline" href="/integritet">integritetspolicyn</a>.</span></div>
    <div className="sm:col-span-2"><button className="button" type="submit">{business ? "Boka kostnadsfritt besök" : "Skicka offertförfrågan"} <ArrowRight size={16}/></button>{sent&&<p role="status" className="mt-3 text-sm font-semibold text-emerald-700">Din e-postapp har öppnats med förfrågan ifylld. Skicka meddelandet där för att slutföra din bokning.</p>}</div>
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
