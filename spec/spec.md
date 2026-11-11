**Task:** Build a complete, high-converting, multi-page web application for a local cleaning and moving company in Gothenburg named "Let's Clean Göteborg".

**Language Requirement:**
- The ENTIRE website, UI components, forms, price calculators, headers, footers, meta tags, and content MUST be written in professional, natural Swedish.

**Content Rules:**
- Structure and depth are modelled on the Hem flyttstädning page, but all copy is original and written under the Let's Clean Göteborg brand. Do not copy competitor text, reviews, certifications/collective-agreement claims, office addresses or city lists.
- Never invent prices, company numbers or addresses. Where no price is known, say "Fast pris i offert" / "Begär offert".
- Prices are shown in plain, always-visible tables (no click needed).
- RUT-avdrag: 50% of eligible labour cost; ROT and RUT share a limit of 75 000 kr per person and year, of which ROT is limited to 50 000 kr. Eligibility also depends on tax and other deductions. RUT applies to private individuals only, not to companies.

**Services (6):** Flyttstädning, Hemstädning, Storstädning, Företagsstädning/Kontorsstädning, Flytthjälp, Dödsbo. Each has its own page (no combined "other services" page with duplicated content).

---

### **DESIGN & BRANDING**
- **Palette:** Warm off-white and muted sage, dark forest-green text and buttons, with a restrained warm orange accent for small details.
- **Logo:** An arched forest-green `LSG` monogram with a warm orange sparkle and a matching wordmark, shared across the header and footer.
- **Vibe:** Warm Scandinavian design with generous whitespace, understated serif headings, natural Swedish copy, transparent pricing, an original home illustration and tasteful animations.
- **Tech stack:** Next.js 15 (App Router, TypeScript), Tailwind CSS 4, Lucide React, Framer Motion (scroll reveal on home page service cards).

---

### **ARCHITECTURE**
- `app/layout.tsx` – html lang `sv`, Header + Footer on all pages.
- `app/page.tsx` – Startsida.
- `app/[slug]/page.tsx` – statically generated (`generateStaticParams`) for: `flyttstadning`, `hemstadning`, `foretagsstadning`, `storstadning`, `flytthjalp`, `dodsbo`, `priser`, `faq-kontakt`, `villkor`, `integritet`. Per-page `<title>` and meta description.
- `app/ovriga-tjanster/page.tsx` – short overview linking to Storstädning, Flytthjälp and Dödsbo.
- `lib/flytt.ts` – single source of truth for flyttstädning price rows, add-ons, checklist and customer notes, and the `movePrice()` function.
- `lib/services.ts` – content for all six service pages plus shared FAQ sets (`generalFaq`, `rutFaq`).
- `components/service-page.tsx` – ONE shared template used by all six services, so pages share structure but not text.
- `components/interactive.tsx` – estimator, add-on calculator, `LeadForm`, searchable `FaqList`, `TrustStrip`.
- `components/site.tsx` – Header (announcement bar, nav, dropdown) and Footer. `components/reveal.tsx` – Framer Motion wrapper.

**Service page template (same order on every service page):**
1. Hero: H1, intro, CTA, short facts card
2. Så fungerar det (3 steps)
3. Table (where relevant): Hemstädning (rhythms), Företagsstädning (set-ups), Flytthjälp (2 vs 3 person packages); Flyttstädning instead has its price tables
4. Detta ingår (grouped checklist) + "Att tänka på" notes
5. Varför oss + service-specific FAQ
6. Quote form (`#offert`), pre-selected for the service

---

### **GLOBAL COMPONENTS**
- **Announcement bar:** Mån–sön 08.00–19.00 | Tel 031-320 45 56 | info@letscleangoteborg.se
- **Navigation:** Logo (orange mark) | Hem | Flyttstädning | Hemstädning | Företagsstädning | Övriga tjänster (dropdown: Storstädning, Flytthjälp, Dödsbo – each links to its own page) | Priser & RUT | FAQ & kontakt | CTA "Fri offert". Mobile menu included.
- **Footer:** company blurb, service links, service areas (Göteborg, Mölndal, Partille, Lerum, Kungälv, Härryda, Västra Frölunda, Hisingen), RUT info, links to Allmänna villkor and Integritetspolicy. Org.nr and street address are intentionally omitted until provided.

