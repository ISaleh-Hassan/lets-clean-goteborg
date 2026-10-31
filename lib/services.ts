import { checklist, customerNotes } from "./flytt";

export type Faq = [string, string];
export type Group = { title: string; items: string[] };

export type Service = {
  slug: string;
  name: string;
  nav: string;
  icon: "move" | "home" | "building" | "sparkles" | "truck" | "heart";
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  cta: string;
  facts: [string, string][];
  how: { title: string; intro: string; steps: [string, string][] };
  table?: { title: string; intro: string; head: [string, string, string]; rows: [string, string, string][] };
  includes: { title: string; intro: string; groups: Group[] };
  notes: { title: string; items: string[] };
  why: { title: string; paragraphs: [string, string][] };
  faq: Faq[];
  formService: string;
};

export const rutFaq: Faq[] = [
  ["Kan jag använda RUT-avdrag?", "Ja, om tjänsten är hushållsnära och du är privatperson med skatt att reducera. Flyttstädning, hemstädning, storstädning och flytthjälp ger rätt till avdrag."],
  ["Hur mycket kan jag spara?", "RUT ger 50% av arbetskostnaden, upp till 50 000 kr per person och år. Priserna på vår webbplats visar vad du betalar efter avdraget."],
  ["Vad måste jag göra själv?", "Ingenting hos Skatteverket. Vi drar av beloppet på fakturan och skickar in ansökan, du betalar det reducerade beloppet."],
  ["Gäller RUT för företag?", "Nej, RUT är till för privatpersoner. Företagsstädning prissätts separat i offerten."],
];

export const generalFaq: Faq[] = [
  ["Hur snabbt får jag ett pris?", "Fyll i offertformuläret med bostadens yta och önskat datum. Du får ett personligt prisförslag av oss, vanligtvis samma dag."],
  ["Måste jag vara hemma under städningen?", "Nej. Vi kommer överens om nyckelhantering i förväg, och du bestämmer hur nycklarna lämnas och hämtas."],
  ["Kan jag boka med kort varsel?", "Ibland. Det beror på vilka tider som är lediga, så hör av dig så tittar vi på vad som går."],
  ["Är personalen försäkrad?", "Ja. Arbetet utförs av ansvarsförsäkrad personal."],
  ["Hur bokar jag?", "Begär en offert, bekräfta den genom att signera eller ringa oss, så bokar vi in dig. Du kan även maila eller ringa 031-320 45 56."],
  ["Hur fungerar garantin?", "Flyttstädning har 15 dagars garanti. Om något inte blir godkänt åtgärdar vi det utan kostnad."],
];

