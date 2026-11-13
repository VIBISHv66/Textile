import React, { useState, useEffect, useRef } from 'react';
import { RAIL_ITEMS, findSareeDetails } from '../data/sareesData';
import { CurrencyCode, RailItem, SareeDetail } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import {
  ShoppingBag,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Volume2,
  VolumeX,
  Star,
  Eye,
} from 'lucide-react';

interface RailSectionProps {
  currency: CurrencyCode;
  onAddToCart: (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
    category?: string;
  }) => void;
  onInspectSaree: (saree: SareeDetail) => void;
  isAudioPlaying?: boolean;
  onToggleAudio?: () => void;
}

export const RailSection: React.FC<RailSectionProps> = ({
  currency,
  onAddToCart,
  onInspectSaree,
  isAudioPlaying = false,
  onToggleAudio,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeAngle, setActiveAngle] = useState<'front' | 'pallu' | 'border'>('front');
  const [addedId, setAddedId] = useState<string | null>(null);

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const activeItem: RailItem = RAIL_ITEMS[currentIndex] || RAIL_ITEMS[0];

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? RAIL_ITEMS.length - 1 : prev - 1));
    setActiveAngle('front');
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === RAIL_ITEMS.length - 1 ? 0 : prev + 1));
    setActiveAngle('front');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickAdd = (item: RailItem) => {
    onAddToCart({
      id: item.id,
      title: item.name,
      subtitle: `${item.category} · ${item.zariType}`,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const handleOpenDetails = (item: RailItem) => {
    const details = findSareeDetails(item.id) || findSareeDetails(item.name);
    // Enrich with current item's specific data if found
    onInspectSaree({
      ...details,
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      zariType: item.zariType,
      weightGrams: item.weightGrams,
      colorHex: item.colorHex,
    });
  };

  // Window of visible items on the rail (centered around currentIndex)
  const getVisibleRailIndices = () => {
    const total = RAIL_ITEMS.length;
    // Show 7 items: -3, -2, -1, 0, +1, +2, +3
    const offsets = [-3, -2, -1, 0, 1, 2, 3];
    return offsets.map((offset) => {
      const idx = (currentIndex + offset + total) % total;
      return { idx, offset, item: RAIL_ITEMS[idx] };
    });
  };

  return (
    <section id="the-rail" className="py-16 lg:py-24 bg-[#FAF7F2] border-b border-[#FDE68A] overflow-hidden relative select-none">
      
      {/* Top Bar matching video (image_5872927a.png) */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex items-center justify-between">
        {/* Pill Badge Top-Left: RAVI TEXTILES · RADIANT DRAPE STUDIO */}
        <div className="inline-flex items-center gap-2 bg-stone-900/90 text-[#FFF3B0] text-xs font-mono font-bold tracking-wider uppercase px-4 py-2 rounded-full border border-white/20 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
          <span>RAVI TEXTILES · RADIANT DRAPE STUDIO</span>
        </div>

        {/* Top-Right Sound Toggle Button */}
        {onToggleAudio && (
          <button
            onClick={onToggleAudio}
            className="p-2.5 rounded-full bg-stone-900/90 text-white hover:bg-stone-900 transition-colors shadow-md border border-white/20 cursor-pointer"
            title={isAudioPlaying ? 'Mute Atmosphere Audio' : 'Play Sacred Temple Acoustics'}
            aria-label="Toggle Sound"
          >
            {isAudioPlaying ? <Volume2 className="w-4 h-4 text-[#FDE047]" /> : <VolumeX className="w-4 h-4 text-stone-400" />}
          </button>
        )}
      </div>

      {/* Section Subtitle & Prompt */}
      <div className="text-center max-w-xl mx-auto mb-10 px-4">
        <h2 className="text-2xl sm:text-4xl font-cinzel font-bold text-stone-900 tracking-tight">
          Every silk, on the rail.
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm font-light mt-1">
          "Glide along our boutique clothes rack. Tap any hanging saree to inspect its full weave details and drape."
        </p>
      </div>

      {/* Main Clothes Rail Stage matching Video Screenshot (image_5872927a.png) */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-8">
        
        {/* Continuous Horizontal Brass & Walnut Clothes Rail Bar */}
        <div className="relative mx-auto w-full max-w-5xl h-3 rounded-full bg-gradient-to-r from-[#78350F] via-[#F59E0B] to-[#78350F] shadow-md border-b border-[#5c3a1b]/40 z-10">
          {/* Wall Fixture Brackets */}
          <div className="absolute -left-3 -top-2 w-5 h-7 rounded-sm bg-gradient-to-b from-[#F59E0B] to-[#B45309] shadow-md" />
          <div className="absolute -right-3 -top-2 w-5 h-7 rounded-sm bg-gradient-to-b from-[#F59E0B] to-[#B45309] shadow-md" />
        </div>

        {/* Circular Left Arrow Button matching video */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-12 z-40 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center shadow-xl border border-stone-300 hover:border-[#E11D48] transition-all hover:scale-110 cursor-pointer"
          aria-label="Previous Saree on Rail"
        >
          <ChevronLeft className="w-6 h-6 text-stone-800" />
        </button>

        {/* Circular Right Arrow Button matching video */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-12 z-40 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center shadow-xl border border-stone-300 hover:border-[#E11D48] transition-all hover:scale-110 cursor-pointer"
          aria-label="Next Saree on Rail"
        >
          <ChevronRight className="w-6 h-6 text-stone-800" />
        </button>

        {/* 3D Rail Carousel Viewport */}
        <div className="relative h-[380px] sm:h-[430px] flex items-center justify-center overflow-hidden">
          {getVisibleRailIndices().map(({ idx, offset, item }) => {
            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            // Calculate horizontal offset and 3D depth
            // Center is at 0, offset -1 is left, +1 is right, etc.
            const xPercent = offset * (window.innerWidth < 640 ? 45 : 28);
            const scale = isCenter ? 1.15 : Math.max(0.68, 1 - absOffset * 0.14);
            const opacity = isCenter ? 1 : Math.max(0.35, 1 - absOffset * 0.22);
            const zIndex = isCenter ? 30 : 20 - absOffset;
            const blur = isCenter ? 'blur-0' : absOffset > 1 ? 'blur-[1.5px]' : 'blur-[0.5px]';

            return (
              <div
                key={`${item.id}-${offset}`}
                onClick={() => {
                  if (isCenter) {
                    handleOpenDetails(item);
                  } else {
                    setCurrentIndex(idx);
                  }
                }}
                style={{
                  transform: `translateX(${xPercent}%) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                className={`absolute top-0 transition-all duration-500 ease-out cursor-pointer flex flex-col items-center ${blur}`}
              >
                {/* Brass Hanger Hook resting on the rail */}
                <div
                  className={`w-6 h-8 border-3 border-b-0 rounded-t-full -mb-1 transition-colors ${
                    isCenter ? 'border-[#F59E0B]' : 'border-[#B45309]'
                  }`}
                />

                {/* Wooden Hanger Bar matching video */}
                <div
                  className={`w-36 sm:w-44 h-3.5 rounded-full bg-gradient-to-r from-[#78350F] via-[#92400E] to-[#78350F] shadow-md z-20 flex items-center justify-center border-t border-white/20`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] opacity-75" />
                </div>

                {/* Saree Draped Over Wooden Hanger Bar */}
                <div
                  className={`mt-0.5 w-36 sm:w-44 h-56 sm:h-64 rounded-b-2xl overflow-hidden shadow-2xl transition-all duration-300 relative border ${
                    isCenter
                      ? 'border-[#F59E0B] ring-4 ring-[#E11D48]/30 shadow-2xl animate-gentle-sway'
                      : 'border-black/10'
                  }`}
                >
                  <SilkImage
                    src={item.image}
                    alt={item.name}
                    label={item.name}
                    fallbackColor={item.colorHex}
                    patternType="korvai"
                    className="w-full h-full object-cover"
                  />

                  {/* Silky Folds & Shimmer Shader */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-white/10 to-black/35 pointer-events-none" />
                  
                  {/* Temple Gopuram / Broad Zari Border at Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-7 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#D4AF37] shadow-md flex items-center justify-center">
                    <span className="text-[9px] font-mono tracking-widest text-[#78350F] font-bold uppercase truncate px-1">
                      {item.zariType}
                    </span>
                  </div>

                  {/* Tag on Active or Trending */}
                  {item.tag && isCenter && (
                    <div className="absolute top-2 left-2 z-20">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white bg-[#E11D48] px-2 py-0.5 rounded-full shadow-sm">
                        {item.tag}
                      </span>
                    </div>
                  )}

                  {/* Hover Inspect Cue on Center */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white z-20 backdrop-blur-xs">
                      <Maximize2 className="w-6 h-6 text-[#FDE047]" />
                      <span className="text-xs font-cinzel font-bold tracking-wider">Tap to View Details</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Active Saree Information Panel below hanger (matching image_5872927a.png) */}
        <div className="mt-2 text-center max-w-lg mx-auto bg-white rounded-2xl p-5 shadow-sm border border-[#FDE68A]">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E11D48] font-bold">
            <span>{activeItem.category}</span>
            <span>·</span>
            <span>{activeItem.zariType}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900 mt-1 uppercase leading-snug">
            {activeItem.name}
          </h3>

          <div className="flex items-center justify-center gap-3 mt-1.5">
            <span className="text-2xl font-cinzel font-bold text-[#E11D48] font-mono">
              {formatPrice(activeItem.price)}
            </span>
            <span className="text-xs text-stone-400 font-mono">
              ({activeItem.weightGrams}g Pure Silk)
            </span>
            <div className="flex items-center text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-stone-700 ml-1">{activeItem.rating}</span>
            </div>
          </div>

          {/* Angle / Perspective Tabs matching video */}
          <div className="mt-3 flex items-center justify-center gap-2">
            {[
              { key: 'front', label: 'FRONT DRAPE' },
              { key: 'pallu', label: 'GRAND PALLU' },
              { key: 'border', label: 'TEMPLE BORDER' },
            ].map((ang) => (
              <button
                key={ang.key}
                onClick={() => setActiveAngle(ang.key as any)}
                className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-wider transition-colors cursor-pointer ${
                  activeAngle === ang.key
                    ? 'bg-stone-900 text-white font-bold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {ang.label}
              </button>
            ))}
          </div>

          {/* Dual Action Buttons: View Full Details & Quick Add */}
          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center gap-3">
            <button
              onClick={() => handleOpenDetails(activeItem)}
              className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-[#E11D48] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span>View Saree Details</span>
            </button>

            <button
              onClick={() => handleQuickAdd(activeItem)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md ${
                addedId === activeItem.id
                  ? 'bg-emerald-600 text-white'
                  : 'shimmer-btn-sheen bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] text-white hover:opacity-95'
              }`}
            >
              {addedId === activeItem.id ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Quick Add to Bag</span>
                </>
              )}
            </button>
          </div>

          {/* Navigation Hint */}
          <div className="mt-3 text-[11px] text-stone-400 font-mono flex items-center justify-center gap-2">
            <span>Use arrows (← →) or tap adjacent hangers to slide rail</span>
            <span>·</span>
            <span className="font-bold text-stone-700">{currentIndex + 1} of {RAIL_ITEMS.length}</span>
          </div>

        </div>

      </div>

    </section>
  );
};