---

### **PAGES**

**Startsida:** Hero ("Göteborgs tryggaste städfirma för hem & företag", subtitle with fast pris / 15 dagars garanti / 50% RUT), quick estimator, six service cards linking to their pages, trust badges, 3-step process, closing CTA.
- The interactive flyttstädning estimator accepts a positive whole-number area in m² or a selection from the price ranges. It displays the corresponding price after RUT immediately. For areas of 200 m² and above, the customer must enter the exact area and the price is 20 kr/m². Include optional add-ons.

**Flyttstädning:** modelled on Hem's page. Fixed prices, fönsterputs included, 15 dagars garanti, Mäklarsamfundets riktlinjer.
- Price table (after 50% RUT): 0–29 m² 1 499 kr · 30–59 m² 1 670 kr · 60–89 m² 2 314 kr · 90–119 m² 2 856 kr · 120–149 m² 3 278 kr · 150–199 m² 4 179 kr · 200 m² and above 20 kr/m².
- Add-on table: Vanlig balkong +250 · Inglasad balkong +450 · Ugnsplåtar +390 · Kamin/öppen spis +200 · Avfrostning frys +245 · Käll-/vindsförråd +250 · Vattenlås +200.
- Interactive calculator (area input or range selector + add-on checkboxes) below the tables, using the same prices and calculation as the homepage estimator.
- Full checklist: Generella moment, Kök, Badrum & WC; "Att tänka på som kund" (el/vatten, avfrostad frys, framflyttade vitvaror, demonterade fronter, inga sopor/tejp/krokar, vattenlås på begäran).

**Hemstädning:** Rhythm table (varje vecka / varannan vecka / var fjärde vecka), no bindningstid, samma städare, ansvarsförsäkring, miljövänliga medel. Form includes area and frequency.

**Företagsstädning & kontorsstädning:** Day/evening/night set-ups table, nyckelhantering, pentry, toaletter, skrivbordsdesinficering. B2B form: "Boka kostnadsfritt kontorsbesök / provstädning". Notes that RUT does not apply.

**Storstädning, Flytthjälp, Dödsbo:** One page each. Flytthjälp has a package table (2 personer + lastbil / 3 personer + lastbil). Dödsbo uses a respectful tone and no area field in the form.

**Övriga tjänster:** overview with three cards only.

**Priser & RUT-avdrag:** RUT explanation (50% of eligible labour cost; combined ROT and RUT limit of 75 000 kr/person/year, with a 50 000 kr ROT sublimit; Let's Clean handles Skatteverket administration), flyttstädning price table, links to the other services (priced via offert), RUT FAQ.

**FAQ & Kontakt:** searchable FAQ accordion (general + RUT), phone/e-post, quote form.

**Allmänna villkor / Integritetspolicy:** short general text pages linked from the footer. Final legal wording to be reviewed by the company.

---

### **FORMS**
- Quote forms post to a server-side route that validates inputs and sends via Resend with a configured recipient, verified sender and server-only API key. Show a clear error with alternative contact details when sending is unavailable; never report success unless the provider accepts the request.
- Collect the contact and service details needed for an offer. Do not collect personal identity numbers in the form or email; explain that the company will contact the customer separately after the quote if a personal identity number is needed for RUT.
- A possible future credit-information integration is not implemented. A credit check is not proof of RUT eligibility: any future eligibility check needs an appropriate provider, a verified legal basis and privacy review, and a separate way to confirm eligibility and remaining RUT allowance. Do not claim that eligibility has been checked.

### **OPEN ITEMS**
- Real prices for Hemstädning, Storstädning, Flytthjälp, Dödsbo and Företagsstädning.
- Org.nr, office address, real photos/logo, customer reviews and any certifications.
- Configure and verify Resend credentials and sending domain; add deployment-level rate limiting and bot protection; review email-provider privacy and legal requirements. Any credit-information/RUT eligibility integration, cookie consent, and legal text review remain open.
