import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export const metadata: Metadata = { title: "Övriga tjänster", description: "Storstädning, flytthjälp och hjälp med dödsbo i Göteborg." };

export default function OtherServices() {
  return <><section className="page-hero"><div className="container"><Link className="breadcrumb" href="/">Hem <span>/</span> Övriga tjänster</Link><span className="eyebrow">HÄR FÖR DIG</span><h1>Övriga tjänster<span className="orange">.</span></h1><p>Mer hjälp när du behöver det, anpassad efter dina behov.</p></div></section><section className="section"><div className="container services-grid">{services.filter((service) => ["storstadning", "flytthjalp", "dodsbo"].includes(service.slug)).map((service, index) => <Link className="service-card" href={`/${service.slug}`} key={service.slug}><span className="service-number">0{index + 1}</span><div><h3>{service.name}</h3><p>{service.short}</p></div><span className="service-arrow" aria-hidden="true"><ArrowRight size={18} /></span></Link>)}</div></section></>;
}
