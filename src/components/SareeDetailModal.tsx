import React, { useState } from 'react';
import { SareeDetail, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import {
  X,
  ShoppingBag,
  Heart,
  Sparkles,
  ShieldCheck,
  Truck,
  Check,
  Star,
  ChevronRight,
  Layers,
  Scale,
  Clock,
  Sparkle,
} from 'lucide-react';

interface SareeDetailModalProps {
  saree: SareeDetail | null;
  currency: CurrencyCode;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
    category?: string;
    quantity?: number;
  }) => void;
  onInstantBuy: (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
    category?: string;
    quantity?: number;
  }) => void;
  onToggleWishlist?: (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
  }) => void;
  isWishlisted?: boolean;
}

export const SareeDetailModal: React.FC<SareeDetailModalProps> = ({
  saree,
  currency,
  isOpen,
  onClose,
  onAddToCart,
  onInstantBuy,
  onToggleWishlist,
  isWishlisted = false,
}) => {
  const [activeAngle, setActiveAngle] = useState<'front' | 'pallu' | 'border' | 'model'>('front');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  if (!isOpen || !saree) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.INR;

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const getCurrentImage = () => {
    switch (activeAngle) {
      case 'pallu':
        return saree.palluImage || saree.image;
      case 'border':
        return saree.borderImage || saree.image;
      case 'model':
        return saree.modelImage || saree.image;
      case 'front':
      default:
        return saree.image;
    }
  };

  const handleAdd = () => {
    onAddToCart({
      id: saree.id,
      title: saree.name,
      subtitle: `${saree.weaveCategory} · ${saree.colorName}`,
      price: saree.price,
      image: saree.image,
      category: saree.weaveCategory,
      quantity,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
  };

  const handleBuyNow = () => {
    onInstantBuy({
      id: saree.id,
      title: saree.name,
      subtitle: `${saree.weaveCategory} · ${saree.colorName}`,
      price: saree.price,
      image: saree.image,
      category: saree.weaveCategory,
      quantity,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#FDE68A] relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer shadow-md"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          
          {/* Left Column: Interactive Visuals & Angle Selectors (5 cols) */}
          <div className="md:col-span-5 bg-stone-950 p-4 sm:p-6 flex flex-col justify-between text-white relative">
            
            {/* Top Tag & Certification Seal */}
            <div className="flex items-center justify-between mb-3 z-10">
              <span className="text-[11px] font-mono uppercase tracking-wider bg-[#E11D48] text-white px-2.5 py-1 rounded-full font-bold shadow-xs">
                {saree.tag || saree.weaveCategory}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#FDE047] font-semibold bg-white/10 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Silk Mark Certified</span>
              </div>
            </div>

            {/* Main Image Stage */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-stone-900 border border-white/10 group shadow-lg">
              <SilkImage
                src={getCurrentImage()}
                alt={saree.name}
                label={saree.name}
                fallbackColor={saree.colorHex}
                patternType="temple"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Bottom Angle Name Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none text-xs">
                <span className="text-[#FFF3B0] font-cinzel font-semibold capitalize drop-shadow">
                  {activeAngle === 'front' ? 'Front Pleat Drape' : activeAngle === 'pallu' ? 'Grand Zari Pallu' : activeAngle === 'border' ? 'Temple Zari Border' : 'Model Styling'}
                </span>
                <span className="text-[10px] text-stone-300 font-mono">
                  {saree.weightGrams}g · {saree.loomDays} Days
                </span>
              </div>
            </div>

            {/* Angle Selector Thumbnails */}
            <div className="mt-4 grid grid-cols-4 gap-2">
              {[
                { key: 'front', label: 'Front', img: saree.image },
                { key: 'pallu', label: 'Pallu', img: saree.palluImage || saree.image },
                { key: 'border', label: 'Border', img: saree.borderImage || saree.image },
                { key: 'model', label: 'Model', img: saree.modelImage || saree.image },
              ].map((ang) => (
                <button
                  key={ang.key}
                  onClick={() => setActiveAngle(ang.key as any)}
                  className={`p-1 rounded-xl border text-left transition-all cursor-pointer flex flex-col items-center gap-1 ${
                    activeAngle === ang.key
                      ? 'border-[#F59E0B] bg-white/20 ring-2 ring-[#F59E0B]/50'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="w-full aspect-square rounded-lg overflow-hidden bg-stone-800">
                    <SilkImage
                      src={ang.img}
                      alt={ang.label}
                      label={ang.label}
                      fallbackColor={saree.colorHex}
                      className="w-full h-full"
                    />
                  </div>
                  <span className="text-[10px] font-mono tracking-wider uppercase opacity-90">
                    {ang.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Quick Authenticity Assurance */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-stone-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Hereditary Master Pit-Loom
              </span>
              <span className="font-mono text-[#FDE047]">Consecrated Vault</span>
            </div>

          </div>

          {/* Right Column: Full Specifications, Pricing, & Actions (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#FFFDF9]">
            <div>
              {/* Header: Weave & Origin */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase font-mono tracking-widest text-[#E11D48] font-bold">
                  {saree.weaveCategory} · {saree.origin}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-bold text-stone-800">{saree.rating}</span>
                  <span className="text-stone-400">({saree.reviewCount})</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900 leading-tight">
                {saree.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-light mt-1">
                {saree.subtitle}
              </p>

              {/* Price Banner */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl sm:text-3xl font-cinzel font-bold text-[#E11D48] font-mono">
                      {formatPrice(saree.price)}
                    </span>
                    {saree.originalPrice && (
                      <span className="text-sm font-mono text-stone-400 line-through">
                        {formatPrice(saree.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-500">
                    Inclusive of all taxes · Free insured doorstep dispatch
                  </span>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    In Stock
                  </span>
                  <div className="text-[10px] text-stone-500 mt-0.5 font-mono">
                    Ready to Drape
                  </div>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="text-[10px] uppercase font-mono text-stone-400">Zari Purity</div>
                  <div className="font-semibold text-stone-800 mt-0.5 truncate">{saree.zariType}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="text-[10px] uppercase font-mono text-stone-400">Pure Zari Grams</div>
                  <div className="font-semibold text-stone-800 mt-0.5">{saree.zariGrams}g Gold/Silver</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="text-[10px] uppercase font-mono text-stone-400">Handloom Days</div>
                  <div className="font-semibold text-stone-800 mt-0.5">{saree.loomDays} Artisan Days</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="text-[10px] uppercase font-mono text-stone-400">Net Weight</div>
                  <div className="font-semibold text-stone-800 mt-0.5">{saree.weightGrams} Grams</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="text-[10px] uppercase font-mono text-stone-400">Thread Count</div>
                  <div className="font-semibold text-stone-800 mt-0.5">{saree.threadCount}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                  <div className="text-[10px] uppercase font-mono text-stone-400">Total Length</div>
                  <div className="font-semibold text-stone-800 mt-0.5">{saree.lengthMeters}</div>
                </div>
              </div>

              {/* Lore / Description */}
              <div className="mt-4">
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  {saree.description}
                </p>
              </div>

              {/* Auspicious Motifs */}
              <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] uppercase font-mono text-stone-400 font-semibold mr-1">
                  Sacred Motifs:
                </span>
                {saree.motifs.map((motif, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-md border border-stone-200"
                  >
                    {motif}
                  </span>
                ))}
              </div>

              {/* Blouse Piece Details */}
              <div className="mt-3 p-2.5 rounded-xl bg-white border border-stone-200 text-xs flex items-center gap-2 text-stone-700">
                <Layers className="w-4 h-4 text-[#E11D48] shrink-0" />
                <span className="font-light">
                  <strong className="font-semibold text-stone-900">Blouse Included:</strong> {saree.blouseDetails}
                </span>
              </div>
            </div>

            {/* Bottom Actions: Quantity, Add to Bag, Instant Buy */}
            <div className="mt-6 pt-5 border-t border-stone-200">
              
              <div className="flex items-center gap-3 mb-4">
                {/* Quantity */}
                <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 hover:bg-stone-100 text-stone-700 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 font-mono font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2.5 hover:bg-stone-100 text-stone-700 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3.5 px-5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    addedToast
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-900 hover:bg-[#E11D48] text-white hover:shadow-lg'
                  }`}
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Silk Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Button */}
                {onToggleWishlist && (
                  <button
                    onClick={() =>
                      onToggleWishlist({
                        id: saree.id,
                        title: saree.name,
                        subtitle: saree.subtitle,
                        price: saree.price,
                        image: saree.image,
                      })
                    }
                    className={`p-3 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'bg-red-50 border-red-300 text-red-600'
                        : 'bg-white border-stone-300 text-stone-600 hover:text-red-600'
                    }`}
                    title={isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                )}
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-[1.01]"
              >
                <span>Instant Checkout · {formatPrice(saree.price * quantity)}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Trust Badges Footer */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Pure Silk Certified
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-600" />
                  Free Insured Express Delivery
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
