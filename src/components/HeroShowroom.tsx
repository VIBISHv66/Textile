import React, { useState } from 'react';
import { ArrowDown, ShieldCheck, Award, Feather, Sparkles, Star, ChevronRight, Eye, ShoppingBag } from 'lucide-react';

interface HeroShowroomProps {
  onExploreRail: () => void;
  onTryLook: () => void;
  onInspectHeroSaree?: () => void;
}

const HERO_BACKGROUNDS = [
  {
    id: 'illuminated-vault',
    name: 'Palace Boutique Vault',
    url: '/assets/aistudio/Screenshot_2026-11-12_160454_bca4a2a0.png',
    fallbackColor: '#78350F',
    alt: 'Ravi Textiles Luxury Warm Illuminated Boutique Showroom with Silk Rails',
  },
  {
    id: 'silk-archive-wall',
    name: 'Grand Silk Archive',
    url: '/assets/aistudio/Screenshot_2026-11-12_160506_cb17a0f2.png',
    fallbackColor: '#92400E',
    alt: 'Wall of Folded Pure Kanchipuram and Banarasi Silk Sarees',
  },
  {
    id: 'golden-walkway',
    name: 'Golden Boutique Walkway',
    url: '/assets/aistudio/Screenshot_2026-11-12_160609_a2158bf2.png',
    fallbackColor: '#B45309',
    alt: 'Bright Luxury Bridal Showroom with Draped Golden Mannequins',
  },
  {
    id: 'royal-sanctum',
    name: 'Royal Bridal Sanctum',
    url: '/assets/aistudio/Screenshot_2026-11-12_160338_96311121.png',
    fallbackColor: '#881337',
    alt: 'Royal Lady Draped in Rani Fuchsia 24K Gold Kanjivaram',
  },
];

