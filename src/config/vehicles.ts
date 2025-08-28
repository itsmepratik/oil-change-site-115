export interface VehicleModel {
  id: string;
  name: string;
}

export interface VehicleBrand {
  id: string;
  name: string;
  models: VehicleModel[];
}

// Vehicle data with brands, models, and years
export const VEHICLE_BRANDS: VehicleBrand[] = [
  {
    id: "toyota",
    name: "Toyota",
    models: [
      { id: "camry", name: "Camry" },
      { id: "corolla", name: "Corolla" },
      { id: "prius", name: "Prius" },
      { id: "rav4", name: "RAV4" },
      { id: "highlander", name: "Highlander" },
      { id: "sienna", name: "Sienna" },
      { id: "avalon", name: "Avalon" },
      { id: "tacoma", name: "Tacoma" },
      { id: "tundra", name: "Tundra" },
    ],
  },
  {
    id: "honda",
    name: "Honda",
    models: [
      { id: "civic", name: "Civic" },
      { id: "accord", name: "Accord" },
      { id: "crv", name: "CR-V" },
      { id: "pilot", name: "Pilot" },
      { id: "odyssey", name: "Odyssey" },
      { id: "hrv", name: "HR-V" },
      { id: "ridgeline", name: "Ridgeline" },
    ],
  },
  {
    id: "ford",
    name: "Ford",
    models: [
      { id: "focus", name: "Focus" },
      { id: "fusion", name: "Fusion" },
      { id: "escape", name: "Escape" },
      { id: "explorer", name: "Explorer" },
      { id: "f150", name: "F-150" },
      { id: "f250", name: "F-250" },
      { id: "mustang", name: "Mustang" },
      { id: "edge", name: "Edge" },
    ],
  },
  {
    id: "chevrolet",
    name: "Chevrolet",
    models: [
      { id: "malibu", name: "Malibu" },
      { id: "impala", name: "Impala" },
      { id: "equinox", name: "Equinox" },
      { id: "traverse", name: "Traverse" },
      { id: "silverado", name: "Silverado" },
      { id: "colorado", name: "Colorado" },
      { id: "camaro", name: "Camaro" },
      { id: "corvette", name: "Corvette" },
    ],
  },
  {
    id: "nissan",
    name: "Nissan",
    models: [
      { id: "sentra", name: "Sentra" },
      { id: "altima", name: "Altima" },
      { id: "maxima", name: "Maxima" },
      { id: "rogue", name: "Rogue" },
      { id: "murano", name: "Murano" },
      { id: "pathfinder", name: "Pathfinder" },
      { id: "titan", name: "Titan" },
    ],
  },
  {
    id: "bmw",
    name: "BMW",
    models: [
      { id: "3series", name: "3 Series" },
      { id: "5series", name: "5 Series" },
      { id: "x3", name: "X3" },
      { id: "x5", name: "X5" },
      { id: "m3", name: "M3" },
    ],
  },
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    models: [
      { id: "cclass", name: "C-Class" },
      { id: "eclass", name: "E-Class" },
      { id: "sclass", name: "S-Class" },
      { id: "glc", name: "GLC" },
      { id: "gle", name: "GLE" },
    ],
  },
  {
    id: "audi",
    name: "Audi",
    models: [
      { id: "a3", name: "A3" },
      { id: "a4", name: "A4" },
      { id: "a6", name: "A6" },
      { id: "q5", name: "Q5" },
      { id: "q7", name: "Q7" },
    ],
  },
  {
    id: "hyundai",
    name: "Hyundai",
    models: [
      { id: "elantra", name: "Elantra" },
      { id: "sonata", name: "Sonata" },
      { id: "tucson", name: "Tucson" },
      { id: "santafe", name: "Santa Fe" },
      { id: "palisade", name: "Palisade" },
    ],
  },
  {
    id: "kia",
    name: "Kia",
    models: [
      { id: "forte", name: "Forte" },
      { id: "optima", name: "Optima" },
      { id: "sportage", name: "Sportage" },
      { id: "sorento", name: "Sorento" },
      { id: "telluride", name: "Telluride" },
    ],
  },
];

// Generate years from 1990 to current year
export const VEHICLE_YEARS: number[] = Array.from(
  { length: new Date().getFullYear() - 1989 },
  (_, i) => new Date().getFullYear() - i
);