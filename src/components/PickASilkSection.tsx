import React, { useState } from 'react';
import { SILK_CARDS } from '../data/sareesData';
import { CurrencyCode, SilkCard } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import { ShoppingBag, Check, Info, Sparkles, ChevronRight, X } from 'lucide-react';

import { SareeDetail } from '../types';
import { findSareeDetails } from '../data/sareesData';

interface PickASilkSectionProps {
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

export const PickASilkSection: React.FC<PickASilkSectionProps> = ({ currency, onAddToCart, onInspectSaree }) => {
  const [selectedCard, setSelectedCard] = useState<SilkCard | null>(null);
  const [addedCardId, setAddedCardId] = useState<string | null>(null);

  const curr = CURRENCIES[currency] || CURRENCIES.INR;

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const handleInspect = (silk: SilkCard) => {
    if (onInspectSaree) {
      const detailed = findSareeDetails(silk.id, {
        title: silk.name,
        price: silk.price,
        image: silk.image,
        category: silk.weave,
        color: silk.colorName,
        origin: silk.origin,
      });
      onInspectSaree(detailed);
    } else {
      setSelectedCard(silk);
    }
  };

  const handleAddSilk = (silk: SilkCard) => {
    onAddToCart({
      id: silk.id,
      title: silk.name,
      subtitle: `${silk.weave} · ${silk.origin}`,
      price: silk.price,
      image: silk.image,
      category: 'Pure Silk',
    });
    setAddedCardId(silk.id);
    setTimeout(() => {
      setAddedCardId(null);
    }, 2000);
  };

  return (
    <section id="pick-a-silk" className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#E11D48] font-bold">
            Color & Provenance Deck
          </span>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight mt-1">
            Pick a Silk.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-1">
            "Six sovereign threads, each handwoven with radiant pure silver zari under the master guilds of India."
          </p>
        </div>

        <div className="text-xs text-stone-600 font-medium flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Fanned by festive celebration palette and loom duration</span>
        </div>
      </div>

      {/* Cards Deck Carousel (Matching the video cards at 00:10) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {SILK_CARDS.map((silk) => {
          const isAdded = addedCardId === silk.id;
          return (
            <div
              key={silk.id}
              onClick={() => handleInspect(silk)}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200 cursor-pointer flex flex-col justify-between"
              style={{
                backgroundColor: silk.colorHex,
              }}
            >
              {/* Top Card Area with Weave Name */}
              <div className="p-4 relative z-10 text-white min-h-[140px] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono tracking-wider opacity-80">
                    {silk.weave}
                  </div>
                  <h3 className="text-base sm:text-lg font-cinzel font-black uppercase tracking-tight mt-1 drop-shadow-sm leading-tight">
                    {silk.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between text-xs font-mono font-semibold text-white/90">
                  <span>{formatPrice(silk.price)}</span>
                  <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-white group-hover:text-stone-900 transition-colors">
                    <Info className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Bottom Saree Silhouette Preview */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/10">
                <SilkImage
                  src={silk.image}
                  alt={silk.name}
                  label={silk.name}
                  fallbackColor={silk.colorHex}
                  patternType="checks"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-20">
                  <span className="text-[10px] text-white/90 font-mono">
                    {silk.loomDays} Loom Days
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddSilk(silk);
                    }}
                    className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-stone-900 hover:bg-[#E11D48] hover:text-white'
                    }`}
                    title="Add to Bag"
                  >
                    {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Silk Inspection Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#FDE68A] animate-in fade-in zoom-in-95 duration-200">
            <div className="relative aspect-16/9 bg-stone-900">
              <SilkImage
                src={selectedCard.image}
                alt={selectedCard.name}
                label={selectedCard.name}
                fallbackColor={selectedCard.colorHex}
                patternType="brocade"
                className="w-full h-full opacity-90"
              />
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-xs uppercase font-mono tracking-widest text-[#FDE047]">
                  {selectedCard.origin}
                </span>
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold mt-0.5">
                  {selectedCard.name}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="text-sm text-stone-600 leading-relaxed mb-6 font-light">
                {selectedCard.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] mb-6 text-xs">
                <div>
                  <div className="text-stone-500 uppercase font-mono text-[10px]">Thread Count</div>
                  <div className="font-semibold text-stone-800 mt-0.5">{selectedCard.threadCount}</div>
                </div>
                <div>
                  <div className="text-stone-500 uppercase font-mono text-[10px]">Zari Grade</div>
                  <div className="font-semibold text-stone-800 mt-0.5">{selectedCard.zariGrade}</div>
                </div>
                <div>
                  <div className="text-stone-500 uppercase font-mono text-[10px]">Artisan Days</div>
                  <div className="font-semibold text-stone-800 mt-0.5">{selectedCard.loomDays} Handloom Days</div>
                </div>
                <div>
                  <div className="text-stone-500 uppercase font-mono text-[10px]">Palette</div>
                  <div className="font-semibold text-stone-800 mt-0.5">{selectedCard.colorName}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <div className="text-xs text-stone-500 font-medium">Festive Heirloom Investment</div>
                  <div className="text-2xl font-cinzel font-bold text-[#E11D48] font-mono">
                    {formatPrice(selectedCard.price)}
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddSilk(selectedCard);
                    setSelectedCard(null);
                  }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] hover:opacity-95 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