export const HeroShowroom: React.FC<HeroShowroomProps> = ({
  onExploreRail,
  onTryLook,
  onInspectHeroSaree,
}) => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const currentBg = HERO_BACKGROUNDS[currentBgIndex];

  return (
    <section className="relative overflow-hidden bg-[#1E0910] text-white pt-12 pb-16 lg:pt-20 lg:pb-28 min-h-[720px] flex items-center">
      
      {/* 1. Luminous Warm Boutique Showroom Background */}
      <div className="absolute inset-0 z-0 bg-[#1E0910] overflow-hidden">
        
        {/* Crisp Luxury Showroom Image */}
        <img
          key={currentBg.id}
          src={currentBg.url}
          alt={currentBg.alt}
          referrerPolicy="no-referrer"
          loading="eager"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.12] saturate-[1.2] scale-105 transition-all duration-1000 ${
            imgLoaded ? 'opacity-90' : 'opacity-40'
          }`}
        />

        {/* Luminous Warm Amber, Golden Diya & Royal Crimson Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E0910] via-[#1E0910]/45 to-[#1E0910]/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E0910]/75 via-[#1E0910]/35 to-[#1E0910]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(253,224,71,0.22)_0%,transparent_60%)] pointer-events-none" />
        
        {/* Floating Animated Golden Glow Orbs */}
        <div className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-[#F59E0B]/20 blur-3xl animate-float-slow pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 rounded-full bg-[#E11D48]/20 blur-3xl animate-float-reverse pointer-events-none" />

        {/* Golden sparkle dust pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#FDE047_1px,transparent_1px)] opacity-20 [background-size:24px_24px] pointer-events-none" />

        {/* Ornate Gold Filigree Hem at Top and Bottom of Hero */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FDE047] to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Top Badges & Background Selector Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-[#FDE047]/60 text-[#FEF08A] text-xs font-semibold tracking-widest uppercase backdrop-blur-md shadow-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>Ravi Textiles · Consecrated Handloom Heritage</span>
            <span className="text-[#FDE047]/60">·</span>
            <span>100% Pure Silk Mark</span>
          </div>

          {/* Background Ambience Preset Switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-black/50 border border-white/20 rounded-full backdrop-blur-md">
            <span className="text-[10px] uppercase font-mono text-[#FEF08A] px-2 font-bold hidden sm:inline">
              Showroom View:
            </span>
            {HERO_BACKGROUNDS.map((bg, idx) => (
              <button
                key={bg.id}
                onClick={() => {
                  setImgLoaded(false);
                  setCurrentBgIndex(idx);
                }}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                  currentBgIndex === idx
                    ? 'bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] text-white shadow-xs font-bold'
                    : 'text-stone-200 hover:text-white'
                }`}
                title={`Switch showroom ambience to ${bg.name}`}
              >
                {bg.name}
              </button>
            ))}
          </div>
        </div>

        {/* Split Hero Composition: Left Powerful Typography & CTAs, Right Crown Jewel Medallion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline, Poetic Copy, Stats & Action Buttons */}
          <div className="lg:col-span-7 text-left">
            
            <div className="inline-flex items-center gap-2 text-xs uppercase font-mono tracking-[0.25em] text-[#FEF08A] font-bold mb-3">
              <Star className="w-3.5 h-3.5 text-[#FDE047] fill-[#FDE047]" />
              <span>Auspicious Wedding & Festive Trousseaus</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-6xl font-cinzel font-black tracking-tight text-white leading-[1.08] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              Woven in Light, <br />
              <span className="gold-text-gradient italic font-serif">Crowned for Eternity.</span>
            </h1>

            <p className="font-cormorant text-xl sm:text-2xl text-[#FEF3C7] mb-8 font-normal italic leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xl">
              "Where every thread captures the morning sun, and every drape honors the divine royalty within you."
            </p>

            {/* CTAs with Shimmer Animation */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onTryLook}
                className="shimmer-btn-sheen px-8 py-4 bg-gradient-to-r from-[#F59E0B] via-[#FDE047] to-[#F59E0B] text-[#881337] text-xs font-black tracking-widest uppercase rounded-full shadow-[0_12px_40px_rgba(245,158,11,0.55)] hover:scale-105 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#881337]" />
                <span>Try the Look · 4 Regal Ensembles</span>
              </button>
              
              <button
                onClick={onExploreRail}
                className="px-8 py-4 bg-black/60 hover:bg-black/90 border-2 border-[#FDE047]/70 text-white text-xs font-bold tracking-widest uppercase rounded-full backdrop-blur-md transition-all cursor-pointer shadow-lg hover:border-[#FDE047] flex items-center justify-center gap-2"
              >
                <span>Explore The Rail</span>
                <ChevronRight className="w-4 h-4 text-[#FDE047]" />
              </button>
            </div>

            {/* 3 Pillars of Authenticity with Translucent Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/20 pt-6">
              <div className="p-3 rounded-2xl bg-black/45 border border-[#FDE047]/30 backdrop-blur-md">
                <ShieldCheck className="w-5 h-5 text-[#FDE047] mb-1" />
                <div className="text-xs font-bold text-white">Silk Mark Certified</div>
                <div className="text-[11px] text-stone-300 mt-0.5">100% natural Mulberry silk</div>
              </div>

              <div className="p-3 rounded-2xl bg-black/45 border border-[#FDE047]/30 backdrop-blur-md">
                <Award className="w-5 h-5 text-[#FDE047] mb-1" />
                <div className="text-xs font-bold text-white">24K Gold Zari</div>
                <div className="text-[11px] text-stone-300 mt-0.5">Electroplated pure silver</div>
              </div>

              <div className="p-3 rounded-2xl bg-black/45 border border-[#FDE047]/30 backdrop-blur-md">
                <Feather className="w-5 h-5 text-[#FDE047] mb-1" />
                <div className="text-xs font-bold text-white">Handloom Pit Loom</div>
                <div className="text-[11px] text-stone-300 mt-0.5">300+ artisan loom hours</div>
              </div>
            </div>

          </div>

          {/* Right Column: Crown Jewel Lady Portrait in Ornate Arched Medallion */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-sm sm:max-w-md aspect-3/4 rounded-3xl overflow-hidden border-4 border-[#FDE047] shadow-[0_0_50px_rgba(245,158,11,0.4)] animate-gold-aura group">
              
              <img
                src="/assets/aistudio/Screenshot_2026-11-12_160338_96311121.png"
                alt="Ravi Textiles Crown Jewel Bridal Saree Drape"
                className="w-full h-full object-cover object-top filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FEF08A] text-[10px] font-mono font-bold border border-white/20 uppercase tracking-widest">
                  Crown Jewel Edition
                </span>
                <span className="px-3 py-1 rounded-full bg-[#E11D48] text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                  New Arrival
                </span>
              </div>

              {/* Bottom Card Info with Quick View */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE047] font-semibold">
                  Maharani Palace Collection
                </span>
                <h3 className="text-lg font-cinzel font-bold text-white mt-0.5">
                  Rani Fuchsia Brocade with Pure 24K Temple Zari
                </h3>
                <p className="text-xs text-stone-200 font-light mt-1 line-clamp-2">
                  Triple-shuttle Korvai weave hand-interlocked with pure silver-gold zari pallu and flying swan motifs.
                </p>

                <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between">
                  <div className="text-base font-cinzel font-bold text-[#FDE68A] font-mono">
                    ₹74,000
                  </div>
                  <button
                    onClick={() => {
                      if (onInspectHeroSaree) {
                        onInspectHeroSaree();
                      } else {
                        const el = document.getElementById('sarees-collection');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-white text-stone-900 hover:bg-[#E11D48] hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Details</span>
                  </button>
                </div>
              </div>

              {/* Floating Badge 1: 100% Handloom Silk */}
              <div className="absolute -top-3 -right-3 z-30 p-2.5 rounded-2xl bg-gradient-to-r from-[#E11D48] to-[#BE123C] text-white text-[10px] font-bold uppercase shadow-xl border-2 border-[#FDE047] animate-float-slow hidden sm:flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FEF08A]" />
                <span>Pure Mulberry Silk</span>
              </div>

            </div>

          </div>

        </div>

        {/* Scroll down prompt */}
        <div className="mt-12 flex justify-center">
          <a
            href="#moods"
            className="text-stone-200 hover:text-[#FDE047] transition-colors p-2 inline-flex flex-col items-center gap-1 text-[11px] font-semibold tracking-widest uppercase drop-shadow group"
          >
            <span>Discover The Moods</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#FDE047] group-hover:scale-125 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
