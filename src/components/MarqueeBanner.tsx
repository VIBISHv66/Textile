import React from 'react';
import { Sparkles } from 'lucide-react';

interface MarqueeBannerProps {
  variant?: 'gold' | 'crimson';
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({ variant = 'crimson' }) => {
  const items = [
    'RAVI TEXTILES HERITAGE',
    'SUNLIT KANCHIPURAM',
    'SWARNA VARAM LIQUID GOLD',
    '100% PURE SILK MARK',
    'NILGIRI TEAL PEACOCK',
    'HANDWOVEN ON PIT LOOMS',
    'TESTED 24K GOLD & SILVER ZARI',
    'MANGALA HALDI BLESSINGS',
    'ROYAL BANARASI MEENAKARI',
    'HEIRLOOM WEDDING SILKS',
  ];

  const isCrimson = variant === 'crimson';

  return (
    <div
      className={`overflow-hidden whitespace-nowrap py-3.5 border-y select-none shadow-xs ${
        isCrimson
          ? 'bg-gradient-to-r from-[#BE123C] via-[#E11D48] to-[#BE123C] text-[#FEF08A] border-[#F59E0B]/60'
          : 'bg-gradient-to-r from-[#FEF3C7] via-[#FFFBEB] to-[#FEF3C7] text-[#BE123C] border-[#F59E0B]/50'
      }`}
    >
      <div className="inline-flex animate-[marquee_32s_linear_infinite] items-center gap-10">
        {[...items, ...items, ...items].map((text, idx) => (
          <span key={idx} className="inline-flex items-center gap-3 text-xs tracking-[0.25em] font-semibold font-cinzel uppercase drop-shadow-xs">
            <span>{text}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
          </span>
        ))}
      </div>
    </div>
  );
};
