import React, { useState, useRef } from 'react';
import { CurrencyCode, SareeDetail } from '../types';
import { CURRENCIES, findSareeDetails } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import { Play, Pause, Volume2, VolumeX, Sparkles, ShoppingBag, Check, Sliders, Eye } from 'lucide-react';

interface FeelTheDrapeSectionProps {
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

export const FeelTheDrapeSection: React.FC<FeelTheDrapeSectionProps> = ({ currency, onAddToCart, onInspectSaree }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [added, setAdded] = useState(false);
  const [pleatCount, setPleatCount] = useState<number>(8);
  const [zariSheen, setZariSheen] = useState<number>(90);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const curr = CURRENCIES[currency] || CURRENCIES.INR;

  const collectionPrice = 79000;
  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handlePurchase = () => {
    onAddToCart({
      id: 'drape-featured-collection',
      title: 'Suryakanti Sunburst Drape Heirloom',
      subtitle: 'Pure Kanchipuram with Consecrated 24K Gold Zari Pallu',
      price: collectionPrice,
      image: '/assets/aistudio/Screenshot_2026-11-12_154846_a72df960.png',
      category: 'Bridal Radiance',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const galleryStills = [
    {
      id: 'still-1',
      title: '24K Gold Zari Floral Brocade',
      price: 68000,
      image: '/assets/aistudio/Screenshot_2026-11-12_154856_0061fafd.png',
      color: '#E11D48',
    },
    {
      id: 'still-2',
      title: 'Sembaruthi Ruby Diamond Brocade',
      price: 89000,
      image: '/assets/aistudio/Screenshot_2026-11-12_160409_c556e96f.png',
      color: '#BE123C',
    },
    {
      id: 'still-3',
      title: 'Coral Peach Showroom Hanger Drape',
      price: 76000,
      image: '/assets/aistudio/Screenshot_2026-11-12_160557_8e158958.png',
      color: '#F59E0B',
    },
    {
      id: 'still-4',
      title: 'Neelambari Navy Floral Brocade',
      price: 78000,
      image: '/assets/aistudio/Screenshot_2026-11-12_160416_93f4161c.png',
      color: '#1E3A8A',
    },
  ];

  return (
    <section id="feel-the-drape" className="py-20 lg:py-28 bg-[#250912] text-white overflow-hidden relative">
      {/* Radiant festive sparkle dust */}
      <div className="absolute inset-0 bg-[radial-gradient(#FDE047_1px,transparent_1px)] opacity-20 [background-size:26px_26px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#FEF08A] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            <span>Cinematic Fluidity & Tactile Fall</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-white tracking-tight">
            Feel the drape.
          </h2>
          <p className="text-stone-200 text-sm sm:text-base font-light mt-1">
            "Fluid as water, radiant as morning gold. Experience the tactile weight and celebratory rustle of pure South Indian pattu."
          </p>
        </div>

        {/* Centerpiece Layout with Video & Stills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Stills */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
            {galleryStills.slice(0, 2).map((still) => (
              <div
                key={still.id}
                onClick={() => {
                  if (onInspectSaree) {
                    const details = findSareeDetails(still.title, {
                      title: still.title,
                      price: still.price,
                      image: still.image,
                    });
                    onInspectSaree(details);
                  }
                }}
                className="saree-card-interactive group relative rounded-2xl overflow-hidden aspect-4/3 border-2 border-[#FDE68A]/30 hover:border-[#FDE047] transition-all cursor-pointer shadow-md"
              >
                <SilkImage
                  src={still.image}
                  alt={still.title}
                  fallbackColor={still.color}
                  label={still.title}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                  <div className="text-xs font-cinzel font-bold group-hover:text-[#FDE047] transition-colors">{still.title}</div>
                  <div className="text-[11px] text-[#FEF08A] font-mono mt-0.5 font-bold flex items-center justify-between">
                    <span>{formatPrice(still.price)}</span>
                    <span className="text-[10px] uppercase font-sans underline text-white/80">View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Central Cinematic Video Player */}
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden bg-black border-2 border-[#FDE047]/60 shadow-[0_0_60px_rgba(245,158,11,0.3)]">
            <div className="relative aspect-9/16 sm:aspect-4/3 max-h-[550px] w-full flex items-center justify-center bg-stone-950">
              <video
                ref={videoRef}
                src="/assets/aistudio/WhatsApp_Video_2026-11-12_at_9.13.24_AM_5a9bb4b8.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Video Overlay Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Video Controls Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <span className="bg-black/60 backdrop-blur-md text-[#FEF08A] text-xs font-mono font-bold px-3 py-1 rounded-full border border-white/20">
                  RAVI TEXTILES · RADIANT DRAPE STUDIO
                </span>

                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/60 text-white hover:bg-black border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
                  title={isMuted ? 'Unmute Video' : 'Mute Video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#FDE047]" />}
                </button>
              </div>

              {/* Center Play/Pause button */}
              <button
                onClick={togglePlay}
                className="absolute z-20 w-16 h-16 rounded-full bg-black/50 hover:bg-[#E11D48] text-white border-2 border-[#FDE047] flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 cursor-pointer shadow-lg"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1 text-[#FDE047]" />}
              </button>

              {/* Bottom Video Action Bar */}
              <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                <div className="mb-3 text-xs text-[#FEF08A] font-cormorant italic text-lg drop-shadow font-medium">
                  "Light dancing across 24K gold zari threads."
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handlePurchase}
                    className={`w-full sm:w-auto px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl ${
                      added
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gradient-to-r from-[#F59E0B] via-[#FDE047] to-[#F59E0B] text-[#881337] hover:scale-105'
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Purchase ({formatPrice(collectionPrice)})</span>
                      </>
                    )}
                  </button>

                  {onInspectSaree && (
                    <button
                      onClick={() => {
                        const details = findSareeDetails('Suryakanti Sunburst Drape Heirloom', {
                          title: 'Suryakanti Sunburst Drape Heirloom',
                          price: collectionPrice,
                          image: '/assets/aistudio/Screenshot_2026-11-12_154846_a72df960.png',
                        });
                        onInspectSaree(details);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/60 hover:bg-black text-[#FEF08A] border border-[#FDE047]/60 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Specifications</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Pleat & Drape Sliders */}
            <div className="p-4 bg-stone-900/95 border-t border-white/15 text-xs">
              <div className="flex items-center gap-2 mb-3 text-stone-300 font-mono">
                <Sliders className="w-3.5 h-3.5 text-[#FDE047]" />
                <span className="uppercase tracking-wider font-semibold">Festive Pleat & Sheen Customizer</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-stone-200 mb-1">
                    <span>Front Pleat Volume</span>
                    <span className="font-mono text-[#FEF08A] font-bold">{pleatCount} pleats</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="11"
                    value={pleatCount}
                    onChange={(e) => setPleatCount(Number(e.target.value))}
                    className="w-full accent-[#F59E0B] h-2 bg-stone-700 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-stone-200 mb-1">
                    <span>24K Zari Reflective Luster</span>
                    <span className="font-mono text-[#FEF08A] font-bold">{zariSheen}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={zariSheen}
                    onChange={(e) => setZariSheen(Number(e.target.value))}
                    className="w-full accent-[#F59E0B] h-2 bg-stone-700 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Stills */}
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-4">
            {galleryStills.slice(2, 4).map((still) => (
              <div
                key={still.id}
                onClick={() => {
                  if (onInspectSaree) {
                    const details = findSareeDetails(still.title, {
                      title: still.title,
                      price: still.price,
                      image: still.image,
                    });
                    onInspectSaree(details);
                  }
                }}
                className="saree-card-interactive group relative rounded-2xl overflow-hidden aspect-4/3 border-2 border-[#FDE68A]/30 hover:border-[#FDE047] transition-all cursor-pointer shadow-md"
              >
                <SilkImage
                  src={still.image}
                  alt={still.title}
                  fallbackColor={still.color}
                  label={still.title}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                  <div className="text-xs font-cinzel font-bold group-hover:text-[#FDE047] transition-colors">{still.title}</div>
                  <div className="text-[11px] text-[#FEF08A] font-mono mt-0.5 font-bold flex items-center justify-between">
                    <span>{formatPrice(still.price)}</span>
                    <span className="text-[10px] uppercase font-sans underline text-white/80">View Details</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
