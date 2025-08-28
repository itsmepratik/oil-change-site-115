export interface OilGrade {
  id: string;
  name: string;
  description: string;
}

export interface OilBrand {
  id: string;
  name: string;
  grades: OilGrade[];
}

// Common oil brands and grades
export const OIL_BRANDS: OilBrand[] = [
  {
    id: "castrol",
    name: "Castrol",
    grades: [
      { id: "5w30", name: "5W-30", description: "Synthetic motor oil for modern engines" },
      { id: "5w40", name: "5W-40", description: "High performance synthetic oil" },
      { id: "10w30", name: "10W-30", description: "Conventional motor oil" },
      { id: "10w40", name: "10W-40", description: "Multigrade oil for all-season use" },
      { id: "0w20", name: "0W-20", description: "Ultra-low viscosity synthetic oil" },
      { id: "0w30", name: "0W-30", description: "Low viscosity synthetic oil" },
    ],
  },
  {
    id: "mobil1",
    name: "Mobil 1",
    grades: [
      { id: "0w20", name: "0W-20", description: "Advanced full synthetic oil" },
      { id: "0w30", name: "0W-30", description: "Full synthetic oil for high performance" },
      { id: "0w40", name: "0W-40", description: "High temperature protection" },
      { id: "5w30", name: "5W-30", description: "Synthetic blend motor oil" },
      { id: "5w50", name: "5W-50", description: "High performance racing oil" },
    ],
  },
  {
    id: "shell",
    name: "Shell",
    grades: [
      { id: "5w30", name: "5W-30", description: "Helix Ultra ECT" },
      { id: "5w40", name: "5W-40", description: "Helix Ultra Diesel" },
      { id: "10w30", name: "10W-30", description: "Conventional motor oil" },
      { id: "10w40", name: "10W-40", description: "Rotella T6 synthetic" },
      { id: "15w40", name: "15W-40", description: "Heavy duty diesel engine oil" },
    ],
  },
  {
    id: "valvoline",
    name: "Valvoline",
    grades: [
      { id: "5w20", name: "5W-20", description: "SynPower Full Synthetic" },
      { id: "5w30", name: "5W-30", description: "Advanced Full Synthetic" },
      { id: "5w40", name: "5W-40", description: "European Vehicle Full Synthetic" },
      { id: "10w30", name: "10W-30", description: "Conventional motor oil" },
      { id: "10w40", name: "10W-40", description: "MaxLife High Mileage" },
    ],
  },
  {
    id: "royalpurple",
    name: "Royal Purple",
    grades: [
      { id: "5w20", name: "5W-20", description: "High performance synthetic" },
      { id: "5w30", name: "5W-30", description: "Synerlec full synthetic" },
      { id: "5w40", name: "5W-40", description: "European specification" },
      { id: "10w30", name: "10W-30", description: "Conventional motor oil" },
      { id: "10w40", name: "10W-40", description: "Heavy duty synthetic" },
    ],
  },
  {
    id: "bosch",
    name: "Bosch",
    grades: [
      { id: "5w30", name: "5W-30", description: "Fully synthetic motor oil" },
      { id: "5w40", name: "5W-40", description: "Long-life formula" },
      { id: "10w40", name: "10W-40", description: "Mineral motor oil" },
    ],
  },
  {
    id: "liquimoly",
    name: "Liqui Moly",
    grades: [
      { id: "5w30", name: "5W-30", description: "Top Tec 4100" },
      { id: "5w40", name: "5W-40", description: "Longlife III" },
      { id: "0w30", name: "0W-30", description: "Leichtlauf High Tech" },
      { id: "0w40", name: "0W-40", description: "Ultratec 040" },
      { id: "10w40", name: "10W-40", description: "Mineral oil" },
    ],
  },
];

// Filter quality options
export const FILTER_QUALITY_OPTIONS = [
  { id: "oem", name: "OEM (Original Equipment Manufacturer)", description: "Genuine manufacturer parts" },
  { id: "second", name: "Second Copy", description: "High quality aftermarket alternatives" },
  { id: "copy", name: "Copy", description: "Budget-friendly alternatives" },
];