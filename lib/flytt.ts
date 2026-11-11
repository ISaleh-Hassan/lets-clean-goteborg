export const priceRows = [
  { min: 0, max: 29, price: 1499 },
  { min: 30, max: 59, price: 1670 },
  { min: 60, max: 89, price: 2314 },
  { min: 90, max: 119, price: 2856 },
  { min: 120, max: 149, price: 3278 },
  { min: 150, max: 199, price: 4179 },
] as const;

export const addOns = [
  { id: "balkong", label: "Vanlig balkong", price: 250 },
  { id: "inglasad-balkong", label: "Inglasad balkong", price: 450 },
  { id: "ugnsplatar", label: "Ugnsplåtar", price: 390 },
  { id: "kamin", label: "Kamin/öppen spis", price: 200 },
  { id: "frys", label: "Avfrostning frys", price: 245 },
  { id: "forrad", label: "Käll-/vindsförråd", price: 250 },
  { id: "vattenlas", label: "Vattenlås", price: 200 },
] as const;

export function movePrice(area: number): number | null {
  if (!Number.isSafeInteger(area) || area <= 0) return null;
  if (area >= 200) return area * 20;
  return priceRows.find((row) => area >= row.min && area <= row.max)?.price ?? null;
}

export const moveChecklist = [
  { title: "Generella moment", items: ["Dammtorkning av ytor, lister och dörrar", "Rengöring av golv, skåp och garderober", "Fönsterputsning", "Rengöring av strömbrytare och element"] },
  { title: "Kök", items: ["Rengöring av skåp och lådor", "Rengöring av spis, ugn och fläkt", "Rengöring av kyl och frys", "Rengöring av diskbänk och blandare"] },
  { title: "Badrum & WC", items: ["Rengöring av toalett, handfat och dusch", "Rengöring av kakel och speglar", "Rengöring av golvbrunn", "Avtorkning av skåp och ytor"] },
];

export const moveNotes = ["El och vatten behöver vara påslagna.", "Frysen ska vara avfrostad om du inte valt till avfrostning.", "Dra fram vitvaror och demontera fronter som ska rengöras bakom.", "Ta bort sopor, tejp och krokar innan städningen.", "Rengöring av vattenlås kan beställas som tillval."];

export const formatPrice = (price: number) => `${new Intl.NumberFormat("sv-SE").format(price)} kr`;
