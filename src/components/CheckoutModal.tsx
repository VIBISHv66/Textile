import React, { useState } from 'react';
import { CartItem, CurrencyCode } from '../types';
import { CURRENCIES } from '../data/sareesData';
import { X, Check, ShieldCheck, Lock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onClearCart,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'India',
    paymentMethod: 'card',
  });

  if (!isOpen) return null;

  const curr = CURRENCIES[currency] || CURRENCIES.INR;
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (p: number) => {
    const converted = Math.round(p * curr.rate);
    return `${curr.symbol}${converted.toLocaleString()}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#F59E0B', '#E11D48', '#FFFFFF', '#10B981'],
    });
    setStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#FDE68A] relative animate-in fade-in zoom-in-95 duration-200">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E11D48] font-bold mb-1">
              <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>256-Bit Encrypted Heritage Checkout</span>
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-stone-900 mb-6">
              Complete Your Heirloom Order
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Smt. Ananya Krishnan"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ananya@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98400 12345"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Delivery Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden bg-white"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Singapore">Singapore</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Canada">Canada</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Shipping Address</label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, apartment, suite..."
                  className="w-full px-4 py-2 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Chennai"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">Postal / ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    placeholder="600028"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] outline-hidden"
                  />
                </div>
              </div>

              {/* Order total strip */}
              <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#FDE68A] flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-medium">Total Payable</span>
                  <div className="text-xl font-cinzel font-bold text-[#E11D48] font-mono">
                    {formatPrice(subtotal)}
                  </div>
                </div>
                <div className="text-right text-[11px] text-stone-500">
                  <span>Free Insured Delivery</span>
                  <div className="text-emerald-700 font-semibold">Silk Mark Included</div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] hover:opacity-95 text-white font-semibold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Place Order · {formatPrice(subtotal)}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-300 shadow-sm">
              <Check className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] font-bold">
              Order Confirmed · #RVT-2026-9812
            </span>
            <h3 className="text-3xl font-cinzel font-bold text-stone-900 mt-1 mb-2">
              Blessings & Gratitude
            </h3>
            <p className="text-sm text-stone-600 max-w-md mx-auto mb-6 font-light leading-relaxed">
              Your heirloom weave has been consecrated for dispatch from the Ravi Textiles Kanchipuram vault. A tracking docket has been emailed to you.
            </p>

            <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-left max-w-md mx-auto text-xs space-y-2 mb-6">
              <div className="flex items-center gap-2 text-stone-800 font-semibold">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                <span>Govt. Tested Silk Mark Certificate Authenticated</span>
              </div>
              <p className="text-stone-600 text-[11px]">
                Packed in organic neem-infused muslin boxes with brass safety locks by Ravi Textiles.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] to-[#E11D48] text-white text-xs font-semibold uppercase tracking-wider hover:opacity-95 transition-opacity cursor-pointer shadow-md"
            >
              Return to Gallery
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
