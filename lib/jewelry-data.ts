export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets';
  price: number; // in USD
  originalPrice?: number;
  badge?: 'Bestseller' | 'New Arrival' | 'Limited Edition' | 'Atelier Exclusive' | 'Iconic';
  rating: number;
  reviewCount: number;
  gemstone: 'Diamond' | 'Emerald' | 'Sapphire' | 'Pearl';
  caratWeight: string;
  metal: string;
  metalsAvailable: Array<{ name: string; hex: string }>;
  image: string;
  description: string;
  story: string;
  specifications: {
    stone: string;
    cut: string;
    clarity: string;
    colorGrade: string;
    settingType: string;
    hallmark: string;
    certificate: string;
  };
  sizes?: number[]; // for rings (US sizes)
  lengths?: string[]; // for necklaces/bracelets
  inStock: boolean;
  featured: boolean;
}

export interface CartItem {
  id: string; // unique item id (composite: productId + metal + size)
  product: Product;
  quantity: number;
  selectedMetal: string;
  selectedSize?: string | number;
  customEngraving?: string;
}

export interface Showroom {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  landmark: string;
  phone: string;
  hours: string;
  services: string[];
}

export interface ShowroomBooking {
  id: string;
  product?: Product;
  selectedMetal?: string;
  selectedSize?: string | number;
  showroomId: string;
  showroomName: string;
  showroomAddress: string;
  date: string;
  timeSlot: string;
  consultationType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
}

export const SHOWROOMS: Showroom[] = [
  {
    id: "nyc-5th-ave",
    name: "Fifth Avenue Flagship Showroom",
    city: "New York",
    country: "United States",
    address: "740 5th Avenue, Manhattan, NY 10019",
    landmark: "Corner of 57th & 5th Ave",
    phone: "+1 (212) 555-0198",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM • Sun: 12:00 PM – 6:00 PM",
    services: [
      "VIP Private Try-on Suite",
      "GIA Certified Gemologist on site",
      "Complimentary Custom Sizing",
    ],
  },
  {
    id: "lon-mayfair",
    name: "Mayfair Atelier & Salon",
    city: "London",
    country: "United Kingdom",
    address: "14 Old Bond Street, Mayfair, London W1S 4PP",
    landmark: "Old Bond Street Luxury Arcade",
    phone: "+44 20 7946 0912",
    hours: "Mon – Sat: 10:00 AM – 6:30 PM",
    services: [
      "Private Champagne Suite",
      "Bespoke Bridal Consultations",
      "Heirloom Diamond Remounting",
    ],
  },
  {
    id: "paris-vendome",
    name: "Place Vendôme Salon",
    city: "Paris",
    country: "France",
    address: "12 Place Vendôme, 75001 Paris",
    landmark: "Historic Place Vendôme",
    phone: "+33 1 42 68 55 00",
    hours: "Mon – Sat: 10:30 AM – 7:30 PM",
    services: [
      "Haute Joaillerie Private Try-on",
      "Master Artisan Consultations",
      "Rare Gemstones Vault",
    ],
  },
  {
    id: "mum-colaba",
    name: "The Taj Heritage Boutique",
    city: "Mumbai",
    country: "India",
    address: "The Taj Mahal Palace, Apollo Bunder, Colaba, Mumbai 400001",
    landmark: "Gateway of India Heritage Wing",
    phone: "+91 22 6665 3366",
    hours: "Mon – Sun: 10:00 AM – 8:30 PM",
    services: [
      "Private Solitaire Suite",
      "Bridal Trousseau Styling",
      "Immediate BIS Hallmark Verification",
    ],
  },
  {
    id: "la-beverly-hills",
    name: "Beverly Hills Flagship",
    city: "Los Angeles",
    country: "United States",
    address: "9500 Wilshire Blvd, Beverly Hills, CA 90212",
    landmark: "Rodeo Drive Corridor",
    phone: "+1 (310) 555-0144",
    hours: "Mon – Sat: 10:00 AM – 7:00 PM • Sun: 11:00 AM – 5:00 PM",
    services: [
      "Celebrity Concierge Suites",
      "Private Valet Parking",
      "Custom Sizing in 1 Hour",
    ],
  },
  {
    id: "dxb-fashion-ave",
    name: "Fashion Avenue Luxury Suite",
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Level 1, Fashion Avenue, The Dubai Mall, Downtown Dubai",
    landmark: "Downtown Fountain Terrace",
    phone: "+971 4 362 7500",
    hours: "Mon – Sun: 10:00 AM – 11:00 PM",
    services: [
      "Royal Suite Private Viewing",
      "Complimentary Laser Engraving",
      "Dedicated Multilingual Concierge",
    ],
  },
];

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';

