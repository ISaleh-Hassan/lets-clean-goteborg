"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BadgeCheck, ChevronDown, Menu, Phone, Sparkles, X } from "lucide-react";

const links = [
  ["Hem", "/"],
  ["Flyttstädning", "/flyttstadning"],
  ["Hemstädning", "/hemstadning"],
  ["Företagsstädning", "/foretagsstadning"],
  ["Övriga tjänster", "/ovriga-tjanster"],
  ["Priser & RUT", "/priser"],
  ["FAQ & kontakt", "/faq-kontakt"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topbar">
      <div className="container flex min-h-[34px] items-center justify-between gap-3">
        <span className="font-semibold">Mån–sön 08.00–19.00</span>
        <div className="desktop-info flex items-center gap-6"><a href="tel:0313204556" className="flex items-center gap-2"><Phone size={13}/>031-320 45 56</a><a href="mailto:info@letscleangoteborg.se">info@letscleangoteborg.se</a></div>
      </div>
    </div>
    <header className="header">
      <nav className="container flex min-h-[76px] items-center justify-between gap-5">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Let's Clean Göteborg startsida">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0e5] text-[#ff6b00]"><Sparkles size={21}/></span>
          <span className="text-[15px] font-black leading-tight tracking-tight">LET&apos;S CLEAN<span className="block text-[11px] font-bold tracking-[.17em] text-slate-500">GÖTEBORG</span></span>
        </Link>
        <div className="hidden items-center gap-[18px] lg:flex">
          {links.map(([label, href]) => href === "/ovriga-tjanster"
            ? <details className="group relative" key={href}>
                <summary className="nav-link flex cursor-pointer list-none items-center gap-1">{label}<ChevronDown size={13} className="transition group-open:rotate-180"/></summary>
                <div className="dropdown absolute left-0 top-full z-30 mt-3 grid min-w-48 gap-1 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                  {[["Storstädning","/storstadning"],["Flytthjälp","/flytthjalp"],["Dödsbo","/dodsbo"]].map(([name,url])=><Link className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-orange-50 hover:text-[#e85f00]" key={name} href={url}>{name}</Link>)}
                </div>
              </details>
            : <Link className="nav-link" key={href} href={href}>{label}</Link>)}
        </div>
        <Link href="/faq-kontakt#offert" className="button hidden min-h-[42px] px-5 text-sm sm:inline-flex">Fri offert <ArrowRight size={15}/></Link>
        <button className="rounded-lg p-2 lg:hidden" aria-label={open ? "Stäng meny" : "Öppna meny"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
      </nav>
      <AnimatePresence>{open && <motion.div key="mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden lg:hidden"><div className="container grid gap-1 border-t border-slate-100 py-3">{links.map(([label, href]) => <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-orange-50" key={href} href={href}>{label}</Link>)}{[["Storstädning","/storstadning"],["Flytthjälp","/flytthjalp"],["Dödsbo","/dodsbo"]].map(([name,url])=><Link onClick={() => setOpen(false)} className="rounded-lg py-2 pl-7 text-sm text-slate-500 hover:bg-orange-50" key={name} href={url}>{name}</Link>)}<Link onClick={() => setOpen(false)} className="button my-2" href="/faq-kontakt#offert">Fri offert <ArrowRight size={16}/></Link></div></motion.div>}</AnimatePresence>
    </header>
  </>;
}

export function Footer() {
  return <footer className="footer">
    <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
      <div><Link href="/" className="text-lg font-black text-white">LET&apos;S CLEAN <span className="text-[#ff8c3d]">GÖTEBORG</span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">Städning med omtanke – för hem, företag och livet däremellan. Vi gör det enkelt att komma hem till rent.</p><p className="mt-4 text-xs text-slate-500">Verksam i Göteborg med omnejd</p></div>
      <div><h3 className="mb-4 text-sm font-bold text-white">Våra tjänster</h3><div className="grid gap-3 text-sm">{links.slice(1,5).map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</div></div>
      <div><h3 className="mb-4 text-sm font-bold text-white">Vi finns nära dig</h3><p className="text-sm leading-7 text-slate-400">Göteborg · Mölndal · Partille<br/>Lerum · Kungälv · Härryda<br/>Västra Frölunda · Hisingen</p><Link className="mt-2 inline-block text-sm" href="/faq-kontakt">Kontakta oss →</Link></div>
      <div><h3 className="mb-4 text-sm font-bold text-white">Tryggt från start</h3><div className="flex gap-2 text-sm leading-6"><BadgeCheck className="mt-1 shrink-0 text-emerald-400" size={18}/><span>Vi hanterar din RUT-ansökan. Du betalar det reducerade priset direkt.</span></div><div className="mt-5 grid gap-3 text-xs text-slate-400"><Link href="/priser">Så fungerar RUT-avdraget</Link><a href="/villkor">Allmänna villkor</a><a href="/integritet">Integritetspolicy</a></div></div>
    </div>
    <div className="border-t border-white/10 py-5"><div className="container flex flex-wrap justify-between gap-3 text-xs text-slate-500"><span>© {new Date().getFullYear()} Let&apos;s Clean Göteborg</span><span>Rent hemma. Lugn i magen.</span></div></div>
  </footer>;
}
