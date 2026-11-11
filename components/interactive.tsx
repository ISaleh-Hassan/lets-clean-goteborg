"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Minus, Plus, Search } from "lucide-react";
import { addOns, formatPrice, movePrice, priceRows } from "@/lib/flytt";
import { services, type Faq } from "@/lib/services";

export function PriceCalculator({ compact = false }: { compact?: boolean }) {
  const [area, setArea] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState("");
  const numericArea = Number(area);
  const selectedRow = priceRows.find((row) => String(row.min) === selectedRange);
  const basePrice = area ? movePrice(numericArea) : selectedRow?.price ?? null;
  const extras = addOns.filter((item) => selected.includes(item.id));
  const total = basePrice === null ? null : basePrice + extras.reduce((sum, item) => sum + item.price, 0);
  const range = selectedRange || (area && basePrice !== null
    ? numericArea >= 200 ? "large" : String(priceRows.find((row) => numericArea >= row.min && numericArea <= row.max)?.min)
    : "");
  const quoteParams = new URLSearchParams();
  if (area && basePrice !== null) quoteParams.set("area", area);
  if (!area && selectedRow) quoteParams.set("storlek", `${selectedRow.min}–${selectedRow.max} m²`);
  if (selected.length) quoteParams.set("tillval", selected.join(","));
  const quoteQuery = quoteParams.toString();

  return (
    <div className={`calculator ${compact ? "calculator-compact" : ""}`}>
      <div className="calculator-heading"><span className="eyebrow">RÄKNA UT DITT PRIS</span><h3>Vad kostar din flyttstädning?</h3><p>Välj storlek eller ange antal kvadratmeter.</p></div>
      <div className="field-grid">
        <label>Välj storlek
          <select value={range} onChange={(event) => {
            const value = event.target.value;
            setSelectedRange(value);
            setArea("");
          }}>
            <option value="">Välj storlek</option>
            {priceRows.map((row) => <option key={row.min} value={row.min}>{row.min}–{row.max} m²</option>)}
            <option value="large">200 m² eller mer</option>
          </select>
        </label>
        <label>Bostadens storlek (m²)
          <input type="number" min="1" step="1" inputMode="numeric" placeholder={selectedRange === "large" ? "Ange exakt antal m²" : "Till exempel 65"} value={area} onChange={(event) => { setArea(event.target.value); setSelectedRange(""); }} />
        </label>
      </div>
      {area && basePrice === null && <p className="field-error" role="alert">Ange en storlek i hela kvadratmeter, minst 1 m².</p>}
      {selectedRange === "large" && !area && <p className="field-hint">Ange exakt antal kvadratmeter för att se priset.</p>}
      <details className="addons"><summary>Välj tillval <ChevronDown size={16} /></summary>
        <div className="addon-list">{addOns.map((item) => <label key={item.id}><span><input type="checkbox" checked={selected.includes(item.id)} onChange={(event) => setSelected(event.target.checked ? [...selected, item.id] : selected.filter((id) => id !== item.id))} /> {item.label}</span><strong>+ {formatPrice(item.price)}</strong></label>)}</div>
      </details>
      <div className="price-result" aria-live="polite">
        <div><span>Uppskattat pris efter RUT</span><strong>{total === null ? "Ange storlek" : formatPrice(total)}</strong><small>Förutsätter att du har rätt till RUT-avdrag.</small></div>
        <a className="button button-dark" href={`/flyttstadning${quoteQuery ? `?${quoteQuery}` : ""}#offert`}>Få en offert <ArrowRight size={17} /></a>
      </div>
    </div>
  );
}

