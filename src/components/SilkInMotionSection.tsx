import React, { useState } from 'react';
import { STORY_REELS } from '../data/sareesData';
import { CurrencyCode, StoryReel } from '../types';
import { SareeDetail } from '../types';
import { CURRENCIES, findSareeDetails } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import { Play, Heart, Eye, Sparkles, ShoppingBag, Check, X, Volume2, VolumeX, Info } from 'lucide-react';

interface SilkInMotionSectionProps {
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

export const SilkInMotionSection: React.FC<SilkInMotionSectionProps> = ({ currency, onAddToCart, onInspectSaree }) => {
  const [activeReel, setActiveReel] = useState<StoryReel | null>(null);
  const [likesState, setLikesState] = useState<Record<string, { count: number; liked: boolean }>>(() => {
    const map: Record<string, { count: number; liked: boolean }> = {};
    STORY_REELS.forEach((r) => {
      map[r.id] = { count: r.likes, liked: false };
    });
    return map;
  });
  const [reelAdded, setReelAdded] = useState(false);
  const [isModalMuted, setIsModalMuted] = useState(true);

  const curr = CURRENCIES[currency] || CURRENCIES.INR;

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const toggleLike = (reelId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesState((prev) => {
      const current = prev[reelId] || { count: 1000, liked: false };
      return {
        ...prev,
        [reelId]: {
          count: current.liked ? current.count - 1 : current.count + 1,
          liked: !current.liked,
        },
      };
    });
  };

  const handleBuyReelSaree = (reel: StoryReel) => {
    onAddToCart({
      id: `reel-${reel.id}`,
      title: reel.sareeName,
      subtitle: `Featured in ${reel.title} · ${reel.tag}`,
      price: reel.price,
      image: reel.thumbnail,
      category: 'In Motion Collection',
    });
    setReelAdded(true);
    setTimeout(() => setReelAdded(false), 2000);
  };

  return (
    <section id="silk-in-motion" className="py-20 lg:py-28 bg-[#FFFDF9] border-b border-[#FDE68A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E11D48] font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Real-Life Stories & Drapes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight">
              Silk, in motion.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light mt-1">
              "Witness the majestic flutter of authentic Kanchipuram and Varanasi drapes under real festive lighting."
            </p>
          </div>

          <div className="text-xs text-stone-500 font-mono">
            Tap any reel to preview full story & buy
          </div>
        </div>

        {/* Vertical Reel Cards Carousel */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {STORY_REELS.map((reel) => {
            const likeInfo = likesState[reel.id] || { count: reel.likes, liked: false };

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                className="group relative rounded-2xl overflow-hidden aspect-[9/16] bg-stone-900 border border-[#FDE68A] hover:border-[#E11D48] shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Background Image / Reel Poster */}
                <SilkImage
                  src={reel.thumbnail}
                  alt={reel.title}
                  label={reel.title}
                  fallbackColor="#BE123C"
                  patternType="brocade"
                  className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

                {/* Top Badge: Views & Category Tag */}
                <div className="relative z-10 p-3 flex items-center justify-between text-white text-[11px]">
                  <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 font-mono">
                    {reel.views} views
                  </span>

                  <button
                    onClick={(e) => toggleLike(reel.id, e)}
                    className="p-1.5 rounded-full bg-black/40 backdrop-blur-md hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        likeInfo.liked ? 'text-[#E11D48] fill-[#E11D48]' : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Center Play Icon Hover */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-white/25 group-hover:bg-[#E11D48] text-white flex items-center justify-center mx-auto backdrop-blur-md transition-all duration-300 group-hover:scale-110 border border-white/40">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>

                {/* Bottom Saree Details */}
                <div className="relative z-10 p-3 text-white">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-[#FDE047] font-semibold">
                    {reel.tag}
                  </div>
                  <h3 className="text-base font-cinzel font-bold leading-tight mt-0.5">
                    {reel.title}
                  </h3>
                  <div className="text-xs text-stone-300 truncate mt-0.5">
                    {reel.sareeName}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#FDE68A] mt-1.5 flex items-center justify-between">
                    <span>{formatPrice(reel.price)}</span>
                    <span className="text-[10px] text-white/90 underline underline-offset-2">Quick View</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Reel Modal Viewer */}
      {activeReel && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-stone-950 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-[#FDE68A] flex flex-col aspect-[9/16] max-h-[88vh]">
            
            {/* Top Close & Controls */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-[#E11D48] text-white text-[11px] font-mono px-2.5 py-1 rounded-full font-bold">
                  {activeReel.tag}
                </span>
                <span className="text-xs text-white/90 font-mono">
                  {activeReel.views} views
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsModalMuted(!isModalMuted)}
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  {isModalMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setActiveReel(null)}
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video
                src={activeReel.videoSrc || '/assets/aistudio/WhatsApp_Video_2026-11-12_at_9.13.24_AM_5a9bb4b8.mp4'}
                autoPlay
                loop
                muted={isModalMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
            </div>

            {/* Bottom Info and Buy Button */}
            <div className="absolute bottom-4 left-4 right-4 z-30 text-white">
              <h3 className="text-2xl font-cinzel font-bold text-white">
                {activeReel.title}
              </h3>
              <p className="text-xs text-[#FDE047] font-mono mt-0.5 font-bold">
                {activeReel.sareeName}
              </p>
              <p className="text-xs text-stone-200 mt-2 font-light leading-relaxed">
                {activeReel.drapeDescription}
              </p>

              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-300">Ravi Textiles Certified Silk</span>
                  <div className="text-lg font-cinzel font-bold text-[#FDE68A] font-mono">
                    {formatPrice(activeReel.price)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {onInspectSaree && (
                    <button
                      onClick={() => {
                        const details = findSareeDetails(activeReel.sareeName, {
                          title: activeReel.sareeName,
                          price: activeReel.price,
                          image: activeReel.thumbnail,
                        });
                        setActiveReel(null);
                        onInspectSaree(details);
                      }}
                      className="px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 hover:bg-black text-[#FEF08A] border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleBuyReelSaree(activeReel)}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                      reelAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] text-white hover:opacity-95 hover:scale-105'
                    }`}
                  >
                    {reelAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Buy Saree</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
