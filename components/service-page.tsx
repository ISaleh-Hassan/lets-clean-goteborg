import Link from "next/link";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { addOns, formatPrice, priceRows } from "@/lib/flytt";
import type { Service } from "@/lib/services";
import { FaqList, LeadForm, PriceCalculator, TrustStrip } from "./interactive";

export function PriceTables() {
  return <div className="tables-grid">
    <div><h3>Flyttstädning</h3><div className="table-wrap"><table><thead><tr><th>Storlek</th><th>Pris efter RUT</th></tr></thead><tbody>{priceRows.map((row) => <tr key={row.min}><td>{row.min}–{row.max} m²</td><td>{formatPrice(row.price)}</td></tr>)}<tr><td>200 m² och uppåt</td><td>20 kr/m²</td></tr></tbody></table></div><p className="caption">Priserna förutsätter att du har rätt till RUT-avdrag.</p></div>
    <div><h3>Valfria tillägg</h3><div className="table-wrap"><table><thead><tr><th>Tillägg</th><th>Pris</th></tr></thead><tbody>{addOns.map((item) => <tr key={item.id}><td>{item.label}</td><td>+ {formatPrice(item.price)}</td></tr>)}</tbody></table></div></div>
  </div>;
}

export function QuoteSection({ service }: { service?: Service }) {
  return <section className="section quote-section" id="offert"><div className="container quote-layout"><div><span className="eyebrow">VI HJÄLPER DIG GÄRNA</span><h2>Berätta vad du behöver hjälp med.</h2><p>Fyll i dina uppgifter så kan vi ta fram ett upplägg som passar dig. Din förfrågan är kostnadsfri.</p><div className="quote-contact"><span>Föredrar du att prata?</span><a href="tel:0313204556">031-320 45 56 <ArrowRight size={17} /></a></div></div><LeadForm service={service?.slug} /></div></section>;
}

export function ServicePage({ service }: { service: Service }) {
  return <>
    <section className="service-hero"><div className="container service-hero-grid"><div><Link className="breadcrumb" href="/">Hem <span>/</span> {service.name}</Link><span className="eyebrow">LET&apos;S CLEAN GÖTEBORG</span><h1>{service.name}<span className="orange">.</span></h1><p className="hero-description">{service.intro}</p><a className="button button-orange" href="#offert">Begär en kostnadsfri offert <ArrowRight size={18} /></a></div><div className="facts-card"><span className="eyebrow">BRA ATT VETA</span><h3>Enklare från början till slut.</h3>{service.facts.map((fact) => <p key={fact}><CheckCircle2 size={20} /> {fact}</p>)}</div></div></section>
    <TrustStrip />
    <section className="section"><div className="container"><div className="section-heading"><span className="eyebrow">ENKELT FRÅN START</span><h2>Så fungerar det</h2><p>Tre enkla steg till en smidigare vardag.</p></div><div className="steps-grid">{service.steps.map((step, index) => <div className="step-card" key={step}><span>0{index + 1}</span><p>{step}</p></div>)}</div></div></section>
    {service.slug === "flyttstadning" && <section className="section section-soft" id="priser"><div className="container"><div className="section-heading"><span className="eyebrow">TYDLIGT OCH ENKELT</span><h2>Priser för flyttstädning</h2><p>Se ditt pris direkt, utan dolda pristabeller.</p></div><PriceTables /><div className="calculator-section"><PriceCalculator /></div></div></section>}
    {service.options && <section className="section section-soft"><div className="container"><div className="section-heading"><span className="eyebrow">HITTA DITT UPPLÄGG</span><h2>Välj det som passar dig</h2><p>Fast pris i offert, utifrån dina behov.</p></div><div className="table-wrap"><table><thead><tr><th>Upplägg</th><th>Beskrivning</th><th>Pris</th></tr></thead><tbody>{service.options.map((option) => <tr key={option.title}><td>{option.title}</td><td>{option.description}</td><td>Begär offert</td></tr>)}</tbody></table></div></div></section>}
    <section className="section"><div className="container"><div className="section-heading"><span className="eyebrow">VAD INGÅR?</span><h2>Detta ingår</h2></div><div className="checklist-grid">{service.groups.map((group) => <div className="checklist-card" key={group.title}><h3>{group.title}</h3>{group.items.map((item) => <p key={item}><Check size={17} />{item}</p>)}</div>)}</div><div className="notes"><h3>Att tänka på</h3><ul>{service.notes.map((note) => <li key={note}>{note}</li>)}</ul></div></div></section>
    <section className="section section-soft"><div className="container faq-layout"><div><span className="eyebrow">MED OMTANKE</span><h2>Varför välja oss?</h2><p>{service.why}</p><Link className="text-link" href="/faq-kontakt">Fler frågor och svar <ArrowRight size={16} /></Link></div><div><h3>Vanliga frågor om {service.name.toLocaleLowerCase("sv")}</h3><FaqList items={service.faq} /></div></div></section>
    <QuoteSection service={service} />
  </>;
}
