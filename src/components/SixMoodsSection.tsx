import { SIX_MOODS, findSareeDetails } from '../data/sareesData';
import { CurrencyCode, SareeDetail } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import { ArrowUpRight } from 'lucide-react';

interface SixMoodsSectionProps {
  currency: CurrencyCode;
  onSelectMood?: (moodId: string, title: string) => void;
  onInspectSaree?: (saree: SareeDetail) => void;
}

export const SixMoodsSection: React.FC<SixMoodsSectionProps> = ({
  currency,
  onSelectMood,
  onInspectSaree,
}) => {
  const curr = CURRENCIES[currency] || CURRENCIES.INR;

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const handleCardClick = (mood: typeof SIX_MOODS[0]) => {
    if (onInspectSaree) {
      const details = findSareeDetails(mood.title);
      onInspectSaree(details);
    } else if (onSelectMood) {
      onSelectMood(mood.id, mood.title);
    }
  };

  return (
    <section id="moods" className="py-20 lg:py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-[#E11D48] font-bold">
          The Festive Spectrum
        </span>
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 mt-2 mb-4 tracking-tight">
          Six Moods of <span className="font-cormorant italic font-normal text-[#E11D48]">Pure Radiance.</span>
        </h2>
        <p className="text-stone-600 text-sm sm:text-base font-light max-w-2xl mx-auto">
          "Six vibrant dreams, spun in pure gold and woven by the sunlit looms of Tamil Nadu. Each mood celebrates an auspicious moment of life."
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {SIX_MOODS.map((mood) => (
          <div
            key={mood.id}
            onClick={() => handleCardClick(mood)}
            className="saree-card-interactive group relative bg-white rounded-2xl overflow-hidden border border-[#FDE68A] hover:border-[#F59E0B] transition-all duration-300 hover:shadow-2xl cursor-pointer flex flex-col shadow-xs"
          >
            {/* Image viewport with subtle zoom */}
            <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-100">
              <SilkImage
                src={mood.image}
                alt={mood.title}
                label={mood.title}
                fallbackColor={mood.colorHex}
                patternType="zari"
                className="w-full h-full group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-85 group-hover:opacity-75 transition-opacity pointer-events-none" />
              
              {/* Gold border accent on hover */}
              <div className="absolute inset-3 border border-[#FDE047]/0 group-hover:border-[#FDE047]/80 rounded-xl transition-all duration-300 pointer-events-none" />

              {/* Top provenance tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[11px] uppercase tracking-widest font-mono text-[#FEF08A] bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 font-semibold shadow-xs">
                  {mood.weave}
                </span>
              </div>

              {/* Title inside scrim */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <h3 className="text-xl font-cinzel font-bold tracking-wide">
                  {mood.title}
                </h3>
                <p className="font-cormorant italic text-sm text-[#FEF08A] mt-0.5">
                  {mood.tagline}
                </p>
              </div>
            </div>

            {/* Bottom Card Footer */}
            <div className="p-4 flex items-center justify-between bg-[#FFFDF9] border-t border-[#FEF3C7]">
              <div className="text-xs text-stone-500">
                <span>From</span>{' '}
                <span className="text-sm font-semibold text-[#E11D48] font-mono">
                  {formatPrice(mood.price)}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#E11D48] group-hover:text-[#BE123C] transition-colors">
                <span>Explore Weave</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#F59E0B]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
