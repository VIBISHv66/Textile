import React from 'react';
import { Sparkles, Heart, ShieldCheck, Award } from 'lucide-react';

interface FooterProps {
  onReplayCurtain: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayCurtain }) => {
  return (
    <footer className="bg-[#100508] text-stone-300 pt-16 pb-12 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Heritage Statement (Matching 00:41 in video) */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between pb-12 border-b border-white/10 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-cinzel font-bold text-white tracking-tight">
              Woven with heritage.<br />
              <span className="font-cormorant italic text-[#ECC880]">Draped for today.</span>
            </h2>
            <p className="text-stone-400 text-sm mt-3 max-w-md font-light leading-relaxed">
              Every warp and weft is a continuous prayer preserving the sacred 1,000-year lineage of Indian pit-loom weaving.
            </p>
          </div>

          <div className="text-left lg:text-right">
            <div className="text-2xl lg:text-3xl font-cinzel font-bold tracking-[0.2em] text-[#FFF3B0]">
              RAVI TEXTILES
            </div>
            <p className="text-xs text-stone-400 font-mono tracking-widest mt-1 uppercase">
              Kanchipuram · Varanasi · Arani
            </p>
          </div>
        </div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
          <div>
            <h4 className="font-cinzel text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Silks
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><a href="#the-rail" className="hover:text-[#ECC880] transition-colors">Silk Sarees</a></li>
              <li><a href="#the-rail" className="hover:text-[#ECC880] transition-colors">Half Sarees</a></li>
              <li><a href="#the-rail" className="hover:text-[#ECC880] transition-colors">Silk Blouse Pieces</a></li>
              <li><a href="#the-rail" className="hover:text-[#ECC880] transition-colors">Bridal Dupattas</a></li>
              <li><a href="#pick-a-silk" className="hover:text-[#ECC880] transition-colors">Koorai Chekku Checks</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Provenance
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><a href="#moods" className="hover:text-[#ECC880] transition-colors">Our Weaver Colonies</a></li>
              <li><a href="#three-silks" className="hover:text-[#ECC880] transition-colors">Pit-Loom Craftsmanship</a></li>
              <li><a href="#feel-the-drape" className="hover:text-[#ECC880] transition-colors">The Drape Studio</a></li>
              <li><a href="#moods" className="hover:text-[#ECC880] transition-colors">Tested Zari Standards</a></li>
              <li><a href="#try-the-look" className="hover:text-[#ECC880] transition-colors">Temple Motifs Archive</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Care & Support
            </h4>
            <ul className="space-y-2.5 text-stone-400">
              <li><a href="#" className="hover:text-[#ECC880] transition-colors">Silk Preservation Guide</a></li>
              <li><a href="#" className="hover:text-[#ECC880] transition-colors">Worldwide Insured Shipping</a></li>
              <li><a href="#" className="hover:text-[#ECC880] transition-colors">Heirloom Authenticity Cert</a></li>
              <li><a href="#" className="hover:text-[#ECC880] transition-colors">Return & Exchange Policy</a></li>
              <li><a href="#" className="hover:text-[#ECC880] transition-colors">Bridal Concierge Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Sanctum Gazette
            </h4>
            <p className="text-stone-400 text-xs mb-3 font-light">
              Receive auspicious invitations to limited festive loom harvests.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-xs text-white focus:outline-hidden focus:border-[#ECC880]"
              />
              <button className="px-3 py-2 bg-gradient-to-r from-[#E11D48] to-[#F59E0B] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shrink-0">
                Join
              </button>
            </div>
            <div className="mt-4 flex items-center gap-2 text-[11px] text-[#ECC880]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Complimentary Muslin Storage Bag</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <div className="flex items-center gap-3">
            <span>© 2026 RAVI TEXTILES. All rights reserved.</span>
            <span>·</span>
            <button
              onClick={onReplayCurtain}
              className="text-[#ECC880] hover:underline cursor-pointer"
            >
              Replay Royal Curtains
            </button>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Govt. Certified Silk Mark India</span>
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Tested 24K Gold Zari</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
