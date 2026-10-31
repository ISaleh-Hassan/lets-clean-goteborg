import Link from "next/link";
import { ArrowDownRight, ArrowRight, BadgeCheck, Building2, HeartHandshake, Home, MoveRight, Sparkles, Truck, Wind } from "lucide-react";
import { EstimateCard, TrustStrip } from "@/components/interactive";
import { HeroIn, Reveal, Stagger, StaggerItem } from "@/components/reveal";

const services = [
  { title:"Flyttstädning", text:"Lämna nycklarna med lugn i magen. Fast pris och 15 dagars garanti.", icon:MoveRight, href:"/flyttstadning", label:"Mest bokad" },
  { title:"Hemstädning", text:"Ett rent hem, på dina villkor. Välj veckovis eller när det passar.", icon:Home, href:"/hemstadning" },
  { title:"Företagsstädning", text:"En trivsam arbetsplats med ett schema som fungerar för er.", icon:Building2, href:"/foretagsstadning" },
  { title:"Storstädning", text:"När hemmet behöver lite extra omtanke från golv till tak.", icon:Sparkles, href:"/storstadning" },
  { title:"Flytthjälp", text:"Bärhjälp och lastbil när det är dags att byta adress.", icon:Truck, href:"/flytthjalp" },
  { title:"Dödsbo", text:"Varsam hjälp med tömning och städning i en svår stund.", icon:HeartHandshake, href:"/dodsbo" },
];

export default function HomePage() {
  return <>
    <section className="hero">
      <div className="container grid items-center gap-10 py-12 md:grid-cols-[1.05fr_.95fr] md:py-16">
        <HeroIn className="py-2">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white/80 px-3 py-2 text-xs font-bold text-slate-700"><span className="text-emerald-500"><BadgeCheck size={16}/></span> Lokal städhjälp i hela Göteborg</div>
          <p className="eyebrow">Rent hemma. Lugn i magen.</p>
          <h1 className="mt-4 max-w-xl text-4xl font-black leading-[1.08] tracking-[-.045em] sm:text-5xl lg:text-[58px]">Göteborgs tryggaste städfirma för <span className="text-[#ff6b00]">hem & företag</span></h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">Boka på 2 minuter. Fast pris, 15 dagars garanti och 50% RUT-avdrag direkt på fakturan.</p>
          <div className="mt-7 flex flex-wrap items-center gap-3"><Link className="button" href="/faq-kontakt#offert">Få fri offert <ArrowRight size={17}/></Link><Link href="/flyttstadning" className="rounded-full px-4 py-3 text-sm font-bold text-slate-700 hover:bg-white">Se våra priser <ArrowDownRight size={15} className="inline"/></Link></div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500"><span className="flex items-center gap-1.5"><BadgeCheck size={15} className="text-emerald-500"/>15 dagars garanti</span><span className="flex items-center gap-1.5"><Wind size={15} className="text-emerald-500"/>Miljövänliga produkter</span></div>
        </HeroIn>
        <HeroIn delay={0.2} x={30} className="relative">
          <div className="hero-photo"/>
          <div className="absolute -bottom-5 left-5 max-w-[220px] rounded-2xl bg-white p-4 shadow-xl sm:left-[-22px]"><div className="flex items-center gap-2 text-emerald-600"><BadgeCheck size={18}/><span className="text-sm font-extrabold">Tryggt från start</span></div><p className="mt-1 text-xs leading-5 text-slate-500">Försäkrad personal och tydliga priser utan överraskningar.</p></div>
        </HeroIn>
      </div>
    </section>
    <section className="container relative z-10 -mt-1 pb-12 md:-mt-8">
      <Reveal className="mx-auto max-w-[870px]"><EstimateCard/></Reveal>
    </section>
    <section className="section">
      <div className="container">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Hjälp när du behöver den</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">En enklare vardag börjar här</h2></div><Link href="/ovriga-tjanster" className="text-sm font-bold text-[#e85f00]">Alla tjänster <ArrowRight className="ml-1 inline" size={16}/></Link></div>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map(({title,text,icon:Icon,href,label})=><StaggerItem key={title}><Link href={href} className="card group block p-6 transition hover:-translate-y-1 hover:shadow-lg"><div className="flex items-center justify-between"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#ff6b00]"><Icon size={22}/></span>{label&&<span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-emerald-700">{label}</span>}</div><h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#e85f00]">Läs mer <ArrowRight size={15} className="transition group-hover:translate-x-1"/></span></Link></StaggerItem>)}</Stagger>
      </div>
    </section>
    <section className="section section-soft">
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center"><p className="eyebrow">Litet extra lugn</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Därför väljer Göteborg oss</h2><p className="mt-3 text-slate-600">Vi tror att riktigt bra service märks både i resultatet och i känslan efteråt.</p></div>
        <Reveal><TrustStrip/></Reveal>
      </div>
    </section>
    <section className="section">
      <div className="container grid items-center gap-12 md:grid-cols-[.8fr_1.2fr]">
        <div><p className="eyebrow">Enkelt hela vägen</p><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Från första hej till skinande rent</h2><p className="mt-4 leading-7 text-slate-600">Vi håller det okomplicerat. Du berättar vad du behöver, vi tar hand om resten.</p><Link className="button mt-6" href="/faq-kontakt#offert">Kom igång <ArrowRight size={16}/></Link></div>
        <Stagger className="grid gap-4 sm:grid-cols-3">{[["01","Begär offert","Berätta kort om bostaden och vad du behöver."],["02","Bekräfta & boka","Vi återkommer med ett tydligt pris och hittar en tid."],["03","Njut av rent","Vi tar hand om städningen – du kan fokusera på annat."]].map(([n,title,text])=><StaggerItem key={n} className="rounded-2xl border border-slate-100 p-5"><span className="text-sm font-black text-[#ff6b00]">{n} /</span><h3 className="mt-5 font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></StaggerItem>)}</Stagger>
      </div>
    </section>
    <section className="pb-20"><div className="container"><div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#0f172a] p-8 text-white sm:flex-row sm:items-center sm:p-12"><div><p className="text-sm font-bold text-orange-300">Redo för en enklare vardag?</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Vi hjälper dig gärna, Göteborg.</h2></div><Link href="/faq-kontakt#offert" className="button shrink-0">Be om fri offert <ArrowRight size={16}/></Link></div></div></section>
  </>;
}
