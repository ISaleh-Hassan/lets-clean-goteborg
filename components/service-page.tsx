import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Building2, Check, HeartHandshake, Home, MoveRight, Sparkles, Truck } from "lucide-react";
import { HeroIn, Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { FaqList, LeadForm } from "@/components/interactive";
import type { Service } from "@/lib/services";

const icons = { move: MoveRight, home: Home, building: Building2, sparkles: Sparkles, truck: Truck, heart: HeartHandshake };

export function ServiceHero({ s }: { s: Service }) {
  const Icon = icons[s.icon];
  return <section className="hero"><div className="container grid items-center gap-8 py-12 md:grid-cols-[1.15fr_.85fr] md:py-16">
    <HeroIn><p className="eyebrow">{s.eyebrow}</p><h1 className="mt-3 max-w-2xl text-4xl font-black leading-tight tracking-[-.04em] sm:text-5xl">{s.h1}</h1><p className="mt-4 max-w-xl leading-7 text-slate-600">{s.intro}</p><div className="mt-6 flex flex-wrap items-center gap-3"><Link href="#offert" className="button">{s.cta} <ArrowRight size={16}/></Link><a href="tel:0313204556" className="rounded-full px-4 py-3 text-sm font-bold text-slate-700 hover:bg-white">Ring 031-320 45 56</a></div></HeroIn>
    <HeroIn delay={0.2} x={24} className="card p-6"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#ff6b00]"><Icon size={28}/></span><ul className="mt-5 grid gap-4">{s.facts.map(([t,d])=><li key={t} className="flex gap-3"><BadgeCheck size={20} className="mt-0.5 shrink-0 text-emerald-500"/><div><b className="text-sm">{t}</b><p className="text-xs leading-5 text-slate-500">{d}</p></div></li>)}</ul></HeroIn>
  </div></section>;
}

export function ServicePage({ s, children }: { s: Service; children?: ReactNode }) {
  return <>
    <ServiceHero s={s}/>
    {children}
    <section className="section"><div className="container">
      <div className="mb-8 max-w-2xl"><p className="eyebrow">Så fungerar det</p><h2 className="mt-2 text-3xl font-black">{s.how.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{s.how.intro}</p></div>
      <Stagger className="grid gap-4 md:grid-cols-3">{s.how.steps.map(([t,d],i)=><StaggerItem className="card p-6" key={t}><span className="text-sm font-black text-[#ff6b00]">{i+1} /</span><h3 className="mt-4 text-lg font-black">{t}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{d}</p></StaggerItem>)}</Stagger>
    </div></section>
    {s.table&&<section className="section section-soft"><div className="container"><div className="mb-6 max-w-2xl"><p className="eyebrow">Upplägg</p><h2 className="mt-2 text-3xl font-black">{s.table.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{s.table.intro}</p></div>
      <Reveal className="card overflow-x-auto"><table className="w-full min-w-[560px] text-left text-sm"><thead><tr className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">{s.table.head.map(h=><th key={h} className="px-6 py-3 font-bold">{h}</th>)}</tr></thead><tbody>{s.table.rows.map(r=><tr key={r[0]} className="border-t border-slate-100"><td className="px-6 py-4 font-extrabold text-[#e85f00]">{r[0]}</td><td className="px-6 py-4 text-slate-600">{r[1]}</td><td className="px-6 py-4 text-slate-600">{r[2]}</td></tr>)}</tbody></table></Reveal>
    </div></section>}
    <section className={`section ${s.table?"":"section-soft"}`}><div className="container">
      <div className="mb-8 max-w-2xl"><p className="eyebrow">Detta ingår</p><h2 className="mt-2 text-3xl font-black">{s.includes.title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{s.includes.intro}</p></div>
      <Stagger className="grid gap-5 md:grid-cols-3">{s.includes.groups.map(g=><StaggerItem key={g.title} className="card p-6"><h3 className="text-lg font-black">{g.title}</h3><ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">{g.items.map(i=><li className="flex gap-2" key={i}><Check size={16} className="mt-1 shrink-0 text-emerald-500"/>{i}</li>)}</ul></StaggerItem>)}</Stagger>
      <Reveal className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 p-6"><h3 className="text-lg font-black text-amber-950">{s.notes.title}</h3><ul className="mt-4 grid gap-3 text-sm leading-6 text-amber-950 md:grid-cols-2">{s.notes.items.map(n=><li className="flex gap-2" key={n}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600"/>{n}</li>)}</ul></Reveal>
    </div></section>
    <section className={`section ${s.table?"section-soft":""}`}><div className="container grid items-start gap-10 md:grid-cols-2">
      <Reveal><p className="eyebrow">Varför oss</p><h2 className="mt-2 text-3xl font-black">{s.why.title}</h2><div className="mt-5 grid gap-5 text-sm leading-7 text-slate-600">{s.why.paragraphs.map(([t,d])=><p key={t}><b className="text-slate-900">{t}.</b> {d}</p>)}</div></Reveal>
      <Reveal delay={0.1}><p className="eyebrow">Vanliga frågor</p><h2 className="mb-5 mt-2 text-3xl font-black">Frågor om {s.name.toLowerCase()}</h2><FaqList items={s.faq}/></Reveal>
    </div></section>
    <section className="pb-20 pt-4"><Reveal className="container max-w-3xl"><LeadForm business={s.slug==="foretagsstadning"} service={s.formService} showArea={s.slug!=="dodsbo"} frequency={s.slug==="hemstadning"}/></Reveal></section>
  </>;
}
