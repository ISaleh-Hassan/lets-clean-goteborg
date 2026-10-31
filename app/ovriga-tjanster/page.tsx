import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Övriga tjänster | Let's Clean Göteborg",
  description: "Storstädning, flytthjälp och dödsbo i Göteborg. Välj tjänst och begär en kostnadsfri offert.",
};

export default function Page() {
  const other = services.filter((s) => ["storstadning", "flytthjalp", "dodsbo"].includes(s.slug));
  return <>
    <section className="hero"><div className="container py-12 md:py-16"><p className="eyebrow">Fler sätt vi hjälper dig</p><h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-[-.04em] sm:text-5xl">Övriga tjänster</h1><p className="mt-4 max-w-2xl leading-7 text-slate-600">Välj tjänst för att se vad som ingår, hur det går till och vanliga frågor.</p></div></section>
    <section className="section"><div className="container grid gap-5 md:grid-cols-3">{other.map((s) => <Link key={s.slug} href={`/${s.slug}`} className="card p-6 transition hover:-translate-y-1 hover:shadow-lg"><h2 className="text-xl font-black">{s.name}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{s.intro}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#e85f00]">Läs mer <ArrowRight size={15}/></span></Link>)}</div></section>
  </>;
}