export const CURRENCIES: Record<Currency, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  INR: { symbol: '₹', rate: 86.5, label: 'INR (₹)' },
};

export const JEWELRY_PRODUCTS: Product[] = [
  {
    id: 'solstice-diamond-solitaire',
    name: 'The Solstice Round Diamond Solitaire',
    tagline: '1.85 Carat Flawless Brilliant Cut in 18K Micro-Pavé',
    category: 'rings',
    price: 3450,
    originalPrice: 3890,
    badge: 'Bestseller',
    rating: 4.95,
    reviewCount: 64,
    gemstone: 'Diamond',
    caratWeight: '1.85 ct',
    metal: '18K Yellow Gold',
    metalsAvailable: [
      { name: '18K Yellow Gold', hex: '#d4af37' },
      { name: '18K White Gold', hex: '#e2e8f0' },
      { name: '18K Rose Gold', hex: '#e8a598' },
      { name: 'Platinum 950', hex: '#cbd5e1' },
    ],
    image: '/images/ring-diamond.jpg',
    description: 'An iconic centerpiece crafted with exceptional scintillation. Features a hand-selected 1.85ct round brilliant diamond perched above a micro-pavé hidden halo band that catches light from every angle.',
    story: 'Conceived in our Paris workshop, the Solstice ring represents everlasting commitment. Every claw is hand-burnished under 20x magnification to maximize light refraction.',
    specifications: {
      stone: 'Natural Conflict-Free Diamond',
      cut: 'Ideal / Triple Excellent',
      clarity: 'VVS1',
      colorGrade: 'D (Colorless)',
      settingType: 'Six-Prong Platinum Crown with Micro-Pavé Shank',
      hallmark: 'Au750 / Pt950 Certified',
      certificate: 'GIA Diamond Dossier (#218491820)',
    },
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9],
    inStock: true,
    featured: true,
  },
  {
    id: 'empress-emerald-halo-pendant',
    name: 'The Empress Colombian Emerald Pendant',
    tagline: '3.40 Carat Muzo Emerald with Brilliant Diamond Halo',
    category: 'necklaces',
    price: 4850,
    originalPrice: 5400,
    badge: 'Atelier Exclusive',
    rating: 4.98,
    reviewCount: 42,
    gemstone: 'Emerald',
    caratWeight: '3.40 ct Emerald + 0.65 ct Diamonds',
    metal: '18K Yellow Gold',
    metalsAvailable: [
      { name: '18K Yellow Gold', hex: '#d4af37' },
      { name: '18K White Gold', hex: '#e2e8f0' },
      { name: 'Platinum 950', hex: '#cbd5e1' },
    ],
    image: '/images/necklace-emerald.jpg',
    description: 'A mesmerizing Colombian Muzo emerald displaying signature verdant velvet green tones. Framed by 28 meticulously matched round brilliant-cut diamonds on an adjustable hand-woven gold cable chain.',
    story: 'Mined ethically from legendary Colombian deposits, this emerald exhibits the classic "jardin" that confirms natural organic origin, treated exclusively with traditional natural cedarwood oil.',
    specifications: {
      stone: 'Natural Colombian Muzo Emerald',
      cut: 'Octagonal Emerald Cut',
      clarity: 'Vivid Green / Minor Jardin',
      colorGrade: 'Royal Muzo Green',
      settingType: 'Corner Claw Setting with Diamond Pavé Halo',
      hallmark: '18K Solid Gold (750) Stamped',
      certificate: 'SSEF Swiss Gemmological Report',
    },
    lengths: ['16 inch (Choker/Collar)', '18 inch (Classic Princess)', '20 inch (Matinee)'],
    inStock: true,
    featured: true,
  },
  {
    id: 'celestial-pear-diamond-earrings',
    name: 'Celestial Pear Diamond Drop Earrings',
    tagline: '2.60 Total Carats Cascading Diamond Drops in Two-Tone Gold',
    category: 'earrings',
    price: 2950,
    badge: 'New Arrival',
    rating: 4.92,
    reviewCount: 31,
    gemstone: 'Diamond',
    caratWeight: '2.60 ctw',
    metal: '18K White & Yellow Gold',
    metalsAvailable: [
      { name: '18K White & Yellow Gold', hex: '#d4af37' },
      { name: '18K White Gold', hex: '#e2e8f0' },
      { name: '18K Rose Gold', hex: '#e8a598' },
    ],
    image: '/images/earrings-diamond.jpg',
    description: 'Graceful articulated movement allows these pear-cut drops to dance with radiant shimmer. Featuring architectural scroll motifs encrusted with micro-pavé diamonds resting on secure French lever backs.',
    story: 'Inspired by the celestial constellations over Lake Como, our artisans designed dynamic joint pivots to capture candlelight seamlessly during evening galas.',
    specifications: {
      stone: 'Dual Matched Pear Brilliant Diamonds',
      cut: 'Modified Pear Brilliant',
      clarity: 'VS1',
      colorGrade: 'E-F (Near Colorless)',
      settingType: 'Fine Pavé Milgrain Bezel with Articulated Joint',
      hallmark: '18K Two-Tone Gold Stamped',
      certificate: 'IGI Certified Pair Dossier',
    },
    lengths: ['Standard Drop (32mm)'],
    inStock: true,
    featured: true,
  },
  {
    id: 'eternity-royale-tennis-bracelet',
    name: 'Royale Lineage Diamond Tennis Bracelet',
    tagline: '7.50 Total Carat Flawless Lineage Set in Solid Platinum',
    category: 'bracelets',
    price: 6200,
    originalPrice: 6900,
    badge: 'Iconic',
    rating: 5.0,
    reviewCount: 58,
    gemstone: 'Diamond',
    caratWeight: '7.50 ctw (46 Diamonds)',
    metal: 'Platinum 950',
    metalsAvailable: [
      { name: 'Platinum 950', hex: '#cbd5e1' },
      { name: '18K Yellow Gold', hex: '#d4af37' },
      { name: '18K White Gold', hex: '#e2e8f0' },
      { name: '18K Rose Gold', hex: '#e8a598' },
    ],
    image: '/images/bracelet-tennis.jpg',
    description: 'An unbroken ribbon of scintillation. Every diamond is individually calibrated for diameter, cut angle, and table reflection, secured by our signature four-prong flush baskets with double safety lock.',
    story: 'The timeless classic perfected. Designed with a flexible internal hinge structure that gently contours around the wrist without twisting or catching on fine silk sleeves.',
    specifications: {
      stone: 'Calibrated Round Brilliant Diamonds',
      cut: 'Hearts & Arrows Ideal Cut',
      clarity: 'VVS2 - VS1',
      colorGrade: 'Colorless F',
      settingType: 'Continuous Four-Prong Platinum Links with Double Safety Clasp',
      hallmark: 'Pt950 Certified Stamped',
      certificate: 'Full Atelier Diamond Grading Certificate',
    },
    lengths: ['6.5 inch (Small)', '7.0 inch (Standard)', '7.5 inch (Medium)'],
    inStock: true,
    featured: true,
  },
  {
    id: 'kashmir-trillion-sapphire-ring',
    name: 'The Crown Ceylon Sapphire & Trillion Ring',
    tagline: '4.10 Carat Royal Blue Sapphire Flanked by Trillion Diamonds',
    category: 'rings',
    price: 5400,
    badge: 'Limited Edition',
    rating: 4.97,
    reviewCount: 39,
    gemstone: 'Sapphire',
    caratWeight: '4.10 ct Sapphire + 0.80 ctw Diamonds',
    metal: 'Platinum 950',
    metalsAvailable: [
      { name: 'Platinum 950', hex: '#cbd5e1' },
      { name: '18K Yellow Gold', hex: '#d4af37' },
      { name: '18K White Gold', hex: '#e2e8f0' },
    ],
    image: '/images/ring-sapphire.jpg',
    description: 'An exceptional unheated Ceylon royal blue sapphire cut in an opulent cushion silhouette. Flanked on either shoulder by matched step-cut trillion diamonds that channel dramatic brilliance.',
    story: 'Sri Lankan sapphires have adorned royalty for centuries. This untreated gemstone exhibits the coveted deep cornflower blue glow that requires no thermal enhancement.',
    specifications: {
      stone: 'Natural Untreated Royal Blue Sapphire',
      cut: 'Cushion Mixed Cut',
      clarity: 'Eye-Clean Royal Blue Transparency',
      colorGrade: 'Royal Blue (Vivid)',
      settingType: 'Twin V-Claw Prongs on Platinum Knife-Edge Band',
      hallmark: 'Pt950 & Fine Fineness Stamped',
      certificate: 'Gubelin Gem Lab Report',
    },
    sizes: [5, 6, 6.5, 7, 7.5, 8, 8.5],
    inStock: true,
    featured: false,
  },
  {
    id: 'south-sea-golden-pearl-pendant',
    name: 'Aura Golden South Sea Pearl Pendant',
    tagline: '13.5mm Rare Golden South Sea Pearl with Diamond Pavé Bail',
    category: 'necklaces',
    price: 2600,
    originalPrice: 2950,
    badge: 'New Arrival',
    rating: 4.89,
    reviewCount: 27,
    gemstone: 'Pearl',
    caratWeight: '13.5mm Pearl + 0.35 ct Diamonds',
    metal: '18K Rose Gold',
    metalsAvailable: [
      { name: '18K Rose Gold', hex: '#e8a598' },
      { name: '18K Yellow Gold', hex: '#d4af37' },
      { name: '18K White Gold', hex: '#e2e8f0' },
    ],
    image: '/images/necklace-pearl.jpg',
    description: 'A luminous 13.5mm organic Australian South Sea pearl boasting warm champagne-golden luster and mirror-like nacre depth. Crowned with an 18K rose gold pavé diamond bail and diamond cut chain.',
    story: 'Cultivated carefully over three years in the pristine waters off Broome, Western Australia, this pearl requires no artificial dye, reflecting pure nature in all its splendor.',
    specifications: {
      stone: 'Cultured Golden South Sea Pearl',
      cut: 'Perfect Spherical Round (13.5mm)',
      clarity: 'AAA Grade Mirror-Luster Flawless Nacre',
      colorGrade: 'Deep Champagne Gold',
      settingType: 'Hand-Pinned Diamond Encrusted Bail',
      hallmark: '18K AU750 Stamped',
      certificate: 'Australian Pearl Authenticity Certificate',
    },
    lengths: ['16 inch (Choker)', '18 inch (Standard)', '22 inch (Lariat)'],
    inStock: true,
    featured: false,
  },
];

