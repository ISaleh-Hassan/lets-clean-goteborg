import { moveChecklist, moveNotes } from "./flytt";

export type Faq = { question: string; answer: string };
export type Service = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  facts: string[];
  steps: string[];
  groups: { title: string; items: string[] }[];
  notes: string[];
  why: string;
  faq: Faq[];
  options?: { title: string; description: string }[];
};

export const services: Service[] = [
  {
    slug: "flyttstadning", name: "Flyttstädning", short: "Lämna över ett rent hem och fokusera på din flytt.",
    intro: "En grundlig flyttstädning med fönsterputs, tydliga priser och 15 dagars garanti. Vi utgår från Mäklarsamfundets riktlinjer.",
    facts: ["Fönsterputs ingår", "15 dagars garanti", "Priser efter RUT"],
    steps: ["Ange bostadens storlek och se ditt pris.", "Skicka din förfrågan och välj eventuella tillval.", "Vi bekräftar detaljerna och tar hand om städningen."],
    groups: moveChecklist, notes: moveNotes,
    why: "Med en tydlig checklista och pris direkt på sidan blir det enklare att planera flytten.",
    faq: [
      { question: "Ingår fönsterputs?", answer: "Ja, fönsterputs ingår i flyttstädningen." },
      { question: "Vad innebär garantin?", answer: "Kontakta oss inom 15 dagar om du har synpunkter på städningen, så hjälper vi dig vidare." },
    ],
  },
  {
    slug: "hemstadning", name: "Hemstädning", short: "Mer tid över till det som gör ett hem till ditt.",
    intro: "Låt oss ta hand om städningen med ett upplägg som passar din vardag. Vi använder miljövänliga medel och strävar efter att samma städare kommer varje gång.",
    facts: ["Ingen bindningstid", "Ansvarsförsäkring", "RUT för privatpersoner"],
    steps: ["Berätta om ditt hem och hur ofta du vill ha hjälp.", "Vi tar fram en offert utifrån dina behov.", "Vi kommer överens om ett upplägg som passar dig."],
    options: [{ title: "Varje vecka", description: "För ett löpande rent och välskött hem." }, { title: "Varannan vecka", description: "Ett regelbundet upplägg för vardagen." }, { title: "Var fjärde vecka", description: "Återkommande hjälp med längre mellanrum." }],
    groups: [{ title: "Vanliga moment", items: ["Dammsugning och våttorkning av golv", "Dammtorkning av fria ytor", "Rengöring av kök och badrum", "Tömning av papperskorgar"] }],
    notes: ["Vi anpassar omfattningen efter ditt hem och dina önskemål."],
    why: "Vi vill göra vardagen enklare med ett personligt upplägg utan bindningstid.",
    faq: [{ question: "Kan jag välja hur ofta ni kommer?", answer: "Ja, ange önskad frekvens i din offertförfrågan." }],
  },
  {
    slug: "foretagsstadning", name: "Företagsstädning & kontorsstädning", short: "En ren och välkomnande arbetsplats för hela teamet.",
    intro: "Från kontor och pentry till gemensamma ytor. Vi utformar städningen efter verksamhetens behov och arbetstider.",
    facts: ["Anpassat upplägg", "Säker nyckelhantering", "Kostnadsfritt kontorsbesök"],
    steps: ["Berätta om er lokal och era behov.", "Boka ett kostnadsfritt kontorsbesök eller fråga om provstädning.", "Få ett förslag och en offert anpassad till verksamheten."],
    options: [{ title: "Dag", description: "Städning under verksamhetens öppettider." }, { title: "Kväll", description: "Städning efter arbetsdagens slut." }, { title: "Natt", description: "Ett upplägg utanför ordinarie arbetstid." }],
    groups: [{ title: "Exempel på moment", items: ["Städning av kontor och gemensamma ytor", "Rengöring av pentry och toaletter", "Desinficering av skrivbord enligt överenskommelse", "Tömning av papperskorgar"] }],
    notes: ["RUT-avdrag gäller inte för företag.", "Omfattning och nyckelhantering bestäms i samråd."],
    why: "En välskött arbetsplats börjar med ett städupplägg som fungerar för er verksamhet.",
    faq: [{ question: "Gäller RUT för företag?", answer: "Nej, RUT-avdrag gäller privatpersoner, inte företag." }],
  },
  {
    slug: "storstadning", name: "Storstädning", short: "En grundligare genomgång när hemmet behöver extra omsorg.",
    intro: "När den vanliga städningen inte riktigt räcker hjälper vi dig att fräscha upp hemmet på djupet.",
    facts: ["Anpassas efter hemmet", "Fast pris i offert", "RUT för privatpersoner"],
    steps: ["Beskriv vad du vill ha hjälp med.", "Vi lämnar en offert anpassad till ditt hem.", "Vi kommer överens om tid och omfattning."],
    groups: [{ title: "Exempel på moment", items: ["Grundlig rengöring av kök och badrum", "Dammtorkning av ytor och lister", "Dammsugning och rengöring av golv", "Rengöring av dörrar och kontaktytor"] }],
    notes: ["Berätta gärna om särskilda önskemål i förfrågan."],
    why: "Du får en tydlig offert och en städning som anpassas efter dina behov.",
    faq: [{ question: "Vad kostar storstädning?", answer: "Priset beror på bostaden och omfattningen. Begär offert för ett fast pris." }],
  },
  {
    slug: "flytthjalp", name: "Flytthjälp", short: "Trygg hjälp med att få sakerna till ditt nya hem.",
    intro: "Planera flytten med hjälp av ett team och en lastbil. Vi tar fram ett upplägg utifrån dina förutsättningar.",
    facts: ["Team och lastbil", "Fast pris i offert", "Anpassas efter din flytt"],
    steps: ["Berätta varifrån och vart du ska flytta.", "Vi tar fram en offert efter flyttens omfattning.", "Vi planerar flyttdagen tillsammans."],
    options: [{ title: "2 personer + lastbil", description: "Ett upplägg för flyttar med mindre behov av bärhjälp." }, { title: "3 personer + lastbil", description: "Ett större team när flytten kräver fler händer." }],
    groups: [{ title: "Flytthjälp efter överenskommelse", items: ["Bärhjälp", "Transport med lastbil", "Lastning och lossning"] }],
    notes: ["Ange adresser, våningsplan och eventuell hiss i din förfrågan.", "RUT kan gälla för arbetskostnaden vid flytt för privatpersoner."],
    why: "Vi hjälper dig att planera flytten med en offert som utgår från dina behov.",
    faq: [{ question: "Vad kostar flytthjälp?", answer: "Begär en offert så tar vi fram ett pris utifrån din flytt." }],
  },
  {
    slug: "dodsbo", name: "Dödsbo", short: "Varsam hjälp när du behöver stöd i en svår tid.",
    intro: "Vi hjälper till med praktiska delar kring ett dödsbo med respekt för både människor och tillhörigheter.",
    facts: ["Personligt bemötande", "Upplägg efter behov", "Fast pris i offert"],
    steps: ["Kontakta oss och berätta vad du behöver hjälp med.", "Vi går igenom önskemål och förutsättningar.", "Du får en offert och vi planerar nästa steg tillsammans."],
    groups: [{ title: "Hjälp efter överenskommelse", items: ["Planering av arbetet", "Hjälp med praktiska moment", "Städning enligt överenskommelse"] }],
    notes: ["Vi anpassar hjälpen efter situationen och dina önskemål."],
    why: "Vi lyssnar på dina behov och tar de praktiska frågorna i den takt som passar dig.",
    faq: [{ question: "Hur börjar jag?", answer: "Kontakta oss via formuläret, telefon eller e-post så pratar vi om vad du behöver." }],
  },
];