export function LeadForm({ service, showArea = true }: { service?: string; showArea?: boolean }) {
  const [serviceValue, setServiceValue] = useState(service ?? "");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const submitting = useRef(false);
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (service !== "flyttstadning") return;
    const params = new URLSearchParams(window.location.search);
    const requestedArea = params.get("area");
    if (requestedArea && movePrice(Number(requestedArea)) !== null) setArea(requestedArea);
    const requestedRange = params.get("storlek");
    const ids = (params.get("tillval") ?? "").split(",");
    const requestedExtras = addOns.filter((item) => ids.includes(item.id));
    const parts = [
      ...(priceRows.some((row) => `${row.min}–${row.max} m²` === requestedRange) ? [`Valt storleksintervall: ${requestedRange}.`] : []),
      ...(requestedExtras.length ? [`Önskade tillval: ${requestedExtras.map((item) => item.label).join(", ")}.`] : []),
    ];
    if (parts.length) setMessage(parts.join("\n"));
  }, [service]);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setError("");
    setSent(false);
    submitting.current = true;
    setSending(true);
    try {
      const response = await fetch("/api/offert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const result: { error?: string } = await response.json();
        setError(result.error || "Det gick inte att skicka förfrågan. Kontakta oss via telefon eller e-post.");
        return;
      }
      form.reset();
      setArea("");
      setMessage("");
      setServiceValue(service ?? "");
      setSent(true);
    } catch {
      setError("Det gick inte att skicka förfrågan. Kontrollera din anslutning eller kontakta oss via telefon eller e-post.");
    } finally {
      submitting.current = false;
      setSending(false);
    }
  }
  const business = serviceValue === "foretagsstadning";
  const noArea = serviceValue === "dodsbo" || !showArea;
  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="field-grid">
        <label>Namn <span>*</span><input name="name" autoComplete="name" maxLength={100} required placeholder="Ditt namn" /></label>
        <label>Telefon <span>*</span><input name="phone" type="tel" autoComplete="tel" maxLength={40} required placeholder="Ditt telefonnummer" /></label>
        <label>E-post <span>*</span><input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="din@epost.se" /></label>
        <label>Ort <span>*</span><input name="location" autoComplete="address-level2" maxLength={100} required placeholder="Till exempel Göteborg" /></label>
        <label>Tjänst <span>*</span><select name="service" value={serviceValue} required onChange={(event) => setServiceValue(event.target.value)}><option value="">Välj tjänst</option>{services.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select></label>
        {!noArea && <label>Storlek (m²)<input name="area" type="number" min="1" step="1" placeholder="Antal m²" value={area} onChange={(event) => setArea(event.target.value)} /></label>}
        {serviceValue === "hemstadning" && <label>Hur ofta?<select name="frequency" defaultValue=""><option value="">Välj frekvens</option><option>Varje vecka</option><option>Varannan vecka</option><option>Var fjärde vecka</option></select></label>}
      </div>
      <label>Berätta mer<textarea name="message" rows={4} maxLength={3000} value={message} onChange={(event) => setMessage(event.target.value)} placeholder={business ? "Berätta om lokalen och om ni önskar kontorsbesök eller provstädning." : "Berätta gärna om dina önskemål."} /></label>
      {error && <p className="field-error" role="alert">{error} <a href="mailto:info@letscleangoteborg.se">Mejla oss</a> eller ring <a href="tel:0313204556">031-320 45 56</a>.</p>}
      {sent && <p className="form-success" role="status">Tack! Din förfrågan har skickats. Vi återkommer till dig.</p>}
      <button className="button button-orange" type="submit" disabled={sending}>{sending ? "Skickar..." : business ? "Boka kostnadsfritt kontorsbesök / fråga om provstädning" : "Skicka offertförfrågan"} <ArrowRight size={18} /></button>
      <p className="form-note">Om personnummer behövs för RUT kontaktar vi dig separat efter offerten. Ange inte personnummer eller andra känsliga uppgifter i formuläret. Läs vår <a href="/integritet">integritetspolicy</a>.</p>
    </form>
  );
}

export function FaqList({ items, searchable = false }: { items: Faq[]; searchable?: boolean }) {
  const [query, setQuery] = useState("");
  const filtered = items.filter((item) => `${item.question} ${item.answer}`.toLocaleLowerCase("sv").includes(query.toLocaleLowerCase("sv")));
  return <div className="faq-list">
    {searchable && <label className="search-field"><Search size={19} /><span className="sr-only">Sök bland frågor</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Sök bland vanliga frågor" /></label>}
    {filtered.map((item) => <details className="faq-item" key={item.question}><summary>{item.question}<Plus className="faq-plus" size={19} /><Minus className="faq-minus" size={19} /></summary><p>{item.answer}</p></details>)}
    {filtered.length === 0 && <p>Inga frågor matchar din sökning. Kontakta oss gärna.</p>}
  </div>;
}

export function TrustStrip() {
  return <div className="trust-strip">{["15 dagars garanti på flyttstädning", "Tydliga priser", "50 % RUT på arbetskostnaden"].map((item) => <span key={item}><Check size={17} />{item}</span>)}</div>;
}
