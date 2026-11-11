export const movePriceRows: { from: number; to: number; price: number }[] = [
  { from: 0, to: 29, price: 1499 },
  { from: 30, to: 59, price: 1670 },
  { from: 60, to: 89, price: 2314 },
  { from: 90, to: 119, price: 2856 },
  { from: 120, to: 149, price: 3278 },
  { from: 150, to: 199, price: 4179 },
];

export const PER_SQM_FROM_200 = 20;

// null = no fixed price, a quote is needed
export function movePrice(area: number): number | null {
  const row = movePriceRows.find((r) => area >= r.from && area <= r.to);
  if (row) return row.price;
  if (area >= 200) return Math.round(area * PER_SQM_FROM_200);
  return null;
}

export const extras: readonly (readonly [string, number])[] = [
  ["Vanlig balkong", 250],
  ["Inglasad balkong", 450],
  ["Ugnsplåtar", 390],
  ["Kamin / öppen spis", 200],
  ["Avfrostning av frys", 245],
  ["Källar- / vindsförråd", 250],
  ["Vattenlås", 200],
];

export const checklist: Record<string, string[]> = {
  "Generella moment i alla rum": [
    "Fönsterputs in- och utvändigt samt mellan glasen där det är möjligt",
    "Avtorkning av fönsterbänkar och karmar",
    "Dammtorkning av väggar och tak (ingen våtrengöring av väggar)",
    "Våttorkning av garderober in- och utvändigt (tömda)",
    "Golvrengöring och rengöring av trösklar",
    "Rengöring av element och området bakom där det går",
    "Rengöring av ventiler, fast armatur och eluttag",
  ],
  "Kök": [
    "Rengöring av köksskåp och luckor in- och utvändigt",
    "Skåp där sopor förvaras, in- och utvändigt",
    "Spis och ugn",
    "Stänkskydd/kakel ovanför diskbänk samt diskho",
    "Avtorkning av vitvaror, köksutrustning och fläkt",
    "Mikrovågsugn, diskmaskin samt kyl och frys in- och utvändigt",
  ],
  "Badrum & WC": [
    "Rengöring av väggar, golv och golvbrunn",
    "Toalettstol, badkar och tvättställ in- och utvändigt",
    "Putsning av speglar",
    "Förvaringsutrymmen, element och ventiler",
    "Tvättmaskin, torktumlare och torkskåp in- och utvändigt",
  ],
};

export const customerNotes = [
  "El och vatten ska finnas i bostaden – vi har egen belysning med oss.",
  "Kyl och frys ska vara avfrostade och avstängda, om du inte har valt tillägget Avfrostning av frys.",
  "Vitvaror och möbler som ska städas bakom flyttar du fram i förväg, eftersom vi inte flyttar dem på grund av skaderisk.",
  "Front till badkar, ugnsluckans översta glas och galler på slutna element demonterar och monterar du själv.",
  "Vi tar bort fläckar där det är möjligt, men inte på tapeter. Tak och väggar dammtorkas men rengörs inte, och vi tar inte bort tejp eller krokar.",
  "Rengöring bakom varmvattenberedare och bortforsling av sopor ingår inte.",
  "Meddela oss i förväg om det finns skador, till exempel fönster som inte går att öppna, eller grovt nedsmutsade ytor som kan kräva extra tid.",
  "Vattenlås rengörs endast på begäran och bokas som tillägg.",
];
