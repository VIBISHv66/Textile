import React, { useState } from 'react';
import { SilkImage } from './SilkImage';
import {
  Sparkles,
  ShieldCheck,
  Award,
  Feather,
  Layers,
  Flame,
  CheckCircle2,
  Calendar,
  Eye,
  HeartHandshake,
  Clock,
  Sparkle,
  ArrowRight,
} from 'lucide-react';
import { CurrencyCode, SareeDetail } from '../types';
import { CURRENCIES, findSareeDetails } from '../data/sareesData';

interface ArtisanHeritageSectionProps {
  currency: CurrencyCode;
  onInspectSaree?: (saree: SareeDetail) => void;
  onBookLoom?: () => void;
}

export const ArtisanHeritageSection: React.FC<ArtisanHeritageSectionProps> = ({
  currency,
  onInspectSaree,
  onBookLoom,
}) => {
  const [activeTab, setActiveTab] = useState<'korvai' | 'zari' | 'silkmark' | 'custom'>('korvai');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loomForm, setLoomForm] = useState({
    name: '',
    phone: '',
    city: '',
    occasion: 'Bridal Muhurtham',
    customNotes: '',
  });

  const curr = CURRENCIES[currency] || CURRENCIES.INR;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingOpen(false);
      setLoomForm({ name: '', phone: '', city: '', occasion: 'Bridal Muhurtham', customNotes: '' });
    }, 2800);
  };

  return (
    <section id="artisan-heritage" className="py-20 lg:py-28 bg-[#FFFBF5] border-y border-[#FDE68A]/60 relative overflow-hidden">
      {/* Subtle festive background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] opacity-10 [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header Topic */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E11D48] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Master Handloom & Weaver Legacy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight">
            The Living Art of Handloom.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-3 leading-relaxed">
            At <strong>Ravi Textiles</strong>, every warp strand carries centuries of sacred ritual. From the two-weaver 
            Korvai shuttle synchrony to 24-karat silver-gold zari dipping, explore the heritage behind our royal heirlooms.
          </p>
        </div>

        {/* Feature Grid with User's Genuine Photos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Main Loom Feature with Sunlit Artisan Photo */}
          <div className="lg:col-span-7 relative group rounded-3xl overflow-hidden border-2 border-[#FDE68A] shadow-xl bg-stone-900">
            <div className="relative aspect-16/10 sm:aspect-16/9 w-full">
              <img
                src="/assets/aistudio/Screenshot_2026-11-12_154824_8178b594.png"
                alt="Ravi Textiles Master Artisan Weaving on Traditional Pit Loom with Morning Sunbeam"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[#FEF08A] text-xs font-mono font-bold border border-white/20">
                  SACRED PIT LOOM SANCTUM · KANCHIPURAM
                </span>
              </div>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <span className="text-xs uppercase font-mono tracking-widest text-[#FDE047] font-semibold">
                  Zero Motors · 100% Hand-Spun
                </span>
                <h3 className="text-xl sm:text-2xl font-cinzel font-bold mt-1">
                  52 Days of Continuous Artisan Devotion
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 mt-1 font-light max-w-xl">
                  Each warp requires 4,800 hand-threaded silk filaments, balanced by foot-pedals and bamboo reed beaters 
                  to produce the signature celebratory rustle of authentic South Indian pattu.
                </p>
              </div>
            </div>
          </div>

          {/* Side Cards: Zari & Family Heritage */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Macro Zari Brocade Card */}
            <div 
              onClick={() => {
                if (onInspectSaree) {
                  onInspectSaree(findSareeDetails('Swarna Kamalam'));
                }
              }}
              className="p-5 rounded-3xl bg-white border border-[#FDE68A] shadow-md hover:shadow-xl transition-all flex gap-4 items-center group cursor-pointer"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-amber-200">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-12_154856_0061fafd.png"
                  alt="24K Pure Gold Zari Brocade Detail"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#E11D48] font-bold">
                  <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Tested Purity Hallmark</span>
                </div>
                <h4 className="text-base font-cinzel font-bold text-stone-900 truncate mt-0.5">
                  24K Gold & Silver Zari
                </h4>
                <p className="text-xs text-stone-600 line-clamp-2 mt-1 font-light">
                  58% pure silver core electroplated in 24K liquid gold with authentic GI certification from Surat mints.
                </p>
                <div className="text-[11px] text-[#E11D48] font-semibold mt-1 flex items-center gap-1 group-hover:underline">
                  <span>Inspect weave details</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Family Celebrations Card */}
            <div className="p-5 rounded-3xl bg-white border border-[#FDE68A] shadow-md hover:shadow-xl transition-all flex gap-4 items-center group">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-amber-200">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-12_154833_7bbd31e5.png"
                  alt="Three Generations Celebrating with Ravi Textiles Heirlooms"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Generational Legacy</span>
                </div>
                <h4 className="text-base font-cinzel font-bold text-stone-900 truncate mt-0.5">
                  Heirlooms That Live Forever
                </h4>
                <p className="text-xs text-stone-600 line-clamp-2 mt-1 font-light">
                  Worn across maternal generations—mothers pass their Ravi Textiles Muhurtham pattu to brides with intact luster.
                </p>
                <div className="text-[11px] text-stone-800 font-semibold mt-1">
                  Over 12,000+ weddings consecrated since 1982
                </div>
              </div>
            </div>

            {/* Boutique Mannequins Card */}
            <div 
              onClick={() => {
                const el = document.getElementById('the-rail');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-5 rounded-3xl bg-[#FFFBEB] border border-[#FDE68A] shadow-sm hover:shadow-md transition-all flex gap-4 items-center group cursor-pointer"
            >
              <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-amber-200">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-12_154912_7a8ba5ff.png"
                  alt="Ravi Textiles Boutique Showroom Mannequins"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#F59E0B] font-bold">
                  Curated Drapes
                </span>
                <h4 className="text-base font-cinzel font-bold text-stone-900 truncate mt-0.5">
                  Boutique Drape Pavilion
                </h4>
                <p className="text-xs text-stone-600 line-clamp-2 mt-1 font-light">
                  Explore pastel silks, jewel brocades, and ceremonial Muhurtham collections on our interactive rail.
                </p>
                <div className="text-[11px] text-[#E11D48] font-semibold mt-1 flex items-center gap-1 group-hover:underline">
                  <span>Visit The Rail</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Interactive Topic Tabs (Korvai, Zari Purity, Silk Mark, Custom Loom) */}
        <div className="bg-white rounded-3xl border border-[#FDE68A] p-6 lg:p-10 shadow-lg">
          
          <div className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-5 mb-8">
            <button
              onClick={() => setActiveTab('korvai')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'korvai'
                  ? 'bg-[#E11D48] text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              1. The Korvai Interlock
            </button>

            <button
              onClick={() => setActiveTab('zari')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'zari'
                  ? 'bg-[#E11D48] text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              2. 24K Zari Purity Tests
            </button>

            <button
              onClick={() => setActiveTab('silkmark')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'silkmark'
                  ? 'bg-[#E11D48] text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              3. Silk Mark & GI Certification
            </button>

            <button
              onClick={() => setActiveTab('custom')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-[#E11D48] text-white shadow-md'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              4. Custom Loom Bespoke Weave
            </button>
          </div>

          {/* Tab 1: Korvai */}
          {activeTab === 'korvai' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#E11D48] font-bold">
                  Ancient Three-Shuttle Synchrony
                </span>
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900 mt-1">
                  Why Korvai Never Tears or Fades
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light mt-3">
                  Unlike modern machine-loomed sarees where colors are printed or stitched with weak synthetic seams, 
                  authentic <strong>Korvai</strong> requires two master artisans sitting on either side of the pit loom. 
                  One throws the body shuttle while the other catches and interlocks the temple border shuttle simultaneously.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A]">
                    <div className="text-xs font-mono font-bold text-amber-900">Petni Joint</div>
                    <div className="text-xs text-stone-600 mt-0.5">Zero visible stitches; seamless thread union</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A]">
                    <div className="text-xs font-mono font-bold text-amber-900">Triple Ply 6A</div>
                    <div className="text-xs text-stone-600 mt-0.5">Heavy structured fall with zero sheer transparency</div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#FDE68A] shadow-md aspect-16/10">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-12_154813_71651b4a.png"
                  alt="Pleated Handloom Silks Showing Solid Korvai Borders"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Zari */}
          {activeTab === 'zari' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#F59E0B] font-bold">
                  Chemical Assay & Flame Verification
                </span>
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900 mt-1">
                  Tested 24K Gold Dipped Silver Threads
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light mt-3">
                  Every Ravi Textiles bridal heirloom contains certified bullion weight. We never use plastic lurex or copper-based 
                  tested imitators. Our zari consists of a pure 58% silver core that is micro-wrapped around silk yarn and dipped in 
                  24-karat gold electro-baths.
                </p>
                <div className="mt-5 space-y-2.5 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Resistant to tarnishing; retains golden radiance for decades</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Govt-accredited silver assay certification provided with every saree</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Buyback and heirloom re-polishing guarantee at Ravi Textiles</span>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#FDE68A] shadow-md aspect-16/10">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-12_154856_0061fafd.png"
                  alt="Macro Pure Gold Zari Brocade"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Tab 3: Silk Mark */}
          {activeTab === 'silkmark' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-emerald-700 font-bold">
                  Ministry of Textiles Recognition
                </span>
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900 mt-1">
                  100% Pure Mulberry Silk Mark Seal
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light mt-3">
                  Each saree is individually tagged with a holographic Silk Mark label issued by the Central Silk Board of India. 
                  You can perform the traditional flame test: when burned, authentic silk produces crisp, crushable ash smelling 
                  like burnt hair, proving zero synthetic polyester blend.
                </p>
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 mt-5 flex items-center gap-4">
                  <ShieldCheck className="w-8 h-8 text-emerald-700 shrink-0" />
                  <div className="text-xs text-emerald-900">
                    <span className="font-bold block">Ravi Textiles Certified Purity Guarantee</span>
                    Authentic geographical origin tags for Kanchipuram, Varanasi Kadwa, Paithani, and Mysore Crepe.
                  </div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#FDE68A] shadow-md aspect-16/10">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-12_154930_b029db3b.png"
                  alt="Certified Stack of Pure Handloom Silk Sarees"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Tab 4: Custom Loom */}
          {activeTab === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-in fade-in duration-300">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-[#E11D48] font-bold">
                  Bespoke Bridal Commission
                </span>
                <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-stone-900 mt-1">
                  Weave Your Wedding Date & Monogram into the Pallu
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light mt-3">
                  Reserve a dedicated pit-loom at Ravi Textiles. Our master weavers will craft your custom trousseau, 
                  weaving bride and groom initials, wedding shlokas, or bespoke color contrast borders according to your horoscopic palette.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 cursor-pointer flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve Master Loom Session</span>
                  </button>
                  <button
                    onClick={() => {
                      const el = document.getElementById('sarees-collection');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Browse 24+ Ready Heirlooms
                  </button>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-[#FDE68A] shadow-md aspect-16/10">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-12_154846_a72df960.png"
                  alt="Custom Saree Commission on Wooden Hanger"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

        </div>

        {/* Master Loom Reservation Modal */}
        {bookingOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#FDE68A] relative animate-in zoom-in-95 duration-200">
              <h3 className="text-2xl font-cinzel font-bold text-stone-900 text-center">
                Reserve a Master Loom
              </h3>
              <p className="text-xs text-stone-600 text-center mt-1 font-light">
                Our master design consul will contact you to finalize loom dates, warp color, and zari weight.
              </p>

              {bookingSuccess ? (
                <div className="my-8 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <div className="font-cinzel font-bold text-lg text-emerald-950">
                    Loom Reservation Request Received!
                  </div>
                  <p className="text-xs text-emerald-800 mt-1 font-light">
                    Ravi Textiles senior weaver concierge will reach out within 4 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={loomForm.name}
                      onChange={(e) => setLoomForm({ ...loomForm, name: e.target.value })}
                      placeholder="e.g. Radhika Sundaram"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#E11D48] outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={loomForm.phone}
                        onChange={(e) => setLoomForm({ ...loomForm, phone: e.target.value })}
                        placeholder="+91 98400 12345"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#E11D48] outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-semibold mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={loomForm.city}
                        onChange={(e) => setLoomForm({ ...loomForm, city: e.target.value })}
                        placeholder="e.g. Chennai / Bangalore"
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#E11D48] outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Auspicious Occasion</label>
                    <select
                      value={loomForm.occasion}
                      onChange={(e) => setLoomForm({ ...loomForm, occasion: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#E11D48] outline-none bg-white"
                    >
                      <option value="Bridal Muhurtham">Bridal Muhurtham (45-60 days lead time)</option>
                      <option value="Sangeet & Reception">Sangeet & Reception (30-40 days lead time)</option>
                      <option value="Silver/Golden Jubilee">Silver / Golden Jubilee Celebration</option>
                      <option value="Temple Consecration">Temple Consecration Offering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Bespoke Motif or Initial Request</label>
                    <textarea
                      rows={3}
                      value={loomForm.customNotes}
                      onChange={(e) => setLoomForm({ ...loomForm, customNotes: e.target.value })}
                      placeholder="e.g. Please weave 'R & V' with Mayil peacock motif in solid 24K gold pallu..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#E11D48] outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setBookingOpen(false)}
                      className="px-5 py-2.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white font-semibold uppercase tracking-wider shadow-md"
                    >
                      Submit Loom Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
