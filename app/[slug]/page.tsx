import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { FaqList } from "@/components/interactive";
import { PriceTables, QuoteSection, ServicePage } from "@/components/service-page";
import { generalFaq, rutFaq, services } from "@/lib/services";

const otherPages: Record<string, { title: string; description: string }> = {
  priser: { title: "Priser & RUT", description: "Se priser för flyttstädning och läs om RUT-avdrag." },
  "faq-kontakt": { title: "FAQ & kontakt", description: "Vanliga frågor och kontaktuppgifter till Let's Clean Göteborg." },
  villkor: { title: "Allmänna villkor", description: "Allmän information om våra villkor." },
  integritet: { title: "Integritetspolicy", description: "Information om hur vi hanterar dina kontaktuppgifter." },
};

export function generateStaticParams() {
  return [...services.map(({ slug }) => ({ slug })), ...Object.keys(otherPages).map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const page = otherPages[slug];
  return { title: service?.name ?? page?.title, description: service?.intro ?? page?.description };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (service) return <ServicePage service={service} />;
  const page = otherPages[slug];
  if (!page) notFound();
  return <>
    <section className="page-hero"><div className="container"><Link className="breadcrumb" href="/">Hem <span>/</span> {page.title}</Link><span className="eyebrow">LET&apos;S CLEAN GÖTEBORG</span><h1>{page.title}<span className="orange">.</span></h1><p>{page.description}</p></div></section>
    {slug === "priser" && <><section className="section"><div className="container"><div className="rut-card"><div><span className="eyebrow">BRA ATT VETA</span><h2>Mer hjälp med RUT-avdrag</h2><p>RUT ger privatpersoner 50 % skattereduktion på arbetskostnaden för godkända tjänster. ROT och RUT får tillsammans uppgå till högst 75 000 kr per person och år, varav ROT högst 50 000 kr. Du behöver ha rätt till avdraget och tillräckligt utrymme kvar; det beror bland annat på din skatt och dina övriga avdrag. Vi hanterar ansökan hos Skatteverket.</p><p>RUT gäller inte företag.</p></div><strong>50 %<small>på arbetskostnaden</small></strong></div><div className="section-heading"><span className="eyebrow">FLYTTSTÄDNING</span><h2>Våra priser</h2></div><PriceTables /><p>Övriga tjänster prissätts efter dina behov. <Link className="text-link" href="/faq-kontakt#offert">Begär offert <ArrowRight size={16} /></Link></p></div></section><section className="section section-soft"><div className="container narrow"><h2>Vanliga frågor om RUT</h2><FaqList items={rutFaq} /></div></section><QuoteSection /></>}
    {slug === "faq-kontakt" && <><section className="section"><div className="container faq-layout"><div><span className="eyebrow">VI FINNS HÄR</span><h2>Hur kan vi hjälpa dig?</h2><p>Hittar du inte svaret du söker? Hör gärna av dig.</p><div className="contact-links"><a href="tel:0313204556"><Phone size={18} /> 031-320 45 56</a><a href="mailto:info@letscleangoteborg.se"><Mail size={18} /> info@letscleangoteborg.se</a><p>Mån–sön 08.00–19.00</p></div></div><FaqList items={[...generalFaq, ...rutFaq]} searchable /></div></section><QuoteSection /></>}
    {slug === "villkor" && <section className="section"><div className="container legal-copy"><h2>Inför din bokning</h2><p>Tjänstens omfattning, pris och tidpunkt bekräftas i offerten eller i separat överenskommelse. Kontakta oss om du har frågor om din bokning eller behöver ändra den.</p><h2>RUT och betalning</h2><p>Priser efter RUT förutsätter att du har rätt till avdraget och tillräckligt avdragsutrymme. Villkor för betalning meddelas i samband med offert eller bokning.</p><p>Denna information är övergripande. Företaget behöver granska och fastställa de slutliga avtalsvillkoren.</p></div></section>}
    {slug === "integritet" && <section className="section"><div className="container legal-copy"><h2>Din integritet</h2><p>När du kontaktar oss via formuläret eller e-post använder vi uppgifterna du lämnar för att besvara din förfrågan och hantera eventuell bokning. Formuläret skickar uppgifterna via vår server och e-postleverantören Resend till vår e-postadress.</p><p>Skicka inte personnummer eller andra känsliga uppgifter i formuläret eller via e-post.</p><h2>Kontakta oss</h2><p>Kontakta oss på <a href="mailto:info@letscleangoteborg.se">info@letscleangoteborg.se</a> om du har frågor om dina uppgifter.</p><p>Denna information är övergripande. Företaget behöver granska och fastställa den slutliga integritetspolicyn.</p></div></section>}
  </>;
}
