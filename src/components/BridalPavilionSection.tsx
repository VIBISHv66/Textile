import React, { useState } from 'react';
import { BRIDAL_ARCHIVES, findSareeDetails } from '../data/sareesData';
import { CurrencyCode, SareeDetail } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { SilkImage } from './SilkImage';
import { Sparkles, Calendar, ArrowRight, Check, Eye } from 'lucide-react';

interface BridalPavilionSectionProps {
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

export const BridalPavilionSection: React.FC<BridalPavilionSectionProps> = ({
  currency,
  onAddToCart,
  onInspectSaree,
}) => {
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [consultSubmitted, setConsultSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', weddingDate: '', city: '', phone: '' });

  const curr = CURRENCIES[currency] || CURRENCIES.INR;

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultSubmitted(true);
    setTimeout(() => {
      setConsultSubmitted(false);
      setConsultModalOpen(false);
    }, 2500);
  };

  return (
    <section id="bridal-pavilion" className="py-20 lg:py-28 bg-[#FFFDF9] border-b border-[#FDE68A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#E11D48] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>Sacred Muhurtham Editions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-stone-900 tracking-tight">
            The Bridal Pavilion.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-1">
            "Arched sanctum of consecrated bridal trousseaus, woven with sacred gold and eternal blessings at Ravi Textiles."
          </p>
        </div>

        {/* Arched Showcase Grid (Matching 00:26 & 00:33 in video) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BRIDAL_ARCHIVES.map((item) => (
            <div
              key={item.id}
              onClick={() => onInspectSaree?.(findSareeDetails(item.title))}
              className="saree-card-interactive group bg-white rounded-t-[100px] rounded-b-2xl p-4 border border-[#FDE68A] hover:border-[#E11D48] shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Arch-shaped Image viewport */}
                <div className="aspect-[3/4] w-full rounded-t-[90px] rounded-b-xl overflow-hidden bg-stone-100 relative">
                  <SilkImage
                    src={item.image}
                    alt={item.title}
                    label={item.title}
                    fallbackColor="#BE123C"
                    patternType="temple"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 pointer-events-none" />
                  
                  {/* Subtle golden arch hairline border */}
                  <div className="absolute inset-2 rounded-t-[80px] rounded-b-lg border border-[#F59E0B]/50 pointer-events-none" />

                  <div className="absolute bottom-3 left-3 right-3 text-white z-20">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FDE047] font-bold">
                      Ravi Heirloom
                    </span>
                    <h3 className="text-base font-cinzel font-bold leading-tight mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 px-1">
                  <div className="text-xs font-bold text-[#E11D48]">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-stone-600 mt-1.5 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between px-1">
                <div>
                  <div className="text-[10px] text-stone-500 font-medium">Trousseau Value</div>
                  <div className="text-sm font-mono font-bold text-[#E11D48]">
                    {formatPrice(item.price)}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart({
                      id: item.id,
                      title: item.title,
                      subtitle: item.subtitle,
                      price: item.price,
                      image: item.image,
                      category: 'Bridal Archive',
                    });
                  }}
                  className="shimmer-btn-sheen px-5 py-2 rounded-full bg-stone-900 hover:bg-[#E11D48] text-white text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Reserve
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bridal Concierge Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#BE123C] via-[#E11D48] to-[#F59E0B] p-8 lg:p-12 text-white border border-[#FDE68A] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FDE047] font-bold">
              Personalized Loom Experience
            </span>
            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold mt-1 text-white">
              Book a Private Bridal Video Consultation
            </h3>
            <p className="text-white/90 text-sm mt-2 font-light leading-relaxed">
              Connect directly with our master weavers in Kanchipuram via high-definition live video to customize warp shades, auspicious temple motifs, and pure gold zari weights for your special day.
            </p>
          </div>

          <button
            onClick={() => setConsultModalOpen(true)}
            className="px-8 py-4 rounded-full bg-white text-[#BE123C] hover:bg-[#FFFBEB] hover:text-[#9F1239] text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-xl shrink-0 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#BE123C]" />
            <span>Schedule Consultation</span>
            <ArrowRight className="w-4 h-4 text-[#BE123C]" />
          </button>
        </div>

      </div>

      {/* Consultation Booking Modal */}
      {consultModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#D4AF37] shadow-2xl relative">
            <h3 className="text-2xl font-cinzel font-bold text-stone-900 mb-1">
              Private Bridal Loom Appointment
            </h3>
            <p className="text-xs text-stone-500 mb-6 font-light">
              Our lead trousseau stylist will contact you via WhatsApp / Video Call at your preferred hour.
            </p>

            {consultSubmitted ? (
              <div className="p-8 text-center text-emerald-700 bg-emerald-50 rounded-2xl border border-emerald-200">
                <Check className="w-12 h-12 mx-auto mb-2 text-emerald-600" />
                <h4 className="text-base font-semibold">Loom Consultation Reserved!</h4>
                <p className="text-xs text-emerald-600 mt-1">
                  Our chief bridal curator will reach out shortly with auspicious date slots.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Bride's Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Radhika Sundaram"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">Wedding Date</label>
                    <input
                      type="date"
                      required
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">City / Country</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Chennai / London"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setConsultModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] text-white text-xs font-semibold uppercase tracking-wider hover:opacity-95 shadow-md cursor-pointer"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