export const generalFaq: Faq[] = [
  { question: "Hur får jag en offert?", answer: "Fyll i formuläret eller kontakta oss via telefon eller e-post. Vi återkommer med ett förslag." },
  { question: "Vilka områden arbetar ni i?", answer: "Vi hjälper kunder i Göteborg med omnejd. Kontakta oss om du är osäker på ditt område." },
  { question: "Vad händer när jag skickar formuläret?", answer: "Din förfrågan skickas till oss via webbplatsen. Om det inte går att skicka den kan du kontakta oss via telefon eller e-post." },
];
export const rutFaq: Faq[] = [
  { question: "Vad är RUT-avdrag?", answer: "RUT innebär en skattereduktion på 50 % av arbetskostnaden för godkända tjänster. ROT och RUT får tillsammans uppgå till högst 75 000 kr per person och år, varav ROT högst 50 000 kr. Rätten till avdrag beror bland annat på din skatt och dina övriga avdrag." },
  { question: "Kan företag använda RUT?", answer: "Nej, RUT-avdrag gäller privatpersoner och inte företag." },
  { question: "Hur fungerar RUT-avdraget?", answer: "Vi hanterar ansökan hos Skatteverket. Du ansvarar för att ha rätt till avdraget och tillräckligt utrymme kvar." },
];
