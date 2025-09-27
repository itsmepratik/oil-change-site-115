export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  image: string;
  tags: string[];
  dateAdded: string;
  featured: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  color: string; // For category tags
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "lubricants",
    name: "Lubricants",
    description: "Motor oils and lubricants for all vehicle types",
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "filters",
    name: "Filters",
    description: "Oil, air, fuel, and cabin filters",
    color: "bg-green-100 text-green-800"
  },
  {
    id: "additives",
    name: "Additives",
    description: "Engine treatments and performance enhancers",
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: "tools",
    name: "Tools & Equipment",
    description: "Professional tools and equipment",
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description: "General maintenance and care products",
    color: "bg-red-100 text-red-800"
  },
  {
    id: "fluids",
    name: "Fluids",
    description: "Transmission, brake, and other automotive fluids",
    color: "bg-indigo-100 text-indigo-800"
  }
];

export const SAMPLE_PRODUCTS: Product[] = [
  // Lubricants
  {
    id: "shell-rotella-t6",
    name: "Shell 20W-50 - Fully synthetic blend",
    category: PRODUCT_CATEGORIES[0],
    subcategory: "Diesel Oil",
    brand: "Shell",
    description: "Full synthetic heavy duty engine oil with Triple Protection Plus technology.",
    specifications: {
      "Viscosity": "5W-40",
      "Type": "Full Synthetic",
      "Volume": "1 Gallon",
      "API Rating": "CK-4",
      "Application": "Heavy Duty Diesel"
    },
    image: "/catalogue/Shell-20W50.png",
    tags: ["diesel", "synthetic"],
    dateAdded: "2024-01-25",
    featured: false
  },
  {
    id: "valvoline-maxlife",
    name: "Valvoline MaxLife High Mileage 10W-30",
    category: PRODUCT_CATEGORIES[0],
    subcategory: "High Mileage Oil",
    brand: "Valvoline",
    description: "Specially formulated for vehicles with over 75,000 miles to reduce leaks and oil burn-off.",
    specifications: {
      "Viscosity": "10W-30",
      "Type": "High Mileage",
      "Volume": "5 Quarts",
      "API Rating": "SN",
      "Mileage": "75,000+ miles"
    },
    image: "/catalogue/f702f605db0dd661ad596979dddf1016.valvoline-20w-50.webp",
    tags: ["high-mileage", "10w30"],
    dateAdded: "2024-02-01",
    featured: false
  },

  // Filters
  {
    id: "fram-ph7317",
    name: "FRAM Extra Guard Oil Filter PH7317",
    category: PRODUCT_CATEGORIES[1],
    subcategory: "Oil Filters",
    brand: "FRAM",
    description: "Extra Guard protection with 2X the dirt holding capacity and removes 95% of dirt particles.",
    specifications: {
      "Thread Size": "3/4-16",
      "Height": "3.69 inches",
      "Diameter": "3.66 inches",
      "Gasket": "Nitrile rubber",
      "Compatibility": "Most domestic vehicles"
    },
    image: "/catalogue/61V0QUbAaIL._UF1000,1000_QL80_.jpg",
    tags: ["oil-filter", "fram"],
    dateAdded: "2024-01-18",
    featured: true
  },
  {
    id: "k-n-hp1017",
    name: "K&N Performance Gold Oil Filter HP-1017",
    category: PRODUCT_CATEGORIES[1],
    subcategory: "Oil Filters",
    brand: "K&N",
    description: "High-flow, premium oil filter designed for high performance applications.",
    specifications: {
      "Thread Size": "3/4-16",
      "Height": "4.69 inches",
      "Diameter": "3.66 inches",
      "Material": "Synthetic blend media",
      "Flow Rate": "High performance"
    },
    image: "/catalogue/33-2381_2.jpg",
    tags: ["oil-filter", "performance"],
    dateAdded: "2024-01-22",
    featured: false
  },
  {
    id: "bosch-3323",
    name: "Bosch Premium FILTECH Oil Filter 3323",
    category: PRODUCT_CATEGORIES[1],
    subcategory: "Oil Filters",
    brand: "Bosch",
    description: "Premium quality oil filter with advanced filtration technology and superior construction.",
    specifications: {
      "Thread Size": "M20 x 1.5",
      "Height": "86mm",
      "Diameter": "76mm",
      "Material": "Synthetic media",
      "Application": "European vehicles"
    },
    image: "/catalogue/61oR5yhx3cL._UF894,1000_QL80_.jpg",
    tags: ["oil-filter", "premium"],
    dateAdded: "2024-02-05",
    featured: false
  },
  {
    id: "wix-51515",
    name: "WIX Spin-On Oil Filter 51515",
    category: PRODUCT_CATEGORIES[1],
    subcategory: "Oil Filters",
    brand: "WIX",
    description: "Professional grade spin-on oil filter with heavy-duty construction.",
    specifications: {
      "Thread Size": "3/4-16",
      "Height": "4.31 inches",
      "Diameter": "3.66 inches",
      "Bypass Valve": "9-11 PSI",
      "Anti-Drainback": "Yes"
    },
    image: "/catalogue/71te4m08OHL._UF894,1000_QL80_.jpg",
    tags: ["oil-filter", "professional"],
    dateAdded: "2024-02-08",
    featured: false
  }
];

// Helper functions for filtering and searching
export const getProductsByCategory = (categoryId: string): Product[] => {
  return SAMPLE_PRODUCTS.filter(product => product.category.id === categoryId);
};

export const getProductsByBrand = (brand: string): Product[] => {
  return SAMPLE_PRODUCTS.filter(product => 
    product.brand.toLowerCase().includes(brand.toLowerCase())
  );
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return SAMPLE_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.brand.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    product.category.name.toLowerCase().includes(lowercaseQuery)
  );
};

export const getFeaturedProducts = (): Product[] => {
  return SAMPLE_PRODUCTS.filter(product => product.featured);
};

export const getAllBrands = (): string[] => {
  const brands = new Set(SAMPLE_PRODUCTS.map(product => product.brand));
  return Array.from(brands).sort();
};

export const getAllTags = (): string[] => {
  const tags = new Set(SAMPLE_PRODUCTS.flatMap(product => product.tags));
  return Array.from(tags).sort();
};

export const sortProducts = (products: Product[], sortBy: 'name' | 'brand' | 'newest' | 'oldest'): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'brand':
      return sorted.sort((a, b) => a.brand.localeCompare(b.brand));
    case 'newest':
      return sorted.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
    case 'oldest':
      return sorted.sort((a, b) => new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime());
    default:
      return sorted;
  }
};