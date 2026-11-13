import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Sparkles, Search, Heart, Menu, X } from 'lucide-react';
import { CurrencyCode } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onReplayCurtain: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  currency,
  onCurrencyChange,
  isAudioPlaying,
  onToggleAudio,
  onReplayCurtain,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Heritage Notification Bar */}
      <div className="bg-[#BE123C] text-[#FEF08A] text-xs py-2 px-4 tracking-widest text-center border-b border-[#F59E0B]/50 flex items-center justify-between shadow-xs">
        <div className="hidden md:flex items-center gap-2 text-[11px] font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
          <span>ESTD 1924 · GOVT. SILK MARK CERTIFIED</span>
        </div>
        <div className="mx-auto flex items-center gap-2 font-medium text-white">
          <span>Festive Celebration: Flat 25% Off With Code</span>
          <span className="font-mono bg-[#881337] text-[#FEF08A] px-2 py-0.5 rounded border border-[#FDE047]/60 font-bold">
            RAVI25
          </span>
          <span className="hidden sm:inline">· Free Worldwide Insured Shipping</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px]">
          <button
            onClick={onReplayCurtain}
            className="hover:text-[#FEF08A] transition-colors underline underline-offset-2 cursor-pointer text-white"
          >
            Replay Curtains
          </button>
        </div>
      </div>

      {/* Main Top Bar (Conforming to Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#FDE68A] px-6 lg:px-12 py-3.5 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-stone-700 hover:text-[#E11D48]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <a
              href="#"
              className="group flex items-center gap-2 text-xl lg:text-2xl font-cinzel font-bold tracking-[0.2em] text-[#E11D48] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
            >
              <span>RAVI TEXTILES</span>
            </a>
          </div>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wider text-stone-700 uppercase">
            <a href="#moods" className="hover:text-[#E11D48] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Six Moods
            </a>
            <a href="#try-the-look" className="hover:text-[#E11D48] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Try the Look
            </a>
            <a href="#the-rail" className="hover:text-[#E11D48] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              The Rail
            </a>
            <a href="#sarees-collection" className="hover:text-[#E11D48] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 text-[#E11D48] font-bold">
              Sarees Collection
            </a>
            <a href="#feel-the-drape" className="hover:text-[#E11D48] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Feel the Drape
            </a>
            <a href="#bridal-pavilion" className="hover:text-[#E11D48] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Bridal Pavilion
            </a>
            <a href="#artisan-heritage" className="hover:text-[#E11D48] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
              Artisan Heritage
            </a>
          </nav>

          {/* Zone 3: 1 primary action & utility controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Ambient Sound Toggle */}
            <button
              onClick={onToggleAudio}
              title={isAudioPlaying ? 'Mute Tanpura Harmonics' : 'Play Sacred Tanpura Sound'}
              className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                isAudioPlaying
                  ? 'bg-[#E11D48] text-[#FEF08A] border-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                  : 'bg-stone-100 text-stone-600 border-stone-200 hover:text-stone-900'
              }`}
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Currency Selector */}
            <div className="hidden sm:flex items-center border border-stone-200 rounded-lg bg-white overflow-hidden text-xs">
              {(['INR', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => onCurrencyChange(c)}
                  className={`px-2 py-1 transition-colors ${
                    currency === c ? 'bg-[#E11D48] text-white font-semibold' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-stone-700 hover:text-[#E11D48] relative cursor-pointer"
              title="Saved Silks"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E11D48]" />
              )}
            </button>

            {/* Primary Action: Shopping Bag */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#E11D48] to-[#BE123C] hover:from-[#BE123C] hover:to-[#9F1239] rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Bag ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-200 flex flex-col gap-3 text-sm pb-2">
            <a
              href="#moods"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-stone-800 hover:text-[#E11D48]"
            >
              Six Moods
            </a>
            <a
              href="#try-the-look"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-stone-800 hover:text-[#E11D48]"
            >
              Try the Look
            </a>
            <a
              href="#sarees-collection"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 font-bold text-[#E11D48]"
            >
              Sarees Collection
            </a>
            <a
              href="#the-rail"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-stone-800 hover:text-[#E11D48]"
            >
              The Rail
            </a>
            <a
              href="#feel-the-drape"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-stone-800 hover:text-[#E11D48]"
            >
              Feel the Drape
            </a>
            <a
              href="#bridal-pavilion"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-stone-800 hover:text-[#E11D48]"
            >
              Bridal Pavilion
            </a>
            <a
              href="#artisan-heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-stone-800 hover:text-[#E11D48]"
            >
              Artisan Heritage
            </a>
            <div className="flex items-center gap-2 pt-2 border-t border-stone-200 text-xs">
              <span className="text-stone-500 font-medium">Currency:</span>
              {(['INR', 'USD', 'EUR', 'GBP'] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  onClick={() => onCurrencyChange(c)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                    currency === c ? 'bg-[#E11D48] text-white shadow-xs' : 'bg-stone-100 border border-stone-200 text-stone-700'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