export const CLIENT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Lady Victoria C.',
    location: 'London, Mayfair',
    rating: 5,
    title: 'An Heirloom of Exquisite Craftsmanship',
    comment: 'The Solstice ring arrived in an exquisite dark velvet lacquered case. The diamond fire is beyond what photos can convey. The certification and GIA laser inscription matched flawlessly. Truly world-class service.',
    piece: 'The Solstice Round Diamond Solitaire',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Genevieve M.',
    location: 'Geneva, Switzerland',
    rating: 5,
    title: 'The Colombian Emerald is Pure Magic',
    comment: 'Having collected high jewelry for over twenty years, this emerald pendant is among my favorite acquisitions. The velvet green depth and delicate diamond halo are timeless. Delivery was secure and swift.',
    piece: 'The Empress Colombian Emerald Pendant',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Marcus & Claire K.',
    location: 'New York, Manhattan',
    rating: 5,
    title: 'Flawless Tennis Bracelet & Concierge Care',
    comment: 'Ordered the Royale tennis bracelet for our 10th anniversary. The double-safety clasp provides absolute peace of mind and the sparkle across the entire row is breathtaking. Thank you Aurelia Atelier!',
    piece: 'Royale Lineage Diamond Tennis Bracelet',
    verified: true,
  },
];

export const BOUTIQUES = [
  { city: 'New York', address: '742 Fifth Avenue, 4th Floor', hours: 'Mon - Sat: 10am - 7pm' },
  { city: 'Paris', address: '12 Place Vendôme, 75001 Paris', hours: 'Tue - Sun: 11am - 7pm' },
  { city: 'London', address: '28 Old Bond Street, Mayfair', hours: 'Mon - Sat: 10am - 6:30pm' },
  { city: 'Tokyo', address: '6-10-1 Ginza, Chuo City, Tokyo', hours: 'Daily: 11am - 8pm' },
];
