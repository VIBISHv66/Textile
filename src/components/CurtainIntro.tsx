import React, { useState } from 'react';
import { Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { audioAmbience } from '../utils/audioAmbience';

interface CurtainIntroProps {
  isOpen: boolean;
  onOpen: () => void;
  onReplay: () => void;
}

export const CurtainIntro: React.FC<CurtainIntroProps> = ({ isOpen, onOpen }) => {
  const [animating, setAnimating] = useState(false);

  const handleOpenCurtain = () => {
    setAnimating(true);
    audioAmbience.playChime();
    setTimeout(() => {
      onOpen();
      setAnimating(false);
    }, 1100);
  };

  if (isOpen && !animating) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden flex items-center justify-center transition-opacity duration-700 ${
        animating ? 'pointer-events-none' : ''
      }`}
    >
      {/* Left Curtain: Bright Radiant Festive Coral-Ruby */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 shadow-2xl transition-transform duration-1000 ease-in-out border-r-2 border-[#FDE047] ${
          animating ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, #BE123C 0%, #E11D48 45%, #FB7185 85%, #9F1239 100%)',
          boxShadow: 'inset -25px 0 60px rgba(0,0,0,0.4)',
        }}
      >
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#FDE047_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/30 to-transparent" />
        
        {/* Ornate Sunburst Gold Trim on edge */}
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-b from-[#F59E0B] via-[#FEF08A] to-[#F59E0B] shadow-md" />
      </div>

      {/* Right Curtain: Bright Radiant Festive Coral-Ruby */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 shadow-2xl transition-transform duration-1000 ease-in-out border-l-2 border-[#FDE047] ${
          animating ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          background: 'linear-gradient(225deg, #BE123C 0%, #E11D48 45%, #FB7185 85%, #9F1239 100%)',
          boxShadow: 'inset 25px 0 60px rgba(0,0,0,0.4)',
        }}
      >
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#FDE047_1.2px,transparent_1.2px)] [background-size:24px_24px]" />
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/30 to-transparent" />
        
        {/* Ornate Sunburst Gold Trim on edge */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-b from-[#F59E0B] via-[#FEF08A] to-[#F59E0B] shadow-md" />
      </div>

      {/* Center Grand Emblem & Entrance CTA */}
      <div
        className={`relative z-10 text-center max-w-xl mx-auto px-6 py-10 transition-all duration-700 ${
          animating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Radiant Gold Insignia Seal */}
        <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-[#FDE047] p-2 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-[0_0_50px_rgba(251,191,36,0.6)] animate-pulse">
          <div className="w-full h-full rounded-full border border-[#FEF08A] flex flex-col items-center justify-center text-[#FEF08A]">
            <Sparkles className="w-7 h-7 mb-0.5 text-[#FDE047]" />
            <span className="text-[10px] tracking-[0.3em] font-cinzel font-bold uppercase">ESTD 1924</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F59E0B]/30 border border-[#FDE047]/60 text-[#FEF08A] text-xs font-semibold tracking-widest uppercase mb-4 backdrop-blur-md">
          <span>Sacred Looms of Tamil Nadu & Varanasi</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-cinzel text-white tracking-[0.25em] uppercase font-black mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
          RAVI TEXTILES
        </h1>
        <p className="font-cormorant text-2xl md:text-3xl text-[#FEF08A] italic mb-3 tracking-wide drop-shadow">
          Where Every Thread Sings with Light
        </p>
        <p className="text-stone-100 text-sm max-w-md mx-auto mb-8 font-light leading-relaxed drop-shadow">
          Step into a vibrant sanctuary of pure sunburst silks, celebratory festive drapes, and certified 24K liquid gold zari.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleOpenCurtain}
            className="group px-9 py-4 bg-gradient-to-r from-[#F59E0B] via-[#FDE047] to-[#F59E0B] text-[#881337] font-bold text-xs tracking-widest uppercase rounded-full shadow-[0_10px_35px_rgba(245,158,11,0.5)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <span>Step into the Loom</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="mt-6 text-stone-200 text-xs tracking-wider flex items-center justify-center gap-2 drop-shadow">
          <Volume2 className="w-3.5 h-3.5 text-[#FDE047]" />
          <span>Tap to unveil with pure temple acoustic harmonies</span>
        </p>
      </div>
    </div>
  );
};
