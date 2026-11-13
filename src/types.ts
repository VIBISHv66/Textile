export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // vs INR
}

export interface Hotspot {
  id: string;
  label: string;
  category: 'Blouse' | 'Saree' | 'Jewellery' | 'Waistbelt' | 'Accessories';
  price: number;
  xPercent: number; // 0-100
  yPercent: number; // 0-100
  image: string;
  description: string;
  colors?: string[];
}

export interface Look {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  occasion: string;
  modelImage: string;
  totalPrice: number;
  hotspots: Hotspot[];
}

export interface SilkCard {
  id: string;
  name: string;
  weave: string;
  origin: string;
  price: number;
  colorName: string;
  colorHex: string;
  accentHex: string;
  image: string;
  threadCount: string;
  zariGrade: string;
  loomDays: number;
  description: string;
}

export interface RailItem {
  id: string;
  name: string;
  category: 'Silk Sarees' | 'Half Sarees' | 'Silk Blouse Pieces' | 'Dupattas';
  price: number;
  image: string;
  hangerType: 'wood' | 'brass';
  colorHex: string;
  zariType: string;
  weightGrams: number;
  weavePattern: string;
  rating: number;
  tag?: string;
}

export interface StoryReel {
  id: string;
  title: string;
  sareeName: string;
  price: number;
  thumbnail: string;
  videoSrc?: string;
  views: string;
  likes: number;
  tag: string;
  drapeDescription: string;
}

export interface SilkStrand {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  accentHex: string;
  type: 'Warp' | 'Weft' | 'Zari';
  origin: string;
  basePrice: number;
  composition: string;
}

export interface SareeDetail {
  id: string;
  name: string;
  title?: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  image: string;
  palluImage?: string;
  borderImage?: string;
  modelImage?: string;
  colorName: string;
  color?: string;
  colorHex: string;
  weaveCategory: 'Kanchipuram Silk' | 'Banarasi Brocade' | 'Paithani Silk' | 'Mysore Crepe' | 'Chanderi Silk' | 'Bridal Muhurtham' | 'Soft Silk';
  category?: string;
  origin: string;
  zariType: string;
  zariGrams: number;
  weightGrams: number;
  loomDays: number;
  threadCount: string;
  silkType: string;
  blouseDetails: string;
  lengthMeters: string;
  description: string;
  motifs: string[];
  occasion: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  tag?: string;
}

export interface CartItem {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  customDetails?: string;
}