export const services: Service[] = [
  {
    slug: "flyttstadning",
    name: "Flyttstädning",
    nav: "Flyttstädning",
    icon: "move",
    metaTitle: "Flyttstädning Göteborg – fast pris & 15 dagars garanti",
    metaDescription: "Flyttstädning i Göteborg med fast pris, fönsterputs, 15 dagars garanti och 50% RUT-avdrag. Följer Mäklarsamfundets riktlinjer.",
    eyebrow: "Lämna med lugn i magen",
    h1: "Flyttstädning i Göteborg",
    intro: "När du flyttar har du redan en lång att-göra-lista. Låt oss ta hand om städningen så att du kan lägga energin på ditt nya hem. Vi städar efter Mäklarsamfundets riktlinjer, med fast pris, fönsterputs och 15 dagars garanti.",
    cta: "Få fast pris inom 1 timme",
    facts: [["Fast pris", "Inga dolda avgifter, fönsterputs ingår"], ["15 dagars garanti", "Åtgärdas utan kostnad"], ["50% RUT", "Direkt på fakturan"]],
    how: {
      title: "Från offert till godkänd besiktning",
      intro: "Vi hanterar allt från första förfrågan till slutbesiktning, och du väljer själv om du vill ha kontakt via formulär, telefon eller e-post.",
      steps: [
        ["Begär offert", "Ange bostadens yta och önskat datum, så återkommer vi med ett prisförslag."],
        ["Bekräfta offert", "Signera offerten eller ring oss. Vi anpassar arbetet efter dina önskemål."],
        ["15 dagars garanti", "Efter städningen har du 15 dagar på dig. Är något inte godkänt åtgärdar vi det kostnadsfritt."],
      ],
    },
    includes: {
      title: "Följande ingår i flyttstädning i Göteborg",
      intro: "Vi städar både synliga och dolda ytor enligt Mäklarsamfundets rekommendationer, inklusive vitvaror, fläktar, ventiler och fönster.",
      groups: Object.entries(checklist).map(([title, items]) => ({ title, items })),
    },
    notes: { title: "Att tänka på som kund", items: customerNotes },
    why: {
      title: "Därför flyttstädning hos oss",
      paragraphs: [
        ["Specialiserade på flytt", "Flyttstädning kräver en högre standard än vanlig städning. Vi arbetar efter checklistan så att varje punkt blir klar."],
        ["Hur lång tid tar det?", "En mindre lägenhet tar några timmar och en större villa kan ta en hel dag. Tiden beror på storlek och skick."],
        ["Miljövänliga produkter", "Vi väljer skonsamma städprodukter, för ett rent hem och en lägre miljöpåverkan."],
        ["Trygg ekonomi", "Du får fast pris, 50% RUT-avdrag direkt på fakturan och vi sköter ansökan till Skatteverket."],
      ],
    },
    faq: [
      ["Vad ingår i flyttstädningen?", "Alla rum städas enligt checklistan ovan, med kök, badrum, golv, ytor och fönsterputs. Tillägg som balkong och ugnsplåtar bokas separat."],
      ["Hur fungerar garantin?", "Du har 15 dagar efter städningen. Om något inte godkänns vid besiktningen åtgärdar vi det utan extra kostnad."],
      ["Vad behöver jag göra innan?", "Se till att el och vatten fungerar, att bostaden är tömd och att kyl och frys är avfrostade och avstängda."],
      ["Måste jag vara hemma?", "Nej, vi kommer överens om nyckelhantering i förväg."],
      ["Kan jag använda RUT-avdrag?", "Ja. Flyttstädning är en hushållsnära tjänst och priserna ovan gäller efter 50% RUT-avdrag."],
      ["Vad kostar det om min bostad är 115–180 m²?", "Då får du ett fast pris i din offert. Över 180 m² kostar det 30 kr/m²."],
    ],
    formService: "Flyttstädning",
  },
  {
    slug: "hemstadning",
    name: "Hemstädning",
    nav: "Hemstädning",
    icon: "home",
    metaTitle: "Hemstädning Göteborg – veckovis, varannan vecka eller var fjärde vecka",
    metaDescription: "Hemstädning i Göteborg utan bindningstid. Samma städare varje gång, ansvarsförsäkrad personal och 50% RUT-avdrag.",
    eyebrow: "Mer tid för det du gillar",
    h1: "Hemstädning i Göteborg",
    intro: "Regelbunden städning som tar bort måstena från helgen. Du väljer hur ofta vi kommer, vi tar hand om resten. Du binder dig inte till något och du får samma städare varje gång när det är möjligt.",
    cta: "Be om offert på hemstädning",
    facts: [["Ingen bindningstid", "Ändra eller avsluta när du vill"], ["Samma städare", "Så långt det går varje gång"], ["50% RUT", "Du betalar efter avdrag"]],
    how: {
      title: "Så kommer vi igång",
      intro: "Vi börjar med en kort genomgång av ditt hem och dina önskemål, sedan sätter vi ett upplägg som passar din vardag.",
      steps: [
        ["Berätta om hemmet", "Ange yta, antal rum och hur ofta du vill ha städning."],
        ["Få upplägg och pris", "Vi återkommer med ett förslag på tid, omfattning och pris efter RUT."],
        ["Vi städar, du lever", "Vi kommer på fasta tider. Du kan alltid ändra, flytta eller pausa."],
      ],
    },
    table: {
      title: "Välj din rytm",
      intro: "Alla upplägg är utan bindningstid. Priset beror på bostadens storlek och önskad omfattning, och bekräftas i offerten.",
      head: ["Rytm", "Passar dig som", "Besök"],
      rows: [
        ["Varje vecka", "vill ha det rent och fräscht jämt, till exempel i barnfamilj eller stor bostad", "Var 7:e dag"],
        ["Varannan vecka", "vill ha en bra grundstandard utan att städa själv", "Var 14:e dag"],
        ["Var fjärde vecka", "städar själv emellan och vill ha hjälp med det grundliga", "Var 28:e dag"],
      ],
    },
    includes: {
      title: "Det här ingår i hemstädningen",
      intro: "Vi utgår från en fast rutin och anpassar efter ditt hem. Säg till om du vill ha något extra eller vill att vi hoppar över något.",
      groups: [
        { title: "Alla rum", items: ["Dammsugning och moppning av golv", "Dammtorkning av ytor, lister och fönsterbrädor", "Avtorkning av dörrhandtag och strömbrytare", "Bäddning och undanplockning efter överenskommelse"] },
        { title: "Kök", items: ["Rengöring av bänkar, diskho och spis", "Avtorkning av luckor och vitvaruytor utvändigt", "Tömning av komposten vid behov"] },
        { title: "Badrum & WC", items: ["Rengöring av toalett, handfat och dusch", "Putsning av speglar och blandare", "Avtorkning av golv"] },
      ],
    },
    notes: { title: "Praktiskt att veta", items: ["Vi tar med eget material, så du behöver inte ha något hemma.", "Vi har nyckelhantering som du kan lita på. Du behöver inte vara hemma.", "Har du husdjur eller allergier? Säg till, så anpassar vi produkter och rutiner.", "Behöver du extra: fönsterputs, kyl eller ugn? Vi lägger till det i ditt upplägg."] },
    why: {
      title: "Därför är hemstädning enklare med oss",
      paragraphs: [
        ["Samma ansikte", "Du träffar samma städare så långt det går, så att de lär sig hur du vill ha det."],
        ["Trygghet", "Personalen är ansvarsförsäkrad och vi använder miljövänliga rengöringsmedel."],
        ["Full flexibilitet", "Ingen bindningstid. Du kan ändra frekvens, flytta en tid eller pausa under semestern."],
      ],
    },
    faq: [
      ["Finns det bindningstid?", "Nej. Du kan ändra eller avsluta ditt upplägg när du vill."],
      ["Får jag samma städare varje gång?", "Vi försöker alltid låta samma person komma, så att de lär känna ditt hem."],
      ["Vad kostar hemstädning?", "Priset beror på bostadens storlek och omfattning. Du får ett tydligt pris efter RUT i din offert."],
      ["Måste jag vara hemma?", "Nej. Vi kommer överens om hur vi hanterar nyckeln."],
      ["Kan jag flytta eller avboka ett städtillfälle?", "Ja, hör av dig i god tid så hittar vi en ny tid. Villkoren står i din bokningsbekräftelse."],
      ["Ingår material?", "Ja, vi tar med eget material och miljövänliga produkter."],
    ],
    formService: "Hemstädning",
  },
  {
    slug: "foretagsstadning",
    name: "Företagsstädning",
    nav: "Företagsstädning",
    icon: "building",
    metaTitle: "Företagsstädning & kontorsstädning i Göteborg",
    metaDescription: "Kontorsstädning och företagsstädning i Göteborg med schema anpassat efter er verksamhet. Boka kostnadsfritt kontorsbesök eller provstädning.",
    eyebrow: "För verksamheter i Göteborg",
    h1: "Företags- och kontorsstädning",
    intro: "En ren arbetsplats märks på stämningen och på intrycket hos kunder. Vi städar kontor, showrooms, butiker och fastigheters gemensamma ytor, med ett schema som följer er arbetsdag, på dagtid, kvällstid eller natten.",
    cta: "Boka kostnadsfritt kontorsbesök",
    facts: [["Anpassat schema", "Dag, kväll eller natt"], ["Nyckelhantering", "Tydliga rutiner"], ["Provstädning", "Prova innan ni bestämmer er"]],
    how: {
      title: "Så startar vi samarbetet",
      intro: "Vi börjar alltid med att se lokalerna. Det ger ett pris som stämmer och ett schema som fungerar.",
      steps: [
        ["Kontorsbesök", "Vi kommer kostnadsfritt, tittar på lokalerna och lyssnar på era behov."],
        ["Förslag och provstädning", "Ni får schema och pris. Vi kan göra en provstädning så ni ser nivån själva."],
        ["Löpande städning", "Vi städar enligt schema, och ni har en fast kontaktväg för frågor."],
      ],
    },
    table: {
      title: "Städupplägg som passar er",
      intro: "Frekvens och tider bestäms tillsammans. Priset sätts efter lokalens yta, antal personer och omfattning.",
      head: ["Upplägg", "Passar", "Tid på dygnet"],
      rows: [
        ["Dagstädning", "Mindre kontor där städaren kan arbeta på normal arbetstid", "Under arbetsdagen"],
        ["Kvälls- och nattstädning", "Kontor och butiker där ni vill ha ostörd städning", "Efter stängning"],
        ["Veckostädning eller engångsjobb", "Mindre verksamheter eller tillfälliga behov, till exempel inför visning", "Enligt överenskommelse"],
      ],
    },
    includes: {
      title: "Det här kan ingå i er städning",
      intro: "Vi sätter ihop en checklista för just era lokaler. Det här är vår vanliga grund.",
      groups: [
        { title: "Arbetsplatser", items: ["Avtorkning och desinficering av skrivbord", "Tömning av papperskorgar", "Dammsugning och moppning av golv", "Rengöring av glasytor och speglar"] },
        { title: "Pentry & kök", items: ["Rengöring av bänkar, diskho och kaffebryggare", "Avtorkning av kyl, mikro och skåpluckor", "Tömning av diskmaskin vid önskemål"] },
        { title: "Toaletter & entré", items: ["Fullständig rengöring och påfyllning av hygienartiklar", "Rengöring av entré och korridorer", "Avtorkning av handtag och kontaktytor"] },
      ],
    },
    notes: { title: "Så fungerar det", items: ["Nyckel eller passerkort hanteras enligt era rutiner, och vi kvitterar alla nycklar.", "Ni får en fast kontaktväg hos oss för frågor och önskemål.", "RUT-avdrag gäller inte för företag, så priset är det som anges i offerten.", "Vi anpassar schemat vid helger, event och när lokalen används mer än vanligt."] },
    why: {
      title: "Därför städar vi åt lokala företag",
      paragraphs: [
        ["Små och medelstora företag", "Vi är byggda för verksamheter där städningen ska fungera utan extra administration."],
        ["Flexibla tider", "Vi städar när det passar er, utan att störa verksamheten."],
        ["Trygg personal", "Ansvarsförsäkrad personal som hanterar nycklar och lokaler med respekt."],
      ],
    },
    faq: [
      ["Kan vi testa er först?", "Ja, vi gör gärna en provstädning så ni ser nivån innan ni bestämmer er."],
      ["Kan ni städa kvällstid eller på natten?", "Ja, vi anpassar tiderna efter er verksamhet."],
      ["Hur hanterar ni nycklar?", "Vi har tydliga rutiner och kvitterar nycklar eller passerkort. Vi anpassar efter era krav."],
      ["Gäller RUT för företag?", "Nej, RUT är bara för privatpersoner."],
      ["Hur sätts priset?", "Efter lokalens yta, hur ofta vi kommer och vad som ska ingå. Vi lämnar offert efter besöket."],
      ["Kan ni städa trapphus och gemensamma ytor?", "Ja, vi städar även fastigheters gemensamma utrymmen."],
    ],
    formService: "Företagsstädning",
  },
  {
    slug: "storstadning",
    name: "Storstädning",
    nav: "Storstädning",
    icon: "sparkles",
    metaTitle: "Storstädning Göteborg – grundlig städning med RUT-avdrag",
    metaDescription: "Storstädning i Göteborg för hem som behöver en riktig nystart. Grundlig rengöring av kök, badrum och svåråtkomliga ytor med 50% RUT-avdrag.",
    eyebrow: "En riktig nystart för hemmet",
    h1: "Storstädning i Göteborg",
    intro: "Ibland räcker inte den vanliga städningen. Vid storstädning tar vi de ytor som sällan hinns med: bakom, ovanpå och innanför. Perfekt inför vår, högtider, efter en renovering eller när du vill börja om.",
    cta: "Begär offert på storstädning",
    facts: [["Extra grundligt", "Ytor som annars glöms"], ["Anpassas efter hemmet", "Du väljer fokus"], ["50% RUT", "Du betalar efter avdrag"]],
    how: {
      title: "Så går en storstädning till",
      intro: "Vi planerar efter ditt hem. Berätta vad som är viktigast, så lägger vi tiden där den gör störst nytta.",
      steps: [
        ["Berätta vad du vill ha gjort", "Beskriv bostaden och vad du vill att vi fokuserar på."],
        ["Få en tydlig offert", "Du får pris och omfattning i förväg, utan dolda avgifter."],
        ["Vi tar hand om resten", "Vi städar grundligt, rum för rum, med egen utrustning."],
      ],
    },
    includes: {
      title: "Vad ingår i en storstädning?",
      intro: "Omfattningen anpassas efter ditt hem. Det här är det vi vanligtvis gör, utöver en vanlig städning.",
      groups: [
        { title: "Alla rum", items: ["Avtorkning av lister, dörrar, karmar och fönsterbrädor", "Dammtorkning av taklister och element", "Rengöring av armaturer och spegelytor", "Grundlig golvrengöring, även under och bakom lättflyttade möbler"] },
        { title: "Kök", items: ["Rengöring av skåp och lådor utvändigt, invändigt vid önskemål", "Ugn, spis och fläkt", "Kyl och frys vid önskemål", "Stänkskydd och diskho"] },
        { title: "Badrum & WC", items: ["Avkalkning av dusch, kakel och blandare", "Rengöring av golvbrunn och ventiler", "Toalett, handfat och badkar"] },
      ],
    },
    notes: { title: "Bra att veta", items: ["Fönsterputs, balkong och andra tillägg kan bokas till.", "Plocka undan personliga saker så kommer vi åt mer.", "Vi flyttar inte tunga möbler eller vitvaror på grund av skaderisk.", "Vill du ha storstädning regelbundet? Kombinera med hemstädning."] },
    why: {
      title: "Därför storstädning",
      paragraphs: [
        ["Mer än vardagsstädning", "Vi tar dammet som samlats där du aldrig hinner, så att hemmet känns nytt."],
        ["Du styr fokus", "Vill du ha extra fokus på kök, badrum eller fönster? Vi lägger tiden där du vill."],
        ["Trygg start", "Ansvarsförsäkrad personal och miljövänliga produkter."],
      ],
    },
    faq: [
      ["Vad är skillnaden mellan storstädning och hemstädning?", "Hemstädning håller hemmet fräscht med rutiner. Storstädning är en grundligare genomgång av ytor som annars glöms."],
      ["Hur lång tid tar en storstädning?", "Det beror på bostadens storlek och skick. Vi bedömer det i offerten."],
      ["Kan jag få RUT-avdrag?", "Ja, storstädning är en hushållsnära tjänst som ger 50% RUT-avdrag."],
      ["Kan ni putsa fönster?", "Ja, fönsterputs kan läggas till. Säg till när du begär offert."],
      ["Måste jag vara hemma?", "Nej, vi kommer överens om nyckel i förväg."],
    ],
    formService: "Storstädning",
  },
  {
    slug: "flytthjalp",
    name: "Flytthjälp",
    nav: "Flytthjälp",
    icon: "truck",
    metaTitle: "Flytthjälp Göteborg – bärhjälp och lastbil",
    metaDescription: "Flytthjälp i Göteborg med två eller tre medarbetare och lastbil. Bärhjälp, lastning och transport med RUT-avdrag.",
    eyebrow: "Hjälp med själva flytten",
    h1: "Flytthjälp i Göteborg",
    intro: "Vi gör flytten enklare med medarbetare och lastbil. Du väljer om du vill ha två eller tre personer och vi bär, lastar och kör. Beställ flytthjälp tillsammans med flyttstädning och få ett hem som är klart från start till mål.",
    cta: "Begär offert på flytthjälp",
    facts: [["2 eller 3 personer", "Plus lastbil"], ["Bärhjälp", "Vi lastar och lossar"], ["Kombinera", "Med flyttstädning"]],
    how: {
      title: "Så bokar du flytthjälp",
      intro: "Berätta om flytten så rekommenderar vi ett upplägg som passar mängden och avståndet.",
      steps: [
        ["Beskriv flytten", "Från och till vilken adress, våning, hiss eller trappor och ungefärlig mängd."],
        ["Välj paket", "Vi föreslår två eller tre personer med lastbil och lämnar offert."],
        ["Flyttdagen", "Vi kommer i tid, bär, lastar och kör. Du bestämmer var allt ska stå."],
      ],
    },
    table: {
      title: "Våra flyttpaket",
      intro: "Pris beror på mängd, avstånd, våningar och tid. Du får ett tydligt pris i offerten, med RUT-avdrag där det gäller.",
      head: ["Paket", "Passar", "Ingår"],
      rows: [
        ["2 personer + lastbil", "Etta, tvåa eller mindre mängd flyttgods", "Två medarbetare, lastbil, bärhjälp"],
        ["3 personer + lastbil", "Större lägenhet eller villa, flera tunga möbler", "Tre medarbetare, lastbil, bärhjälp"],
      ],
    },
    includes: {
      title: "Det här hjälper vi till med",
      intro: "Vi tar hand om det tunga, så att du kan fokusera på resten av flytten.",
      groups: [
        { title: "Bärhjälp", items: ["Bärning av möbler, kartonger och vitvaror", "Hjälp i trappor och med hiss", "Försiktig hantering av större möbler"] },
        { title: "Transport", items: ["Lastning och lossning av lastbil", "Körning mellan adresserna", "Anpassat efter avstånd och mängd"] },
        { title: "Extra", items: ["Kombinera med flyttstädning av gamla bostaden", "Hjälp med att placera möbler på rätt plats", "Bortforsling kan diskuteras i offerten"] },
      ],
    },
    notes: { title: "Förberedelser", items: ["Packa kartonger i förväg och märk dem med rum.", "Plocka ur lådor med ömtåligt innehåll eller packa dem separat.", "Meddela våningsplan, hiss, parkering och eventuella trånga passager.", "Särskilt tunga eller ömtåliga föremål, till exempel piano, behöver planeras i förväg."] },
    why: {
      title: "Därför flytthjälp hos oss",
      paragraphs: [
        ["Hela flytten på ett ställe", "Flytthjälp och flyttstädning samordnas, så det finns bara en kontakt."],
        ["Försiktig hantering", "Vi bär med omsorg om både dina saker och fastigheten."],
        ["Tydlig offert", "Du vet vad flytten kostar innan vi kommer."],
      ],
    },
    faq: [
      ["Hur många personer behöver jag?", "Två personer räcker oftast för mindre bostäder. För större lägenheter eller villor rekommenderar vi tre."],
      ["Kan jag få RUT-avdrag på flytthjälp?", "Ja, flyttjänster är en hushållsnära tjänst. Avdraget görs direkt på fakturan."],
      ["Måste jag packa själv?", "Ja, du packar kartongerna, så bär och kör vi."],
      ["Kan ni ta tunga möbler?", "Ja, men berätta i förväg om piano, kassaskåp eller andra tunga saker."],
      ["Kan jag boka flyttstädning samtidigt?", "Ja, det är vanligt. Då samordnar vi allt."],
    ],
    formService: "Flytthjälp",
  },
  {
    slug: "dodsbo",
    name: "Dödsbo",
    nav: "Dödsbo",
    icon: "heart",
    metaTitle: "Dödsbo Göteborg – tömning och städning med omtanke",
    metaDescription: "Hjälp med dödsbo i Göteborg: varsam tömning, bortforsling och städning efter era önskemål.",
    eyebrow: "Med respekt och omtanke",
    h1: "Dödsbo i Göteborg",
    intro: "Att ta hand om ett dödsbo är ofta tungt och tar tid. Vi hjälper till att tömma, städa och lämna bostaden i skick, i den takt som passar er. Vi lyssnar först och planerar sedan.",
    cta: "Kontakta oss om dödsbo",
    facts: [["Varsamt", "Vi går igenom allt med er"], ["Hela processen", "Tömning och städning"], ["Tydlig offert", "Innan vi börjar"]],
    how: {
      title: "Så går ett dödsbouppdrag till",
      intro: "Vi tar det i er takt. Ni bestämmer vad som ska sparas, skänkas och forslas bort.",
      steps: [
        ["Samtal och besök", "Vi lyssnar på era önskemål och ser bostaden, utan förpliktelser."],
        ["Plan och offert", "Ni får en tydlig plan med omfattning, tid och pris."],
        ["Tömning och städning", "Vi gör jobbet varsamt och lämnar bostaden städad."],
      ],
    },
    includes: {
      title: "Det här kan vi hjälpa till med",
      intro: "Uppdraget anpassas helt efter er situation. Ni väljer vad ni vill ha hjälp med.",
      groups: [
        { title: "Tömning", items: ["Sortering av det som ska sparas, skänkas eller forslas bort", "Bärning och lastning", "Bortforsling efter överenskommelse"] },
        { title: "Städning", items: ["Grundlig städning av hela bostaden", "Kök, badrum och golv", "Slutstädning inför överlämning eller försäljning"] },
        { title: "Samordning", items: ["Kombinera med flyttstädning inför visning", "Anpassade tider efter bouppteckning och försäljning", "En fast kontaktperson hos oss"] },
      ],
    },
    notes: { title: "Bra att veta", items: ["Vi tar aldrig något utan att ni har godkänt det.", "Meddela i förväg om det finns värdesaker, dokument eller föremål som ska sparas.", "Vi går igenom vad RUT-avdraget kan omfatta i offerten.", "Hör av dig även om du inte vet var du ska börja. Vi hjälper dig igång."] },
    why: {
      title: "Därför dödsbo hos oss",
      paragraphs: [
        ["Lugn och respekt", "Vi förstår att det här är en känslig tid och möter varje uppdrag med respekt."],
        ["Allt hos en aktör", "Tömning, bortforsling och städning samordnas av oss."],
        ["Er takt", "Vi anpassar tider efter er, inte tvärtom."],
      ],
    },
    faq: [
      ["Vad kostar det att tömma ett dödsbo?", "Det beror på mängd och omfattning. Du får en tydlig offert innan vi påbörjar arbetet."],
      ["Kan jag få RUT-avdrag?", "För städning och vissa tjänster kan RUT gälla. Vi går igenom vad som omfattas när vi lämnar offert."],
      ["Kan jag välja vad som ska sparas?", "Ja, ni bestämmer. Vi tar ingenting utan ert godkännande."],
      ["Hur snabbt kan ni komma?", "Det beror på tillgängliga tider. Hör av dig så hittar vi en lösning."],
      ["Ingår städning efteråt?", "Ja, vi kan städa hela bostaden när den är tömd."],
    ],
    formService: "Dödsbo",
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
