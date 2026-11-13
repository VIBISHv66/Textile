import React, { useState } from 'react';
import { TRY_THE_LOOKS } from '../data/sareesData';
import { CurrencyCode, Hotspot } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import { ShoppingBag, Check, Sparkles, Plus, ArrowRight } from 'lucide-react';

import { SareeDetail } from '../types';
import { findSareeDetails } from '../data/sareesData';

interface TryTheLookSectionProps {
  currency: CurrencyCode;
  onAddToCart: (item: {
    id: string;
    title: string;
    subtitle?: string;
    price: number;
    image: string;
    category?: string;
  }) => void;
  onInspectSaree?: (saree: SareeDetail) => void;
}

export const TryTheLookSection: React.FC<TryTheLookSectionProps> = ({ currency, onAddToCart, onInspectSaree }) => {
  const [selectedLookId, setSelectedLookId] = useState<string>(TRY_THE_LOOKS[0].id);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(TRY_THE_LOOKS[0].hotspots[0].id);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const currentLook = TRY_THE_LOOKS.find((l) => l.id === selectedLookId) || TRY_THE_LOOKS[0];

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const handleAddItem = (hs: Hotspot) => {
    onAddToCart({
      id: `${currentLook.id}-${hs.id}`,
      title: hs.label,
      subtitle: `${currentLook.name} · ${hs.category}`,
      price: hs.price,
      image: hs.image,
      category: hs.category,
    });
    setAddedItems((prev) => ({ ...prev, [hs.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [hs.id]: false }));
    }, 2000);
  };

  const handleAddFullLook = () => {
    currentLook.hotspots.forEach((hs) => {
      onAddToCart({
        id: `${currentLook.id}-${hs.id}`,
        title: hs.label,
        subtitle: `${currentLook.name} · ${hs.category}`,
        price: hs.price,
        image: hs.image,
        category: hs.category,
      });
    });
    setAddedItems((prev) => ({ ...prev, fullLook: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, fullLook: false }));
    }, 2500);
  };

  return (
    <section id="try-the-look" className="py-20 lg:py-28 bg-[#FFFDF9] border-y border-[#FDE68A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E11D48] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Interactive Ensemble Stylist</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight">
              Try the Look.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light mt-1">
              "Curated head-to-toe festive grandeur. Tap any jewel pin on the model to reveal authentic handcrafted pieces."
            </p>
          </div>

          <div className="text-sm text-stone-500 font-mono">
            Showing Look <span className="font-bold text-[#E11D48]">{TRY_THE_LOOKS.findIndex(l => l.id === currentLook.id) + 1}</span> of {TRY_THE_LOOKS.length}
          </div>
        </div>

        {/* Look Thumbnails Carousel Bar */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {TRY_THE_LOOKS.map((look) => {
            const isSelected = look.id === currentLook.id;
            return (
              <button
                key={look.id}
                onClick={() => {
                  setSelectedLookId(look.id);
                  setActiveHotspotId(look.hotspots[0].id);
                }}
                className={`group flex items-center gap-3 p-2.5 rounded-2xl border transition-all shrink-0 cursor-pointer text-left ${
                  isSelected
                    ? 'bg-white border-[#E11D48] shadow-md ring-2 ring-[#E11D48]/30'
                    : 'bg-white/80 border-[#FDE68A] hover:bg-white hover:border-[#F59E0B]'
                }`}
              >
                <div className="w-14 h-16 rounded-xl overflow-hidden bg-stone-100 shrink-0 relative">
                  <SilkImage
                    src={look.modelImage}
                    alt={look.name}
                    label={look.name}
                    fallbackColor="#E11D48"
                    className="w-full h-full"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-[#E11D48]/20 border-2 border-[#E11D48] rounded-xl z-20" />
                  )}
                </div>
                <div className="pr-3">
                  <div className="text-xs font-cinzel font-bold text-stone-900 leading-tight">
                    {look.name}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {look.occasion}
                  </div>
                  <div className="text-xs font-semibold text-[#E11D48] font-mono mt-1">
                    {formatPrice(look.totalPrice)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage: 2-Column Split (Center Model + Hotspot Detail Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Model Canvas with Hotspot Pins (7 Columns on LG) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-[#E8DEC8] relative">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden bg-stone-100">
              <SilkImage
                src={currentLook.modelImage}
                alt={currentLook.title}
                label={currentLook.title}
                fallbackColor="#E11D48"
                patternType="temple"
                className="w-full h-full"
              />
              
              {/* Subtle gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Top Banner on Model */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-[#FFF3B0] text-xs font-cinzel font-semibold px-3 py-1.5 rounded-full border border-white/20">
                  {currentLook.name}
                </span>
                <span className="bg-white/95 text-[#E11D48] text-xs font-mono font-bold px-3 py-1 rounded-full shadow-sm border border-[#FDE68A]">
                  Complete Look: {formatPrice(currentLook.totalPrice)}
                </span>
              </div>

              {/* Interactive Hotspot Pins */}
              {currentLook.hotspots.map((hs) => {
                const isActive = activeHotspotId === hs.id;
                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    {/* Pulsing Pin Button */}
                    <button
                      onClick={() => setActiveHotspotId(hs.id)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                        isActive
                          ? 'scale-125 bg-[#E11D48] text-[#FFF3B0] ring-4 ring-[#F59E0B]/50 shadow-lg'
                          : 'bg-white/95 text-stone-900 hover:scale-110 shadow-md ring-2 ring-white'
                      }`}
                      aria-label={`View ${hs.label}`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-current" />
                      
                      {/* Pulse beacon ring */}
                      <span className="absolute inset-0 rounded-full border border-white animate-ping opacity-75" />
                    </button>

                    {/* Tooltip on Active/Hover */}
                    {isActive && (
                      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-48 sm:w-56 bg-stone-950/95 text-white p-3 rounded-xl shadow-2xl border border-[#F59E0B]/50 backdrop-blur-md z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-[10px] uppercase font-mono tracking-wider text-[#FDE047]">
                          {hs.category}
                        </div>
                        <div className="text-xs font-semibold mt-0.5 leading-snug">
                          {hs.label}
                        </div>
                        <div className="text-xs font-mono text-[#FDE68A] font-bold mt-1">
                          {formatPrice(hs.price)}
                        </div>
                        {/* Down pointing arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-950" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Bottom Model Tagline */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <p className="font-cormorant italic text-lg sm:text-xl text-stone-100 drop-shadow">
                  "{currentLook.subtitle}"
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Piece Breakdown Cards & Quick Buy (5 Columns on LG) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="bg-white rounded-3xl p-6 border border-[#FDE68A] shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-cinzel font-bold text-stone-900">
                  Pieces in this Look
                </h3>
                <span className="text-xs text-stone-500 font-mono">
                  {currentLook.hotspots.length} handcrafted items
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {currentLook.hotspots.map((hs) => {
                  const isActive = activeHotspotId === hs.id;
                  const isAdded = addedItems[hs.id];

                  return (
                    <div
                      key={hs.id}
                      onMouseEnter={() => setActiveHotspotId(hs.id)}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-[#FFFBEB] border-[#E11D48] shadow-sm'
                          : 'bg-stone-50/70 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div 
                        onClick={() => {
                          if (onInspectSaree) {
                            const details = findSareeDetails(hs.id, {
                              title: hs.label,
                              price: hs.price,
                              image: hs.image,
                              category: hs.category,
                            });
                            onInspectSaree(details);
                          }
                        }}
                        className="flex items-center gap-3 cursor-pointer group/item flex-1"
                      >
                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-stone-200 group-hover/item:border-[#E11D48] transition-colors">
                          <SilkImage
                            src={hs.image}
                            alt={hs.label}
                            label={hs.label}
                            fallbackColor="#E11D48"
                            patternType="zari"
                            className="w-full h-full group-hover/item:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#E11D48] font-bold">
                            {hs.category}
                          </span>
                          <div className="text-xs sm:text-sm font-semibold text-stone-900 leading-snug group-hover/item:text-[#E11D48] transition-colors">
                            {hs.label}
                          </div>
                          <div className="text-xs font-mono font-bold text-stone-700 mt-0.5">
                            {formatPrice(hs.price)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddItem(hs)}
                        className={`p-2.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-900 hover:bg-[#E11D48] text-white shadow-xs'
                        }`}
                        title="Add this item to bag"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span className="hidden sm:inline">Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            <span className="hidden sm:inline">Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Complete Ensemble Order Card */}
              <div className="mt-6 pt-5 border-t border-stone-200">
                <div className="flex items-center justify-between mb-3 text-sm">
                  <span className="text-stone-600 font-medium">Complete Ensemble Total</span>
                  <span className="text-lg font-cinzel font-bold text-[#E11D48] font-mono">
                    {formatPrice(currentLook.totalPrice)}
                  </span>
                </div>

                <button
                  onClick={handleAddFullLook}
                  className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    addedItems.fullLook
                      ? 'bg-emerald-700 text-white'
                      : 'bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] text-white hover:opacity-95 hover:shadow-lg'
                  }`}
                >
                  {addedItems.fullLook ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Complete Look Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Complete Ensemble to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Styling Note Box */}
            <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-stone-800 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#E11D48] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#E11D48]">Artisan Styling Guarantee:</span> Each look is curated by Ravi Textiles hereditary master drapers, pairing genuine temple jewelry with certified 3-ply mulberry silk and gold zari.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
