import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { PriceCalculator, TrustStrip } from "@/components/interactive";
import { Reveal } from "@/components/reveal";
import { services } from "@/lib/services";

function HomeIllustration() {
  return <svg className="home-illustration" viewBox="0 0 640 610" role="img" aria-label="Illustration av ett ljust och lugnt hem">
    <rect width="640" height="610" fill="#e4e6dc" />
    <rect y="485" width="640" height="125" fill="#d2c8b7" />
    <rect x="93" y="58" width="281" height="305" rx="140" fill="#f3f1e8" />
    <path d="M114 199a119 119 0 0 1 238 0v144H114Z" fill="#c4d2cc" />
    <path d="M233 81v262M114 218h238" stroke="#f3f1e8" strokeWidth="10" />
    <path d="M115 315c44-40 83-47 119-14 40-43 80-41 118-10v52H115Z" fill="#a5b8a8" />
    <path d="M0 486h640" stroke="#b8aa96" strokeWidth="2" />
    <path d="M386 345h178v25H386zM404 370v144M547 370v144" fill="#ad8c6b" stroke="#ad8c6b" strokeWidth="9" strokeLinecap="round" />
    <path d="M453 340c-20-32-14-55 0-69 14 14 20 37 0 69Z" fill="#849d86" />
    <path d="M454 339c-37-22-39-45-32-62 19 5 35 25 32 62ZM455 339c34-25 34-48 24-64-18 8-31 28-24 64Z" fill="#9aaa91" />
    <path d="M435 338h39l-5 25h-29Z" fill="#c98765" />
    <path d="M109 397h181c27 0 48 21 48 48v41H62v-41c0-27 21-48 47-48Z" fill="#f4eee2" />
    <path d="M90 432h219M84 485v28M316 485v28" stroke="#b3a493" strokeWidth="8" strokeLinecap="round" />
    <circle cx="549" cy="106" r="36" fill="#f3eee1" />
    <path d="M540 106h18M549 97v18" stroke="#c98765" strokeWidth="2" />
  </svg>;
}

export default function Home() {
  return <>
    <section className="home-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> STÄDHJÄLP I GÖTEBORG MED OMNEJD</span>
          <h1>Lite mer tid.<br /><em>Lite mindre städning.</em></h1>
          <p className="hero-description">Ett rent hem, en smidigare flytt eller en trivsam arbetsplats. Vi hjälper dig med det praktiska, så att du får tid till annat.</p>
          <div className="hero-actions"><Link className="button button-orange" href="/faq-kontakt#offert">Be om en offert <ArrowRight size={17} /></Link><a className="text-link" href="#tjanster">Se våra tjänster <ArrowDown size={16} /></a></div>
          <div className="hero-bottom">FÖR HEM, FLYTT &amp; FÖRETAG</div>
        </div>
        <div className="hero-visual"><HomeIllustration /><div className="hero-caption">Ett enklare vardagsliv <span>— Göteborg</span></div></div>
      </div>
    </section>
    <TrustStrip />
    <section className="section services-section" id="tjanster"><div className="container">
      <div className="section-heading heading-row"><div><span className="eyebrow">01 / VÅRA TJÄNSTER</span><h2>Hjälp som passar<br /><em>din vardag.</em></h2></div><p>Oavsett om du behöver hjälp regelbundet eller inför en flytt finns vi här för dig.</p></div>
      <div className="services-grid">{services.map((service, index) => <Reveal key={service.slug} delay={index * 0.05}><Link className="service-card" href={`/${service.slug}`}><span className="service-number">0{index + 1}</span><div><h3>{service.name}</h3><p>{service.short}</p></div><span className="service-arrow" aria-hidden="true"><ArrowRight size={19} /></span></Link></Reveal>)}</div>
    </div></section>
    <section className="section calculator-home"><div className="container split-heading"><div><span className="eyebrow">02 / FLYTTSTÄDNING</span><h2>En sak mindre<br /><em>att tänka på.</em></h2><p>Ange bostadens storlek och se vad din flyttstädning kostar efter RUT. Fönsterputs ingår.</p><Link className="text-link" href="/flyttstadning">Läs om flyttstädning <ArrowRight size={17} /></Link></div><PriceCalculator compact /></div></section>
    <section className="section process-section"><div className="container"><div className="section-heading heading-row"><div><span className="eyebrow">03 / SÅ FUNGERAR DET</span><h2>Enkelt hela vägen.</h2></div><p>Från första kontakt till ett rent och välkomnande hem.</p></div><div className="steps-grid"><div className="step-card"><span>01</span><h3>Berätta vad du behöver</h3><p>Välj tjänst och skicka en kostnadsfri förfrågan.</p></div><div className="step-card"><span>02</span><h3>Få en tydlig offert</h3><p>Vi tar fram ett upplägg som passar dina önskemål.</p></div><div className="step-card"><span>03</span><h3>Vi tar hand om resten</h3><p>Vi kommer överens om detaljerna och tar hand om jobbet.</p></div></div></div></section>
    <section className="cta-section"><div className="container cta-inner"><div><span className="eyebrow">VI FINNS HÄR FÖR DIG</span><h2>Vad kan vi hjälpa dig med?</h2><p>Hör av dig så hittar vi ett upplägg som passar.</p></div><Link className="button button-white" href="/faq-kontakt#offert">Begär en kostnadsfri offert <ArrowRight size={18} /></Link></div></section>
  </>;
}
