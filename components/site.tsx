"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";

export function Logo() {
  return <Link href="/" className="logo" aria-label="Let's Clean Göteborg – startsida">
    <svg className="logo-mark" viewBox="0 0 64 64" aria-hidden="true">
      <path d="M5 31.5C5 16.9 16.9 5 31.5 5S58 16.9 58 31.5V51a7 7 0 0 1-7 7H12a7 7 0 0 1-7-7Z" fill="#263b32" />
      <path d="M15 43.5c9.7 5 24.3 5 34 0" fill="none" stroke="#dc895f" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M49 10.5c.6 3.5 2 4.9 5.5 5.5-3.5.6-4.9 2-5.5 5.5-.6-3.5-2-4.9-5.5-5.5 3.5-.6 4.9-2 5.5-5.5Z" fill="#f3a778" />
      <text x="31.5" y="36.5" textAnchor="middle" fill="#fffefa" fontFamily="Georgia, serif" fontSize="18" letterSpacing="-1.1">LSG</text>
    </svg>
    <span className="logo-text">Let&apos;s Clean<small>GÖTEBORG</small></span>
  </Link>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="announcement"><div className="container announcement-inner"><span>Mån–sön 08.00–19.00</span><div><a href="tel:0313204556"><Phone size={13} /> 031-320 45 56</a><a href="mailto:info@letscleangoteborg.se"><Mail size={13} /> info@letscleangoteborg.se</a></div></div></div>
    <div className="container nav-inner">
      <Logo />
      <button type="button" className="menu-toggle" aria-expanded={open} aria-label={open ? "Stäng meny" : "Öppna meny"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="Huvudmeny" onClick={(event) => { if ((event.target as HTMLElement).closest("a")) setOpen(false); }}>
        <Link href="/">Hem</Link><Link href="/flyttstadning">Flyttstädning</Link><Link href="/hemstadning">Hemstädning</Link><Link href="/foretagsstadning">Företag</Link>
        <div className="nav-dropdown"><Link href="/ovriga-tjanster">Övriga tjänster <ChevronDown size={14} /></Link><div className="dropdown-menu"><Link href="/storstadning">Storstädning</Link><Link href="/flytthjalp">Flytthjälp</Link><Link href="/dodsbo">Dödsbo</Link></div></div>
        <Link href="/priser">Priser & RUT</Link><Link href="/faq-kontakt">FAQ & kontakt</Link><Link className="button button-orange nav-cta" href="/faq-kontakt#offert">Fri offert <ArrowRight size={16} /></Link>
      </nav>
    </div>
  </header>;
}

export function Footer() {
  return <footer className="footer"><div className="container footer-grid">
    <div><Logo /><p>Städning och flytthjälp med omtanke om ditt hem, din tid och din vardag i Göteborg med omnejd.</p><a href="tel:0313204556">031-320 45 56</a><br /><a href="mailto:info@letscleangoteborg.se">info@letscleangoteborg.se</a></div>
    <div><h3>Våra tjänster</h3><Link href="/flyttstadning">Flyttstädning</Link><Link href="/hemstadning">Hemstädning</Link><Link href="/foretagsstadning">Företagsstädning</Link><Link href="/storstadning">Storstädning</Link><Link href="/flytthjalp">Flytthjälp</Link><Link href="/dodsbo">Dödsbo</Link></div>
    <div><h3>Vi finns nära dig</h3><p>Göteborg · Mölndal · Partille · Lerum · Kungälv · Härryda · Västra Frölunda · Hisingen</p><p>RUT ger privatpersoner möjlighet till 50 % avdrag på arbetskostnaden.</p></div>
    <div><h3>Mer information</h3><Link href="/priser">Priser & RUT</Link><Link href="/faq-kontakt">FAQ & kontakt</Link><Link href="/villkor">Allmänna villkor</Link><Link href="/integritet">Integritetspolicy</Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Let&apos;s Clean Göteborg</span><span>Med omtanke om ditt hem.</span></div></footer>;
}
